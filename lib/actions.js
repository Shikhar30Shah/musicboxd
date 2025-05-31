"use server"
import { auth } from '@/auth';
import slugify from 'slugify';
import  { writeClient } from '../sanity/lib/write-client';
import { revalidatePath } from 'next/cache';

export const addReview = async (data, review) => {
    const session = await auth();

    if(!session) return JSON.parse(JSON.stringify({error: 'Not signed in ', status: 'ERROR'}))

    const { name, popularity, album, artists, image, releaseDate, trackId, totalTracks, duration, trackURL } = data;

    const slug = slugify(name, {lower: true, strict: true});
    try { 
        const reviewPost = {
            name,
            popularity,
            album,
            artists,
            image,
            releaseDate,
            trackId,
            totalTracks,
            duration,
            slug: {
                _type: slug,
                current: slug
            },
            user: {
                _type: 'reference',
                _ref: session?.id
            },
            review,
            trackURL
        }

        const result = await writeClient.create({_type: 'review', ...reviewPost});
        revalidatePath(`/track/${trackId}`);
        return JSON.parse(JSON.stringify({
            ...result,
            error: '',
            status: 'SUCCESS'
        }))
    } catch (err) {
        console.log(err);
        JSON.parse(JSON.stringify({error: JSON.stringify(err), status: 'ERROR'}))
    }
}