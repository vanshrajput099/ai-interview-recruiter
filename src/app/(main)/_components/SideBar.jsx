"use client";
import React from 'react'
import { Book, Camera, Computer, DollarSign, LayoutDashboard, Mic, Settings } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { sideBar } from '@/app/data/data';

const SideBar = () => {

    return (
        <div className="border-r-2 border-gray-200 flex flex-col w-fit items-center h-[100vh]">
            <div className="flex gap-5 text-3xl flex-col items-center mt-5">
                <Mic className="h-[2rem] w-[2rem] sm:h-[3rem] sm:w-[3rem]" />
                <h1 className="text-center font-bold text-lg sm:text-base">Ai Recruiter</h1>
            </div>
            <Link href={"/dashboard/create-interview"} className='mx-auto'>
                <Button className={'bg-blue-400 mt-4 text-sm sm:text-normal'}>+ Create New Interview</Button>
            </Link>
            <div className="p-3 flex flex-col">
                {
                    sideBar.map((ele, idx) => {
                        if (ele.href) {
                            return <Link key={idx} href={ele.href}>
                                <div className="flex gap-2 items-center py-5 px-2">
                                    <ele.icon className="h-[1rem] w-[1rem]" /> <h1 className="text-sm sm:text-lg">{ele.name}</h1>
                                </div>
                            </Link>
                        }

                        return <div key={idx} className="flex gap-1 flex-col py-5 px-2">
                            <div className='flex items-center gap-2'>
                                <ele.icon className="h-[1rem] w-[1rem]" /> <h1 className="text-sm sm:text-lg">{ele.name}</h1>
                            </div>
                            <p className='text-sm sm:text-lg'>Coming Soon..</p>
                        </div>
                    })
                }
            </div>
        </div >
    )
}

export default SideBar