import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='text-center space-y-2'>
        <h1 className='font-bold text-2xl'>Page Not Found.</h1>
        <SignedIn>
          <Link href={"/dashboard"}>
            <Button className={'bg-blue-500'}>Go Back To Dashboard</Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <Link href={"/"}>
            <Button className={'bg-blue-500'}>Go Back</Button>
          </Link>
        </SignedOut>
      </div>
    </div>
  )
}

export default notFound