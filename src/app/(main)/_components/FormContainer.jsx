"use client";

import React, { useEffect, useState } from 'react'
import { interview_type } from '@/app/data/data';
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner';
import useFetch from '@/app/hooks/useFetch';
import { generateInterviewQuestions } from '@/app/actions/interview';
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

const FormContainer = ({ setStep, formData, setFormData, setInterviewQuestions }) => {

    const [interviewTypeArr, setInterviewTypeArr] = useState([0]);
    const [date, setDate] = useState();
    const [open, setOpen] = useState(false);
    const { loading, data, error, fn } = useFetch(generateInterviewQuestions);

    const addOrRemoveInterviewType = (idx) => {
        let arr = interviewTypeArr;
        if (arr.includes(idx)) {
            arr = arr.filter((ele) => ele !== idx);
        } else {
            arr.push(idx);
        }

        if (arr.length === 0) return;
        setInterviewTypeArr(arr);
    }

    const setDataInForm = (item, value) => {
        setFormData((prev) => ({ ...prev, [item]: value }))
    }

    const onSubmit = async () => {
        const finalData = { ...formData, interviewType: interviewTypeArr.map((ele) => interview_type[ele].id) };
        for (const ele of Object.values(finalData)) {
            if (!ele || ele.toString().trim() === "") {
                toast.error("Enter data in all the fields");
                return; 
            }
        }
        setFormData(finalData);
        await fn(finalData);
    }

    useEffect(() => {
        if (!loading && data) {
            setInterviewQuestions(data)
            setStep((prev) => prev + 1);
        }
    }, [loading, data])

    useEffect(() => {
        if (error) {
          toast.error(error.message)
        }
      }, [error])

    return (
        <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-3 bg-white p-5 mt-5 rounded-sm'>
            <div className='flex flex-col gap-2'>
                <Label>Job Position</Label>
                <Input className={'text-sm '} onChange={(e) => { setDataInForm("jobPosition", e.target.value) }} placeholder={"Enter the job position"} />
            </div>
            <div className='flex flex-col gap-2'>
                <Label>Job Description</Label>
                <Textarea className={'text-sm '} onChange={(e) => { setDataInForm("jobDesc", e.target.value) }} placeholder={"Enter the job description"} />
            </div>
            <div className='flex flex-col gap-2'>
                <Label>Valid Till</Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(e) => { setDate(e); setDataInForm("validTill", e); setOpen(false) }}
                            initialFocus
                            disabled={(date) => {
                                const thirtyDaysAfter = new Date().setDate(new Date().getDate() + 30);
                                const today = new Date();
                                return date < today || date > thirtyDaysAfter;
                            }
                            }
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className='flex flex-col gap-2'>
                <Label>Interview Duration</Label>
                <Select defaultValue={"15Min"} onValueChange={(e) => { setDataInForm("interviewDuration", e) }}>
                    <SelectTrigger className="w-full" >
                        <SelectValue placeholder="Interview Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5Min">5Min</SelectItem>
                        <SelectItem value="15Min">15Min</SelectItem>
                        <SelectItem value="30Min">30Min</SelectItem>
                        <SelectItem value="45Min">45Min</SelectItem>
                        <SelectItem value="60Min">60Min</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-col gap-2'>
                <Label>Interview Type</Label>
                <div className='flex flex-wrap gap-2 justify-between'>
                    {
                        interview_type.map((ele, idx) => {
                            return (
                                <div key={idx}
                                    onClick={() => { setDataInForm("interviewType", interview_type[idx].id); addOrRemoveInterviewType(idx); }}
                                    className={`flex gap-1 px-4 py-2 rounded-xl ${interviewTypeArr.includes(idx) ? "bg-blue-100" : "bg-gray-100"}  text-white items-center`}>
                                    <ele.icon className={`${interviewTypeArr.includes(idx) ? "text-blue-500" : "text-black"} h-[1rem] w-[1rem]`} />
                                    <h1 className={`${interviewTypeArr.includes(idx) ? "text-blue-500" : "text-black"} font-medium text-sm`}>{ele.name}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                loading ?
                    <>
                        <div className='flex flex-col items-center justify-center gap-2 md:flex-row md:items-center p-5 border bg-blue-100 text-blue-500 '>
                            <Loader2 className='animate-spin' />
                            <div className='text-center flex flex-col gap-2 md:gap-0'>
                                <h1 className='font-bold text-sm md:text-base'>Generating Interview Questions</h1>
                                <p className='text-sm md:text-base'>AI is currently creating a personalised interview as per your requirements.</p>
                            </div>
                        </div>
                    </>
                    :
                    null
            }
            <div className='flex flex-col-reverse gap-2 mt-5 md:flex-row md:justify-between'>
                <Button variant={'outline'}>
                    Cancel
                </Button>
                <Button onClick={onSubmit} disabled={loading} className={'bg-blue-400 text-white font-medium flex gap-2'}>
                    Generate Interview <ArrowRight />
                </Button>
            </div>
        </form>
    )
}

export default FormContainer