import { Button } from '@/components/ui/button';
import { Calendar, Clock, Tag } from 'lucide-react';
import Candidate from '../../_components/Candidate';
import { getFeedback, getInterviewDetails, getQuestions } from '@/app/actions/interview';
import SendLinkButton from '@/app/(main)/_components/SendLinkButton';

const page = async ({ params }) => {

  const { id } = await params
  const res = await getInterviewDetails(id);
  const questions = await getQuestions(id);
  const allFeedbacks = await getFeedback(id);

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between mt-10'>
        <h1 className='text-2xl font-medium'>Interview Details</h1>
        {
          res.validTill > new Date() && <SendLinkButton url={process.env.NEXT_PUBLIC_HOST_URL + "/" + id} />
        }
      </div>
      <div className='bg-white p-5 mt-5'>
        <div className='text-center flex flex-col gap-2'>
          <div>
            <h1 className='text-xl font-bold'>{res.jobPosition}</h1>
          </div>
          {
            res.validTill > new Date() ?
              <div className='text-center'>
                <p className='bg-green-100 text-green-400 p-2'>Active</p>
                <p className='text-muted-foreground text-sm mt-1'>Valid Till {res.validTill.toString().split(" ").splice(1, 3).join(" ")}</p>
              </div>
              : <p className='bg-red-100 text-red-400 p-2'>Inactive</p>
          }
        </div>
        <div className='mt-4 text-center flex flex-col gap-2 text-sm'>
          <div className='flex justify-between '>
            <h1 className='text-muted-foreground'>Duration</h1>
            <p className='flex gap-2'><Clock /> {res.interviewDuration}</p>
          </div>
          <div className='flex justify-between'>
            <h1 className='text-muted-foreground'>Created On</h1>
            <p className='flex gap-2'><Calendar /> {res.created_at.toString().split(" ").slice(1, 4).join(" ")}</p>
          </div>
          <div className='flex justify-between'>
            <h1 className='text-muted-foreground'>Type</h1>
            <div className='flex gap-2'>
              <div className='flex flex-col gap-2'>
                {
                  res.interviewType.map((ele, idx) => <p key={idx} className='flex items-center bg-blue-100 p-2 text-blue-700 font-medium rounded-sm justify-center'>{ele.charAt(0).toUpperCase() + ele.slice(1)}</p>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h1 className='text-xl font-medium'>Job Description</h1>
          <p className='text-muted-foreground text-sm'>{res.jobDesc}</p>
        </div>
        <div className='mt-5'>
          <h1 className='text-xl font-medium'>Interview Questions</h1>
          <ul className='list-disc ml-5 text-muted-foreground mt-2 text-sm'>
            {
              questions.map((ele, idx) => <li key={idx}>{ele.question}</li>)
            }
          </ul>
        </div>
      </div>
      <div className='mt-5'>
        <h1>Candidates (0)</h1>
        <div className='mt-2 flex flex-col gap-2'>
          {
            allFeedbacks.map((ele, idx) => <Candidate data={ele} key={idx} />)
          }
        </div>
      </div>
    </div>

  )
}

export default page