import { Button } from "@/components/ui/button";
import { truncateString } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SongsCard({ track, key }) {
    const { releaseDate, popularity, trackId, artists, _id, user, 
        name, review, image } = track;
    return (
        <li key={key} className="startup-card ground shadow-200">
            <div className="flex-between">
                <p className="startup-card_date">
                    {releaseDate}
                </p>
                <div className="flex gap-1.5">
                    <TrendingUp />
                    <span className="text-16-medium">{popularity}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/track/${trackId}`}>
                        <h3 className="text-[20px] font-semibold">{truncateString(name, 16)}</h3>
                    </Link>
                    <p className="text-[14px] line-clamp-1">{truncateString(artists)}</p>
                </div>

                <Link href={`/user/${user._id}`} >
                    <Image src={user.image} alt='placeholder' width={48} height={48} className="rounded-full" />
                </Link>
            </div>

            <Link href={`/track/${trackId}`}>
                <p className="startup-card_desc">{review}</p>
                <img src={image} alt="placeholder" className="startup-card_img" />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <p className="text-[14px]">{user.name}</p>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/track/${trackId}`}>Details</Link>
                </Button>
            </div>
        </li>
    )
}