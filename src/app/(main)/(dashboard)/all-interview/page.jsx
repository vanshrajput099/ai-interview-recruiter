import { getInterviews } from '@/app/actions/dashboard';
import PreviousInterviewBox from '@/app/components/PreviousInterviewBox';
import { Button } from '@/components/ui/button';
import { Plus, Video } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const page = async () => {

    const data = await getInterviews();

    return (
        <div className="w-full container mx-auto py-10">
            <h1 className="text-xl sm:text-3xl font-bold">Previously Created Interviews</h1>
            <div className="grid grid-cols-1 mt-5 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {
                    data.length === 0 ?
                        <>
                            <div className="mt-5 w-fit bg-white p-5">
                                <div className="flex flex-col gap-2">
                                    <Video size={'1.4rem'} />
                                    <h1 className="font-medium text-lg">No Interview Found..</h1>
                                    <Link href={"/dashboard/create-interview"}>
                                        <Button className="bg-blue-400 px-10 py-2 rounded-sm flex gap-2 w-fit text-sm">
                                            <Plus />Create Interview
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </>
                        :
                        data.map((ele, idx) => <PreviousInterviewBox key={idx} data={ele} />)
                }
            </div>
        </div>
    )
}

export default page