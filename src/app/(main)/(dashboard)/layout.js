import { UserButton } from "@clerk/nextjs"
import SideBar from "../_components/SideBar"
import { MenuIcon } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-[100vh]">
            <div className="max-md:hidden">
                {
                    <SideBar />
                }
            </div>
            <div className="w-full flex flex-col p-10 bg-gray-100 md:w-[85%]">
                <div className="w-full bg-white flex gap-2 items-center p-5 justify-between">
                    <div className="flex items-center gap-2">
                        <div className="hidden max-md:block">
                            <Sheet>
                                <SheetTrigger><MenuIcon /></SheetTrigger>
                                <SheetContent side="left" className={'w-fit'}>
                                    <SheetHeader></SheetHeader>
                                    <SideBar />
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold md:text-2xl">Welcome Back, <br /> Vansh Rajput</h1>
                            <p className="text-sm text-muted-foreground">Ai-Driven Interviews</p>
                        </div>
                    </div>
                    <UserButton />
                </div>
                {children}
            </div>
        </div >
    )
}

export default AuthLayout