import { Button } from "@/components/ui/button";
import { writeClient } from "../../sanity/lib/write-client";

const SaveReview = (props) => {
    const { id, review, setOpen } = props;

    const handleSave = async () => {
        setOpen(false);
        await writeClient.patch(id).set({review: review}).commit();
    }

    return (
        <Button onClick={handleSave} className='bg-white text-black hover:bg-[#c9c9c9]'>
            Save
        </Button>
    )
}

export default SaveReview