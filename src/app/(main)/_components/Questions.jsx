"use client";
import { addInterview } from "@/app/actions/interview";
import useFetch from "@/app/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Questions = ({ interviewQuestions, formData, setStep, setInterviewUrl }) => {

  const { loading, error, fn, data } = useFetch(addInterview);

  const string = interviewQuestions.content;
  const cleanedText = string.replace(/```(?:json)?\n?/g, "");
  const jsonObj = JSON.parse(cleanedText);

  const onSubmit = async () => {
    await fn(jsonObj.interviewQuestions, formData);
  }

  useEffect(() => {
    if (!loading && data) {
      setInterviewUrl(process.env.NEXT_PUBLIC_HOST_URL + "/" + data.id);
      setStep((prev) => prev + 1);
    }
  }, [loading, data])

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return (
    <div className="w-full bg-white p-5 mt-5 flex flex-col gap-3">
      {
        jsonObj.interviewQuestions.map((ele, idx) => {
          return (
            <div key={idx} className="border border-gray-200 py-2 px-4 bg-gray-100 rounded-sm">
              <h1 className="font-medium text-[0.8rem] md:text-base">{ele.question}</h1>
              <p className="text-blue-600 text-sm mt-1 md:text-base">{ele.type}</p>
            </div>
          )
        })
      }
      <Button disabled={loading} onClick={onSubmit} className={'bg-blue-400 w-full text-sm md:text-base'}>
        {loading ? <><Loader2 className="animate-spin" /> Generating...</> :
          "Generate Interview"}
      </Button>
    </div>
  )
}

export default Questions