import { SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const OuterHeader = () => {
    return (
        <div className='w-full p-5'>
            <ul className='flex justify-around gap-2 mx-auto'>
                <Link href={"/"}>
                    <li className='border-b-2 border-blue-500 text-sm sm:text-xl'>Home</li>
                </Link>
                <Link href={"/pricing"}>
                    <li className='border-b-2 border-blue-500 text-sm sm:text-xl'>Pricing</li>
                </Link>
            </ul>
        </div>
    )
}

export default OuterHeader