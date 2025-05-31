import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SongsCard from "../../../components/SongsCard";
import { sanityFetch } from '@/sanity/lib/live'
import { ALL_REVIEWS_QUERY } from "../../../../sanity/lib/queries";

const Page = async () => {

    const session = await auth();
    if(!session)
        redirect('/');

    const {data: posts} = await sanityFetch({query: ALL_REVIEWS_QUERY});

    return (
        <>
            <section className="main_container !min-h-[230px] music-bg">
                <h1 className="tag tag-tri">Watch All Reviews</h1>
            </section>

            <section className="section_container">
                <p className="text-30-semibold">{'Reviews'}</p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (posts.map((pt) => (
                        <SongsCard key={pt.id} track={pt} />
                    ))) : (
                        <p className="no-results">No reviews found.</p>
                    )}
                </ul>
            </section>
        </>
    )
}

export default Page;