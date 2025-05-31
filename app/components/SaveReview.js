import { Button } from "@/components/ui/button";
import { addReview } from "../../lib/actions";
import { useSearchParamsStore } from "../(root)/searchParamsContext";
import { toast } from "sonner";
// import { revalidatePath } from "next/cache";

const SaveReview = (props) => {
    const { review, setOpen } = props;

    const { params } = useSearchParamsStore();

    const handleSave = async () => {
        setOpen(false);
        const dataObj = {
            name: params.trackDetails.name,
            trackURL: params.trackDetails.trackURL,
            popularity: params.trackDetails.popularity, 
            album: params.trackDetails.album.name, 
            artists: params.trackDetails.artists, 
            image: params.trackDetails.image, 
            releaseDate: params.trackDetails.releaseDate, 
            trackId: params.trackDetails.trackId, 
            totalTracks: params.trackDetails.totalTracks, 
            duration: params.trackDetails.duration
        }
        const result = await addReview(dataObj, review)
        if(result.status === 'SUCCESS'){
            toast("Success", {title: 'Success', description: 'Review added successfully'});
        }
        // revalidatePath(`/track/${params.trackDetails.id}`);
    }

    return (
        <Button onClick={handleSave} className='bg-white text-black hover:bg-[#c9c9c9]'>
            Save
        </Button>
    )
}

export default SaveReview