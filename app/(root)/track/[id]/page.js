import { client } from '../../../../sanity/lib/client';
import { REVIEWS_BY_ID_QUERY } from '../../../../sanity/lib/queries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../../../../lib/utils';
import AddReview from '../../../components/AddReview';
import { auth } from '@/auth';
import { AlertTriangle } from 'lucide-react';
import TrackDetails from '../../../components/TrackDetails';

const Page = async ({ params }) => {

    // const state = useSearchParams();
    // const trackDetails = state.get('trackDetails');

    const id = (await params)?.id;
    const reviews = await client.fetch(REVIEWS_BY_ID_QUERY, {id}) || [];

    const session = await auth();

    if(!reviews)
        return notFound();

    return (
        <>
            <section className='section_container'>
                <TrackDetails params={params} />
                {<div className='grid grid-cols-2 gap-4 mt-8'>
                    <h1 className='text-[24px] font-medium'>Reviews</h1>
                    {session?.user ? <div className='text-right'>
                        <AddReview />
                    </div> : <div className='flex gap-1 justify-end text-right'>
                        <AlertTriangle stroke='yellow' /> 
                        <span>Please login to add your review</span>
                    </div>}
                </div>}

                <div className='space-y-5 max-w-4xl'>
                    {reviews.length ? reviews.map((rev, i) => (
                        <div key={rev.user.id} className='p-5 rounded-[10px] shadow-xl'>
                            <Link href={`/user/${rev.user.id}`} className='flex gap-2 mb-3'>
                                <Image 
                                    src={rev.user.image}
                                    alt='avatar'
                                    width={48}
                                    height={48}
                                    className='rounded-full drop-shadow-lg'
                                />
                                <div>
                                    <p className='text-16-medium'>{rev.user.name}</p>
                                    <p className='text-[12px]'>{formatDate(rev._updatedAt)}</p>
                                </div>
                            </Link>
                            <div>{rev.review}</div>
                        </div>
                    )) : 
                        <div className='grid  mt-5 p-5 !w-full'>
                            <p className='text-22-semibold mb-3 align-center'>No Reviews Yet</p>
                            <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmdlcjFjbTBlcmFwbHQwY2M2MmY4ZXIyZmRhdG1pNGUzM3U3cm9rMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XIqCQx02E1U9W/giphy.gif'
                                alt='no-review'
                             />
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Page;