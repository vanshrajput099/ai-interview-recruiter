"use client";
import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import FormContainer from '@/app/(main)/_components/FormContainer';
import InterviewReady from '@/app/(main)/_components/InterviewReady';
import Questions from '@/app/(main)/_components/Questions';

const page = () => {

    const [step, setStep] = useState(1);
    const [interviewUrl, setInterviewUrl] = useState(null);
    const [interviewQuestions, setInterviewQuestions] = useState(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        jobPosition: "",
        jobDesc: "",
        interviewDuration: "15Min",
        interviewType: [0],
        validTill: null
    });

    return (
        <div className='w-full mt-10 bg-gray-100 md:w-[65%] md:mx-auto'>
            {
                step === 1 || step === 2 ?
                    <>
                        <div className='flex gap-2 items-center'>
                            <ArrowLeft onClick={() => router.back()} />
                            <h1 className='text-lg font-bold'>Create Your Interview</h1>
                        </div>
                    </>
                    :
                    null
            }

            <div className='w-[100%] overflow-hidden rounded-x mt-5'>
                <Progress value={step * 33.3} className={''} />
            </div>

            {
                step === 1 ?
                    <FormContainer
                        setInterviewQuestions={setInterviewQuestions}
                        setStep={setStep}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    :
                    step === 2 ?
                        <Questions
                            setInterviewUrl={setInterviewUrl}
                            setStep={setStep}
                            interviewQuestions={interviewQuestions}
                            formData={formData}
                        />
                        :
                        step === 3 ?
                            <InterviewReady interviewUrl={interviewUrl} />
                            :
                            null
            }
        </div>
    )
}

export default page