"use client"

import { formatDuration } from "../../lib/utils";
import Link from "next/link";
import { useSearchParamsStore } from "../(root)/searchParamsContext";


const TrackDetails = () =>{

    const { params } = useSearchParamsStore();

    console.log('the state', params);

    return ( params.trackDetails && Object.keys(params.trackDetails).length > 0 &&
        <>
            <section className='main_container music-bg !min-h-[230px]'>
                <Link target="_blank" className='tag ribbon-tag' href={params.trackDetails.track.external_urls.spotify}>Link to Spotify </Link>
                <h1 className='text-30-bold mt-10'>{params.trackDetails.track.name}</h1>
                <p className='sub_heading !max-w-5xl'>{params.trackDetails.track.artists.map(at => at.name).join(', ')}</p>
            </section>

            <section className='section_container'>
                <div className='card_grid'>
                    <img 
                        src={params.trackDetails.track.album.images[1].url}
                        alt='thumbnail'
                        className='h-auto rounded-xl'
                        width={300}
                        height={300}
                    />
                    <div>
                        <p className='text-26-semibold mb-10'>Album Details:</p>
                        <p className='mb-3'>Album Name: {params.trackDetails.track.album.name}</p>
                        <p className='mb-3'>Release Date: {params.trackDetails.track.album.release_date}</p>
                        <p className='mb-3'>Song Duration: {formatDuration(params.trackDetails.track.duration_ms)}</p>
                        <p className='mb-3'>Total Tracks: {params.trackDetails.track.album.total_tracks}</p>
                        {/* <p className='mb-3'>Copyright: (P) 2012 RCA Records, a division of Sony Music Entertainment</p> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default TrackDetails;