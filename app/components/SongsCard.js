"use client";
import { Button } from "@/components/ui/button";
import { truncateString } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParamsStore } from "../(root)/searchParamsContext";

export default function SongsCard({ track, key }) {
    const { releaseDate, popularity, trackId, artists, user, 
        name, review, image, album, duration, trackURL, totalTracks } = track;

    const { setParams } = useSearchParamsStore();

    const handleRedirect = (e) => {
        const trackObj = {
            name: name,
            trackURL: trackURL,
            popularity: popularity, 
            album: album, 
            artists: artists, 
            image: image, 
            releaseDate: releaseDate, 
            trackId: trackId, 
            totalTracks: totalTracks, 
            duration: duration
        }
        setParams({trackDetails: trackObj});
    }
    return (
        <li key={key} className="track-card ground shadow-200">
            <div className="flex-between">
                <p className="track-card-date">
                    {releaseDate}
                </p>
                <div className="flex gap-1.5">
                    <TrendingUp />
                    <span className="text-16-medium">{popularity}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/track/${trackId}`} onClick={handleRedirect} >
                        <h3 className="text-[20px] font-semibold">{truncateString(name, 16)}</h3>
                    </Link>
                    <p className="text-[14px] line-clamp-1">{truncateString(artists)}</p>
                </div>

                <Link href={`/user/${user._id}`} >
                    <Image src={user.image} alt='placeholder' width={48} height={48} className="rounded-full" />
                </Link>
            </div>

            <Link href={`/track/${trackId}`} onClick={handleRedirect} >
                <p className="track-card-desc">{review}</p>
                <img src={image} alt="placeholder" className="track-card-img" />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <p className="text-[14px]">{user.name}</p>
                <Button className='track-card-btn' asChild>
                    <Link href={`/track/${trackId}`} onClick={handleRedirect}>Details</Link>
                </Button>
            </div>
        </li>
    )
}