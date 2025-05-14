"use client";
import { checkUserFeedBackExist, getInterviewDetails, getQuestions, getUserFeedback } from '@/app/actions/interview';
import { InterviewDataContext } from '@/app/context/InterviewDataContext';
import useFetch from '@/app/hooks/useFetch';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Info, Loader2, Mic2, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

const page = () => {

  const params = useParams();
  const [startInterviewState, setStartInterviewState] = useState(false);
  const [resData, setResData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { setInterviewData } = useContext(InterviewDataContext);
  const router = useRouter();

  const { loading: interviewLoading, error: interviewErr, data: interviewDataAction, fn: getInterviewDataFunction } = useFetch(getInterviewDetails);
  const { loading, error, data, fn } = useFetch(getQuestions);
  const { loading: checkUserDataLoading, error: checkUserDataError, data: checkUserData, fn: checkUserFunnction } = useFetch(checkUserFeedBackExist);

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  useEffect(() => {
    if (interviewErr) {
      toast.error(interviewErr.message)
    }
  }, [interviewErr])

  useEffect(() => {
    if (checkUserDataError) {
      toast.error(checkUserDataError.message)
    }
  }, [checkUserDataError])

  const getInterviewData = async () => {
    await getInterviewDataFunction(params.id);
  }

  useEffect(() => {
    if (!interviewLoading && interviewDataAction) {
      setResData(interviewDataAction);
    }
  }, [interviewLoading, interviewDataAction])

  const startInterview = async () => {
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      toast.error("Enter a valid Google Account");
      return;
    }
    await checkUserFunnction(params.id, email);
    setStartInterviewState(true);
  }

  const startInterviewFunction = async () => {
    await fn(params.id);
  }

  useEffect(() => {
    if (!checkUserDataLoading && checkUserData) {
      toast.error("Interview Is Already Completed By This User");
      return;
    }
    else if (startInterviewState && !checkUserDataLoading && !checkUserData) {
      startInterviewFunction();
    }
  }, [checkUserDataLoading, checkUserData]);

  useEffect(() => {
    getInterviewData();
  }, [])

  useEffect(() => {
    if (!loading && data) {
      setInterviewData({ ...resData, username, questions: data, email });
      router.push("/interview/" + resData.id + "/start")
    }
  }, [loading, data])

  if (!interviewDataAction && interviewLoading) {
    return (
      <div className='h-[90vh] w-full flex items-center justify-center'>
        <h1 className='font-bold text-3xl'>Loading..</h1>
        <Loader2 className='animate-spin ml-4' />
      </div>
    )
  }

  if (!interviewDataAction && !interviewLoading) {
    return (
      <div className='h-[90vh] w-full flex items-center justify-center'>
        <h1 className='font-bold text-3xl'>Invalid Interview Link</h1>
      </div>
    )
  }

  if (interviewDataAction && interviewDataAction.validTill < new Date() && !interviewLoading) {
    return (
      <div className='h-[90vh] w-full flex items-center justify-center'>
        <h1 className='font-bold text-3xl'>Interview Is Inactive.</h1>
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-100 flex items-center min-h-screen'>
      <div className='w-[75%] p-5 bg-white rounded-sm mx-auto md:w-[50%]'>
        <div className='text-center'>
          <h1 className='text-2xl sm:text-5xl font-bold flex items-center justify-center text-blue-500'><Mic2 />AI Recruiter</h1>
          <p className='text-sm sm:text-base text-muted-foreground'>Ai Powered Interview Platform</p>
        </div>
        <div className='flex justify-between w-full mt-5'>
          <h1>{resData?.jobPosition}</h1>
          <p>{resData?.interviewDuration}</p>
        </div>
        <div className='flex flex-col gap-5 mt-5'>
          <div className='flex flex-col gap-2'>
            <Label>Full Name</Label>
            <Input className={'text-sm'} onChange={(e) => setUsername(e.target.value)} placeholder={"E.g Sam Alexandar"} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Email Address</Label>
            <Input className={'text-sm'} onChange={(e) => setEmail(e.target.value)} placeholder={"sam@gmail.com"} />
          </div>
        </div>
        <div className='bg-blue-100 text-sm text-blue-600 p-2 flex flex-col items-center mt-5'>
          <Info />
          <div>
            <h1>Before You Login</h1>
            <p>1. Ensure A Stable Internet Connection.</p>
            <p>2. Test Your Camera And Microphone.</p>
            <p>3. Find A Quiet Place For Interview.</p>
          </div>
        </div>
        <div className='mt-5 w-full'>
          <Button disabled={username.length < 3} onClick={startInterview} className={'bg-blue-400 w-full'} >
            {
              loading ?
                <>
                  <Loader2 className='animate-spin' /> Joining..
                </>
                :
                <>
                  <Video /> Join The Interview
                </>
            }
          </Button>
        </div>

      </div>
    </div>
  )
}

export default page