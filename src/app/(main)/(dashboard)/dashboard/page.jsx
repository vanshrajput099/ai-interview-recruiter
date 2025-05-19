import { getInterviews } from '@/app/actions/dashboard'
import PreviousInterviewBox from '@/app/components/PreviousInterviewBox'
import { checkUser } from '@/app/lib/checkUser'
import { Button } from '@/components/ui/button'
import { Camera, Plus, Video } from 'lucide-react'
import Link from 'next/link'

const page = async () => {

    await checkUser();
    const data = await getInterviews();

    return (
        < >
            <div className="w-full mt-8">
                <h1 className="text-xl lg:text-3xl font-bold">DashBoard</h1>
            </div>
            <div className="w-full mt-1">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="border border-gray-200 p-7 bg-white">
                        <div className="bg-blue-200 px-3 py-2 w-fit rounded-sm">
                            <Camera className="h-[1.5rem] w-[1.5rem] text-blue-700" />
                        </div>
                        <h1 className="text-xl mt-2 lg:text-2xl font-medium">Create New Interview</h1>
                        <p className="text-sm lg:text-base text-muted-foreground">Create Interview Using Ai.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 mt-10">
                <h1 className="text-xl lg:text-3xl font-bold">Previously Created Interviews</h1>
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
        </>
    )
}

export default page