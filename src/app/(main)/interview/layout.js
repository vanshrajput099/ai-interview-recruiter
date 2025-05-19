"use client";
import React, { useState } from 'react'
import { InterviewDataContext } from '@/app/context/InterviewDataContext'

const DashBoardLayout = ({ children }) => {

    const [interviewData, setInterviewData] = useState();

    return (
        <div className='bg-gray-100 min-h-[100vh]'>
            <InterviewDataContext.Provider value={{ interviewData, setInterviewData }}>
                {children}
            </InterviewDataContext.Provider>
        </div>
    )
}

export default DashBoardLayout