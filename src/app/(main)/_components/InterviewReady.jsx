import React from 'react'
import { ArrowLeft, Calendar, CircleCheck, Clock, Copy, FileQuestion, Mail, PhoneCall, Plus, SlackIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SendLinkButton from './SendLinkButton';
import { toast } from 'sonner';

const InterviewReady = ({ interviewUrl }) => {

    const copyLink = () => {
        navigator.clipboard.writeText(interviewUrl)
            .then(() => {
                toast("Link Copied");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    }

    return (
        <div className='mt-5'>
            <div className='flex flex-col items-center gap-5'>
                <CircleCheck style={{ backgroundColor: 'green', borderRadius: '100%', color: 'white' }} size={'4rem'} />
                <div className='text-center'>
                    <h1 className='font-bold text-lg md:text-xl'>Your AI Interview is Ready.</h1>
                    <p className='text-muted-foreground font-medium text-xs md:text-base'>Share Your Interview Link.</p>
                </div>
            </div>

            <div className='w-full p-5 flex flex-col gap-3 bg-white mt-5'>
                <div className='flex flex-col gap-2 items-center'>
                    <h1 className='font-medium text-2xl'>Interview Link</h1>
                    <h1 className='bg-blue-100 text-blue-500 text-sm font-medium px-2 py-1 rounded-sm'>Valid For 30Days</h1>
                </div>
                <div className='items-center flex flex-col gap-2 mt-5'>
                    <div className='border border-gray-200 w-full px-2 py-2 text-xs overflow-hidden'>
                        {interviewUrl}
                    </div>
                    <Button onClick={copyLink} variant={'outline'} className={'text-[0.8rem] '}>
                        <Copy />
                        Copy Link
                    </Button>
                </div>

                <div className='flex flex-col gap-2 mt-5 text-muted-foreground text-sm'>
                    <div className='flex gap-2 items-center'>
                        <Clock />
                        30Min
                    </div>
                    <div className='flex gap-2 items-center'>
                        <FileQuestion />
                        10 Questions
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Calendar />
                        Expires: Nov,20,2025
                    </div>
                </div>
            </div>

            <div className='w-full p-5 flex flex-col gap-5 bg-white'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-lg'>Share</h1>
                    <SendLinkButton url={interviewUrl} />
                </div>
            </div>

            <div className='mt-5 flex flex-col gap-2 md:flex md:justify-between'>
                <Button variant={'outline'} className={'w-full text-xs md:text-base md:w-fit'}>
                    <ArrowLeft />
                    Back To Dashboard
                </Button>
                <Button className={' bg-blue-400 w-full text-xs md:text-base md:w-fit'}>
                    <Plus />
                    Create New Interview
                </Button>
            </div>
        </div>
    )
}

export default InterviewReady