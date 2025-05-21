import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
import { client } from "./sanity/lib/client"
import { USER_BY_SPOTIFY_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'user-library-read',
  'user-read-private',
  'user-read-currently-playing',
  'user-top-read',
  'user-read-recently-played'
].join(' ');
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Spotify({
    clientId: process.env.AUTH_SPOTIFY_ID,
    clientSecret: process.env.AUTH_SPOTIFY_SECRET,
    authorization: `https://accounts.spotify.com/authorize?scope=${scopes}`
  })],
  callbacks: {
    async signIn({user, profile}){
      const existingUser = await client.fetch(USER_BY_SPOTIFY_ID_QUERY, {id: profile?.id})
      if(!existingUser) {
        await writeClient.create({
          _type: 'user',
          id: profile?.id,
          name: user?.name,
          username: profile?.login,
          email: user?.email,
          image: user?.image,
          followings: profile?.followings,
          followers: profile?.followers?.total
        })
      }

      return true;
    },
    async jwt({token, account, profile, user}) {
      if(account && profile){
        const user = await client.fetch(USER_BY_SPOTIFY_ID_QUERY, {
          id: profile?.id
        })
        token.id = user._id
      }
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_in * 1000;
        return token;
      }

      // If token hasn't expired yet, return it
      if (Date.now() < token.expiresAt) {
        return token;
      }

      // Refresh token if expired
      return await refreshAccessToken(token);
    },
    async session({session, token}){
      Object.assign(session, {id: token.id, accessToken: token.accessToken, refreshToken: token.refreshToken});
      return session;
    }
    // async jwt({token, account, profile, user}) {
    //   console.log('the account', account, token, profile, user);
    //     console.log("JWT callback:", { token, account });
    //   if(account && profile){
    //       console.log("JWT callback two:", { token, account });
    //     const user = await client.fetch(USER_BY_SPOTIFY_ID_QUERY, {
    //       id: profile?.id
    //     })
    //     token.id = user._id
    //   }
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     token.refreshToken = account.refresh_token;
    //     token.expiresAt = Date.now() + account.expires_in * 1000;
    //     return token;
    //   }

    //   // If token hasn't expired yet, return it
    //   if (Date.now() < token.expiresAt) {
    //     return token;
    //   }

    //   // Refresh token if expired
    //   return await refreshAccessToken(token);
    //   // return token
    // },
    // async session({session, token}){
    //   Object.assign(session, {id: token.id});
    //   return session;
    // },
  }
})

export async function refreshAccessToken(token) {
  try {
    const basic = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}