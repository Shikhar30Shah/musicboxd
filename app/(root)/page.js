import { auth } from "@/auth";
import { sanityFetch, SanityLive } from "../../sanity/lib/live";
import SearchForm from "../components/SearchForm";
import SongsCard from "../components/SongsCard";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";
import RecentlyPlayed from "../components/RecentlyPlayed";

export default async function Home({ searchParams }) {

  let name = (await searchParams).name || '';

  const params = {search: name || null}
  // const { data: posts } = await sanityFetch({query: REVIEWS_QUERY, params})

  const session = await auth();

  return (
    <>
      <section className="main_container music-bg">
        <h1 className="heading">Share your reviews, <br /> Connect with music</h1>
        <p className="sub-heading !max-w-3xl">
          Connect with spotify and tell your friends the songs, podcasts and more you want them to watch. A quintessential social network for music lovers.
        </p>
        <SearchForm name={name} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">{session && 'Recently Played'}</p>

        {session && <RecentlyPlayed session={session} />}
      </section>

      <SanityLive />
    </>
  );
}
