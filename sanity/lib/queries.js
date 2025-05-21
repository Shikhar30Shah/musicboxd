import { defineQuery } from "next-sanity";

export const REVIEWS_QUERY = defineQuery(`*[_type == 'review' && defined(slug.current) && !defined($search) || name match $search || album match $search || artists match $search ] | order(_updatedAt, desc){
    _id,
    releaseDate,
    _updatedAt,
    album,
    user -> {
      _id, name, image
    },
    review,
    image,
    popularity,
    artists,
    name,
    trackId
}`);

export const REVIEWS_BY_ID_QUERY = defineQuery(`*[_type == 'review' && trackId == $id] | order(_updatedAt, desc){
    _id,
    releaseDate,
    _updatedAt,
    album,
    user -> {
      _id, name, image
    },
    review,
    image,
    popularity,
    artists,
    name,
    trackId
  }`)

export const USER_BY_SPOTIFY_ID_QUERY = defineQuery(`*[_type == 'user' && id == $id][0]{
    _id,
    id,
    name,
    email,
    image,
    followings,
    followers
  }`)