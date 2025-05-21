"use client"
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { truncateString } from '../../lib/utils';
import { useRouter } from 'next/navigation';
import { useSearchParamsStore } from '../(root)/searchParamsContext';

const RecentlyPlayed = (props) => {

    const { session } = props;
    const [tracks, setTracks] = useState();
    const [count, setCount] = useState(0);

    //to use the router
    const router = useRouter();
    const { setParams } = useSearchParamsStore();

    useEffect(() => {
        if (session && count === 0) {
            async function getRecentlyPlayed() {
                try {
                    const data = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`
                        }
                    })
                    if (data.ok) {
                        const result = await data.json();
                        setTracks(result);
                    }
                } catch (err) {
                    console.log('the error', err);
                }
            }
            setCount(count+1);
            getRecentlyPlayed();
        }
    }, [])

    const handleRedirect = (e, item) => {
        e.preventDefault();
        setParams({trackDetails: item});
        router.push(`/track/${item.track.id}`)
    }

    return (
        <>
            {tracks && Object.keys(tracks).length>0 && <ul className="mt-7 card_grid">
                {tracks.items?.length > 0 && (tracks.items.map((item, i) => (
                    <li key={i} className="startup-card ground shadow-200">
                        <div className="flex-between">
                            <p className="startup-card_date">
                                {item.track.album.release_date}
                            </p>
                            <div className="flex gap-1.5">
                                <TrendingUp />
                                <span className="text-16-medium">{item.track.popularity}</span>
                            </div>
                        </div>

                        <div className="flex-between mt-5 mb-3 gap-5">
                            <div className="flex-1">
                                <Link onClick={(e) => handleRedirect(e, item)} href={`/track/${item.track.id}`}>
                                    <h3 className="text-[20px] font-semibold">{truncateString(item.track.name, 16)}</h3>
                                </Link>
                                <p className="text-[14px] line-clamp-1">{truncateString(item.track.artists.map(at => at.name).join(', '))}</p>
                            </div>
                        </div>

                        <Link href={{pathname: `/track/${item.track.id}`, query: {trackDetails: item}}}>
                            {/* <p className="startup-card_desc">{review}</p> */}
                            <img src={item.track.album.images[1].url} alt="placeholder" className="startup-card_img" />
                        </Link>

                        <div className="flex-between gap-3 mt-5">
                            <p className="text-[14px]">{item.track.album.name}</p>
                            <Button className='startup-card_btn' asChild>
                                <Link href={{pathname: `/track/${item.track.id}`, query: {trackDetails: item}}}>Details</Link>
                            </Button>
                        </div>
                    </li>
                )))}
            </ul>}
        </>
    )
}

export default RecentlyPlayed;