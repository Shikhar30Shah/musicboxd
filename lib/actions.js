"user server"
import { auth } from '@/auth';

export const addReview = async (data, review) => {
    const session = await auth();

    if(!session) return JSON.parse(JSON.stringify({error: 'Not signed in ', status: 'ERROR'}))

    const { name, user, popularity, album, artists, image, releaseDate, trackId } = data;
    
}