import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { LayoutDashboard, User, User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-[90vh] bg-gray-100'>
      <div className='py-5 sm:mt-10'>

        <h1 className='font-medium text-2xl text-center'>Pricing</h1>
        <div className='grid grid-cols-1 justify-items-center text-center gap-10 mt-5 sm:grid-cols-3'>
          <div className='w-[90%] border border-gray-200 p-4 shadow-lg bg-white'>
            <h1 className='font-bold'>Free</h1>
            <p className='text-xs text-muted-foreground'>Get 5 Free Interview Creations</p>
          </div>
          <div className='w-[90%] border border-gray-200 p-4 shadow-lg flex flex-col gap-2 bg-white'>
            <h1 className='font-bold'>Super Pack</h1>
            <h2>1$</h2>
            <p className='text-xs text-muted-foreground'>Get 5 Free Interview Creations</p>
            <Button className={'bg-blue-400 w-full text-sm'}>Buy Now</Button>
          </div>
          <div className='w-[90%] border border-gray-200 p-4 shadow-lg flex flex-col gap-2 bg-white'>
            <h1 className='font-bold'>Deluxe Pack</h1>
            <h2>2$</h2>
            <p className='text-xs text-muted-foreground'>Get 20 Free Interview Creations</p>
            <Button className={'bg-blue-400 w-full text-sm'}>Buy Now</Button>
          </div>
        </div>

      </div>
      <div className='bg-white w-full p-5 mt-5 text-center'>
        <h1 className='ml-5 font-medium'>Current Pack</h1>
        <SignedIn>
          <div className='flex flex-col gap-2'>
            <h1>Coming Soon...</h1>
            <Link href={'/dashboard'}>
              <Button className={'bg-blue-400 w-full'}><LayoutDashboard /> Go To Dashboard</Button>
            </Link>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex justify-center gap-2 mt-4">
            <Link href={"/sign-in"}>
              <Button className={'bg-blue-500 text-blue-100'}>
                <User /> Sign-In
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button variant={'outline'} className={'border-gray-200'}>
                <User2 /> Log-In
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </div>
  )
}

export default page