"use client";

import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, Toaster } from '@/components/ui/sonner';
import { truncateString } from "../../lib/utils";
import { Button } from '@/components/ui/button';
import { useSearchParamsStore } from "../(root)/searchParamsContext";

const SearchResults = (props) => {

    const { name, session } = props;
    const [tracks, setTracks] = useState();

    const { setParams } = useSearchParamsStore();

    useEffect(() => {
        if(session) {
            async function getSearchForm() {
                try {
                    const data = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=10`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`
                        }
                    })
                    if (data.ok) {
                        const result = await data.json();
                        setTracks(result.tracks);
                    }else {
                        console.log('the error', data);
                        toast('We have encountered an error on search');
                    }
                } catch (err) {
                    console.log('the error', err);
                    toast("Error", {description: "We have encountered an error on search", title: "Error"});
                }
            }
            getSearchForm();
        }
    }, [name]);

    const handleRedirect = (e, item) => {
        const trackObj = {
            name: item.name,
            trackURL: item.external_urls.spotify,
            popularity: item.popularity, 
            album: item.album.name, 
            artists: item.artists.map(at => at.name).join(', '), 
            image: item.album.images[1].url, 
            releaseDate: item.album.release_date, 
            trackId: item.id, 
            totalTracks: item.album.total_tracks, 
            duration: item.duration_ms
        }
        setParams({trackDetails: trackObj});
    }

    return (
        <>
            {tracks && Object.keys(tracks).length>0 && <ul className="mt-7 card_grid">
                {tracks.items?.length > 0 && (tracks.items.map((item, i) => (
                    <li key={i} className="track-card ground shadow-200">
                        <div className="flex-between">
                            <p className="track-card-date">
                                {item.album.release_date}
                            </p>
                            <div className="flex gap-1.5">
                                <TrendingUp />
                                <span className="text-16-medium">{item.popularity}</span>
                            </div>
                        </div>

                        <div className="flex-between mt-5 mb-3 gap-5">
                            <div className="flex-1">
                                <Link onClick={(e) => handleRedirect(e, item)} href={`/track/${item.id}`}>
                                    <h3 className="text-[20px] font-semibold">{truncateString(item.name, 16)}</h3>
                                </Link>
                                <p className="text-[14px] line-clamp-1">{truncateString(item.artists.map(at => at.name).join(', '))}</p>
                            </div>
                        </div>

                        <Link href={`/track/${item.id}`} onClick={(e) => handleRedirect(e, item)}>
                            <img src={item.album.images[1].url} alt="placeholder" className="track-card-img" />
                        </Link>

                        <div className="flex-between gap-3 mt-5">
                            <p className="text-[14px]">{item.album.name}</p>
                            <Button className='track-card-btn' asChild>
                                <Link href={`/track/${item.id}`} onClick={(e) => handleRedirect(e, item)}>Details</Link>
                            </Button>
                        </div>
                    </li>
                )))}
            </ul>}
        </>
    )
}

export default SearchResults;