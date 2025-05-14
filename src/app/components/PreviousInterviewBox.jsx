"use client";
import { Button } from '@/components/ui/button'
import { Copy, Mail, Send } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import SendLinkButton from '../(main)/_components/SendLinkButton';

const PreviousInterviewBox = ({ data, detailBox = false }) => {

    const router = useRouter();

    const copyLink = () => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_URL + "/" + data.id)
            .then(() => {
                toast("Link Copied");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    }

    return (
        <div className="flex flex-col gap-2 border border-gray-200 p-7 bg-white">
            <div className="w-full flex justify-between items-center">
                <div className="bg-blue-200 px-3 py-2 rounded-sm w-fit">
                    <Mail className="h-[1.5rem] w-[1.5rem] text-blue-700" />
                </div>
                <p className="text-muted-foreground text-sm">{data.created_at.toString().split(" ").splice(1, 3).join(" ")}</p>
            </div>
            <div>
                <h1 className="text-lg lg:text-xl font-bold">{data.jobPosition}</h1>
            </div>
            <div className='flex justify-between'>
                <p className="text-sm sm:text-base text-muted-foreground">{data.interviewDuration}</p>
                {
                    detailBox && <p className="text-green-600 text-sm lg:text-base">{data.feedbackArr.length} Candidate</p>
                }
            </div>
            {
                detailBox && <Button className={'w-full border-gray-200'} variant={'outline'} onClick={() => router.push("/scheduled-interview/" + data.id + "/detail")}>Get Details</Button>
            }

            {
                !detailBox &&
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between w-full mt-2">
                    <>
                        <Button onClick={copyLink} variant={'outline'} className={'text-[0.8rem] border-gray-200'}>
                            <Copy />Copy Link
                        </Button>
                        <SendLinkButton url={process.env.NEXT_PUBLIC_HOST_URL + "/" + data.id} />
                    </>
                </div>
            }


        </div>
    )
}

export default PreviousInterviewBox