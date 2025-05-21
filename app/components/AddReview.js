"use client"

import { Button } from '@/components/ui/button';
import { Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import SaveReview from './SaveReview';
// import { writeClient } from '../../sanity/lib/write-client';

export default function AddReview({id}) {

    const [open, setOpen] = useState(false);
    const [review, setReview] = useState('');

    return (
        <>
            <Button onClick={() => setOpen(true)} className='bg-white text-black hover:bg-[#575757]'>
                <PlusIcon />
                Add Review
            </Button>

            <Dialog open={open} onOpenChange={() => setOpen(false)} size='medium'>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='font-sans'>Add Review</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <textarea className='w-full h-50 text-white p-3 rounded-[8px] border-[1px] border-white' value={review} 
                        onChange={(e) => setReview(e.target.value)} />
                    </DialogDescription>
                    <DialogFooter>
                        {/* <Button className='bg-white text-black hover:bg-[#c9c9c9]'>
                            Save
                        </Button> */}
                        <SaveReview review={review} id={id} setOpen={setOpen} />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}