import { Mic, Mic2 } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
        <div className='w-full p-5 bg-white'>
            <h1 className='font-bold text-3xl flex items-center gap-2 text-blue-400'>
                <Mic /> Ai Recruiter
            </h1>
        </div>
    )
}

export default Header