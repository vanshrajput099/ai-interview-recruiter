import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from '@/components/ui/progress'

const DialogComponent = ({ children, data }) => {

    const feedbackData = (JSON.parse(data.feedback).feedback)
    let colorClass;

    if (feedbackData.Recommendation.includes("No") || feedbackData.Recommendation.includes("NO")) {
        colorClass = ({
            div: "bg-red-100",
            h1: "text-red-700",
            p: "text-red-900"
        })
    } else if (feedbackData.Recommendation.includes("Yes") || feedbackData.Recommendation.includes("Yes")) {
        colorClass = ({
            div: "bg-green-100",
            h1: "text-green-700",
            p: "text-green-900"
        })
    } else {
        colorClass = ({
            div: "bg-yellow-100",
            h1: "text-yellow-700",
            p: "text-yellow-900"
        })
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className={'bg-gray-100'}>
                <DialogHeader>
                    <DialogTitle>
                        <div className='flex gap-2 items-center'>
                            <img className='w-10 h-10 rounded-full' src="https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg?semt=ais_hybrid&w=740" alt="" />
                            <div>
                                <h1 className='text-2xl font-bold'>{data.username}</h1>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        <div>
                            <h1 className='font-bold text-xl text-black mt-5'>Skills Assesment</h1>
                            <div className='grid grid-cols-2 gap-2 mt-5'>
                                {
                                    Object.keys(feedbackData.rating).map((ele) => {
                                        return (
                                            <div>
                                                <div className='flex justify-between'>
                                                    <p>{ele.charAt(0).toUpperCase() + ele.slice(1)}</p>
                                                    <p>{feedbackData.rating[ele]}/10</p>
                                                </div>
                                                <Progress value={feedbackData.rating[ele] * 10} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div>
                            <h1 className='text-black text-xl font-bold mt-5'>Performance Summary</h1>
                            <p className='p-4 mt-2 bg-white'>{feedbackData.summery}</p>
                        </div>

                        <div className={`p-5 ${colorClass.div} mt-5 rounded-sm`}>
                            <h1 className={`${colorClass.h1} font-bold`}>{feedbackData.Recommendation}</h1>
                            <p className={`${colorClass.p}`}>{feedbackData.RecommendationMsg}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default DialogComponent