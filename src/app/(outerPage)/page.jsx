import { checkUser } from "@/app/lib/checkUser";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Camera, Copy, LayoutDashboard, LayoutDashboardIcon, Mail, Mic, Mic2, Mic2Icon, Plus, Send, User, User2, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {

  await checkUser();

  return (
    <div className="w-full">
      <div className="">
        <div className="p-10 bg-white text-center mx-auto">
          <h1 className="font-bold text-3xl flex justify-center items-center gap-2"><Mic /> Ai Recruiter</h1>
          <p className="text-sm text-muted-foreground mt-2">Welcome to AI Recruiter, your intelligent partner in streamlining interview processes.</p>
          <div className="mt-5">
            <SignedIn>
              <Link href={"/dashboard"}>
                <Button className={'bg-blue-500 text-blue-100 w-full'}>
                  <LayoutDashboardIcon /> DashBoard
                </Button>
              </Link>
            </SignedIn>

            <SignedOut>
              <div className="flex justify-center gap-2">
                <Link href={"/sign-in"}>
                  <Button className={'bg-blue-500 text-blue-100'}>
                    <User /> Sign-In
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button variant={'outline'} className={''}>
                    <User2 /> Log-In
                  </Button>
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>

        <div className="bg-gray-100 w-full mt-10 py-20 px-10  flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-medium text-2xl">How It Works ?</h1>
            <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-3 md:items-stretch">
              <div className="h-full flex flex-col items-center gap-2 p-5 rounded-lg bg-white shadow-xl">
                <p className="font-bold rounded-full bg-blue-100 h-[50px] w-[50px] flex items-center justify-center">1</p>
                <h1 className="font-medium">Create Interview</h1>
                <p className="text-muted-foreground text-sm">Set Your Job Requirement And Review The Questions.</p>
              </div>
              <div className="h-full flex flex-col items-center gap-2 p-5 rounded-lg bg-white shadow-xl">
                <p className="font-bold rounded-full bg-blue-100 h-[50px] w-[50px] flex items-center justify-center">2</p>
                <h1 className="font-medium">Share With Candidates</h1>
                <p className="text-muted-foreground text-sm">Send Interview Links To Candidates to complete complete their interview.</p>
              </div>
              <div className="h-full flex flex-col items-center gap-2 p-5 rounded-lg bg-white shadow-xl">
                <p className="font-bold rounded-full bg-blue-100 h-[50px] w-[50px] flex items-center justify-center">3</p>
                <h1 className="font-medium">Feedback</h1>
                <p className="text-muted-foreground text-sm">Get AI-Analyzed Result and candidate companions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-10 py-20 px-10">
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-medium text-2xl">Ready To Transform Your Hiring Process ?</h1>
            <p className="text-muted-foreground text-sm">Join hundreds of companies using AI-Recruiter.</p>
            <SignedIn>
              <Link href={"/dashboard"} className="">
                <Button className={'bg-blue-500 text-blue-100 w-full'}>
                  <LayoutDashboardIcon /> DashBoard
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <div className="flex justify-center gap-2">
                <Link href={"/sign-in"}>
                  <Button className={'bg-blue-500 text-blue-100'}>
                    <User /> Sign-In
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button variant={'outline'} className={''}>
                    <User2 /> Log-In
                  </Button>
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>

        
      </div>
    </div>
  );
}
