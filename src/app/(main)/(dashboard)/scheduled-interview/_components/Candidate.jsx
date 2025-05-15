"use client";
import { Button } from '@/components/ui/button'
import DialogComponent from '../[id]/detail/_components/DialogComponent';

const Candidate = ({ data }) => {

    const feedbackData = (JSON.parse(data.feedback)).feedback

    let percentage = 0;
    Object.keys(feedbackData.rating).forEach((ele) => {
        percentage = percentage + feedbackData.rating[ele];
    })

    return (
        <div className='bg-white space-y-2 p-2 rounded-sm'>
            <div className='flex'>
                <img className='w-10 h-10 rounded-full' src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg?semt=ais_hybrid&w=740" alt="" />
                <div>
                    <h1>{data.username}</h1>
                    <p className='text-sm text-muted-foreground'>Completed on {data.created_at.toString().split(" ").splice(1, 3).join(" ")}</p>
                </div>
            </div>
            <div className='flex items-center gap-2 justify-end'>
                <h1 className='text-sm'>{percentage / 4}/10</h1>
                <DialogComponent data={data}>
                    <Button variant={'outline'}>View Report</Button>
                </DialogComponent>
            </div>
        </div>
    )
}

export default Candidate