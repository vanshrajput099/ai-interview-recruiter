"use client";

import { getUserFeedback } from "@/app/actions/interview";
import { InterviewDataContext } from "@/app/context/InterviewDataContext";
import useFetch from "@/app/hooks/useFetch";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {

    const { interviewData } = useContext(InterviewDataContext);
    const router = useRouter();
    const { loading, error, data, fn } = useFetch(getUserFeedback);
    const [feedbackData, setFeedBackData] = useState(undefined);
    const [colorClass, setColorClass] = useState(null);

    const fun = async () => {
        await fn(interviewData.id, interviewData.email);
    }

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    useEffect(() => {
        fun();
    }, [])

    useEffect(() => {
        if (!interviewData) {
            router.replace("/dashboard")
        }
    }, [])

    useEffect(() => {
        if (!loading && data) {
            const parsedData = JSON.parse(data.feedback).feedback;
            setFeedBackData(parsedData)
            if (parsedData.Recommendation.includes("No") || parsedData.Recommendation.includes("NO")) {
                setColorClass({
                    div: "bg-red-100",
                    h1: "text-red-700",
                    p: "text-red-900"
                })
            } else if (parsedData.Recommendation.includes("Yes") || parsedData.Recommendation.includes("Yes")) {
                setColorClass({
                    div: "bg-green-100",
                    h1: "text-green-700",
                    p: "text-green-900"
                })
            } else {
                setColorClass({
                    div: "bg-yellow-100",
                    h1: "text-yellow-700",
                    p: "text-yellow-900"
                })
            }
        }
    }, [loading, data])

    if (loading) {
        return (
            <div className="min-h-screen min-w-screen flex justify-center items-center">
                <h1 className="text-2xl font-bold flex gap-2">Loading...<Loader2 className="animate-spin" /></h1>
            </div>
        )
    }

    if (!loading && !feedbackData) {
        return (
            <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold flex gap-2 text-center">
                    Not Enough Data To Get Feedback.
                </h1>
                <div className="text-center font-bold text-sm mt-5 md:text-base">
                    <h1>- You Can Now Close This Tab -</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-10 flex flex-col gap-5">
            <div className="">
                <h1 className='font-bold text-xl text-black mt-5'>Skills Assesment</h1>
                <div className='grid grid-cols-1 gap-2 mt-5'>
                    {
                        Object.keys(feedbackData.rating).map((ele, idx) => {
                            return (
                                <div key={idx}>
                                    <div className='flex justify-between text-sm md:text-base'>
                                        <p>{ele.charAt(0).toUpperCase() + ele.slice(1)}</p>
                                        <p>{feedbackData?.rating[ele]}/10</p>
                                    </div>
                                    <Progress value={feedbackData?.rating[ele] * 10} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <h1 className='text-black text-lg font-bold mt-5 md:text-xl'>Performance Summary</h1>
                <p className='p-4 mt-2 bg-white text-sm md:text-base'>{feedbackData?.summery}</p>
            </div>

            <div className={`p-5 ${colorClass.div} mt-5 rounded-sm`}>
                <h1 className={`${colorClass.h1} font-bold`}>{feedbackData?.Recommendation}</h1>
                <p className={`${colorClass.p}`}>{feedbackData?.RecommendationMsg}</p>
            </div>

            <div className="text-center font-bold text-sm mt-5 md:text-base">
                <h1>- You Can Now Close This Tab -</h1>
            </div>
        </div>
    )
}

export default page