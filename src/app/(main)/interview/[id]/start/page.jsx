"use client";
import { InterviewDataContext } from '@/app/context/InterviewDataContext'
import { Loader2, Mic, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import ai from "@/assets/ai.png"
import Vapi from "@vapi-ai/web";
import AlertBox from './_components/AlertBox';
import { toast } from 'sonner';
import useFetch from '@/app/hooks/useFetch';
import { setFeedback } from '@/app/actions/interview';
import { useRouter } from 'next/navigation';
import { LoadingOverlay } from './_components/LoadingOverlay';
import { colors } from '@/app/data/data';

const page = () => {

  const colorIndex = Math.floor(Math.random() * colors.length);
  const { interviewData } = useContext(InterviewDataContext);
  const [cancel, setCancel] = useState(true);
  const router = useRouter();
  const [conversation, setConversation] = useState(null);
  const [activeUser, setActiveUser] = useState(false);
  const vapi = useMemo(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_API), []);
  const { loading, error, fn, data } = useFetch(setFeedback);

  const startCall = () => {
    let questionString;
    interviewData?.questions.map((ele, idx) => {
      if (idx === 0) {
        questionString = ele?.question + ",";
      } else {
        questionString = questionString + "," + ele?.question;
      }
    })

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewData.username}, how are you? Ready for your interview on {{JobPosition}}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
        You are an AI voice assistant conducting interviews.
        Your job is to ask candidates interview questions, assess their responses.
        Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
        "Hey there! Welcome to your ${interviewData.jobPosition} interview. Let’s get started with a few questions!"
        Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions ask one by one:
        Questions: ${questionString}
        If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
        "Need a hint? Think about how React tracks component updates!"
        Provide brief, encouraging feedback after each answer. Example:
        "Nice! That’s a solid answer."
        "Hmm, not quite! Want to try again?"
        Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
        After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
        "That was great! You handled some tough questions well. Keep sharpening your skills!"
        End on a positive note:
        "Thanks for chatting! Hope to see you crushing projects soon!"
        Key Guidelines:
        ✅ Be friendly, engaging, and witty
        ✅ Keep responses short and natural, like a real conversation
        ✅ Adapt based on the candidate’s confidence level
        ✅ Ensure the interview remains focused on React
        `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
    setCancel(false);
  }

  useEffect(() => {

    const handleMessage = (message) => {
      if (message.conversation) {
        setConversation(message.conversation);
      }
    }

    vapi.on("message", handleMessage);

    const onSpeechStart = () => setActiveUser(false);
    const onSpeechEnd = () => setActiveUser(true);
    const onCallStart = () => toast("Call Connected");
    const onCallEnd = () => toast("Interview Disconnected");

    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
    }
  }, [])

  useEffect(() => {
    interviewData && startCall();
  }, [interviewData])

  const endInterviewFunction = async () => {
    await vapi.stop();
    setCancel(true);
    if (conversation && conversation.length < 10) {
      await fn(conversation, interviewData.username, interviewData.email, interviewData.id);
    } 
    setTimeout(() => {
      router.replace("/interview/" + interviewData.id + "/completed");
    }, 100);
  }

  useEffect(() => {
    if (!loading && data) {
      router.replace("/dashboard")
    }
  }, [loading, data])

  useEffect(() => {
    if (!interviewData) {
      toast.error("Interview Doesnot Exist");
      router.replace("/dashboard")
    }
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  if (!interviewData) {
    return (
      <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
        <div>
          <h1 className='flex font-medium gap-2'>Loading <Loader2 className='animate-spin' /></h1>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      {
        cancel && <LoadingOverlay />
      }
      <div className='min-h-screen py-10 flex flex-col justify-between gap-5'>
        <div className='text-center'>
          <h1 className='font-bold text-xl sm:text-2xl'>AI Interview Session</h1>
        </div>
        <div className='flex flex-col gap-4 mt-5 w-full'>

          <div className='bg-white flex flex-col items-center justify-center gap-2 shadow-lg w-1/2 mx-auto h-[180px]'>
            {!activeUser && <span className=' bg-blue-100 opacity-75 animate-ping p-1 rounded-full w-[100px] h-[100px] absolute'></span>}
            <Image src={ai} className='rounded-full h-[50px] w-[50px]' alt='ai.png' />
            <h1>Ai Recruiter</h1>
          </div>

          <div className='bg-white flex flex-col items-center justify-center gap-2 shadow-lg w-1/2 mx-auto h-[180px]'>
            {activeUser && <span className=' bg-blue-100 opacity-75 animate-ping p-1 rounded-full w-[100px] h-[100px] absolute'></span>}
            <div className={`${colors[colorIndex].color} h-[40px] w-[40px] flex justify-center items-center rounded-full text-white font-bold`}>
              {interviewData?.username.charAt(0).toUpperCase() || "Vansh".charAt(0).toUpperCase()}
            </div>
            <h1>{interviewData?.username}</h1>
          </div>

        </div>
        <div className='mt-5'>
          <div className='flex justify-center gap-5'>
            <div className='bg-white flex items-center justify-center p-5 rounded-full'>
              <Mic size={'1rem'} />
            </div>
            <div className='bg-red-500 flex items-center justify-center p-5 rounded-full text-white'>
              <AlertBox endInterview={endInterviewFunction}>
                <PhoneCall size={'1rem'} />
              </AlertBox>
            </div>
          </div>
          <h1 className='text-center font-medium mt-3'>Interview In Progress...</h1>
        </div>
      </div>
    </div>
  )
}

export default page