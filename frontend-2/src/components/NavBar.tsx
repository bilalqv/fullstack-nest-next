'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { ModeToggle } from "./ModeToggle";

export default function Navbar(): JSX.Element {
    const pathname = usePathname();
    const { data } = useSession();
    // console.log('data = ', data);

    return (
        <div className="  fixed flex rounded-md top-0 left-0 right-0 w-10/12 md:w-3/4 mx-auto p-1 space-x-4
        justify-between content-center items-center
    ">
            <div className=" self-start mt-3">
                <Link className={`p-2 hover:text-green-800 ${pathname == '/' ? 'font-bold text-green-700' : ''}`} href="/"> Home </Link>
                <Link className={`p-2 hover:text-green-800 ${pathname == '/register' ? 'font-bold text-green-700' : ''}`} href="/register"> Register </Link>
                <Link className={`p-2 hover:text-green-800 ${pathname == '/login' ? 'font-bold text-green-700' : ''}`} href="/login"> Login </Link>
                <Link className={`p-2 hover:text-green-800 ${pathname == '/dashboard' ? 'font-bold text-green-700' : ''}`} href="/dashboard"> Dashboard </Link>
                <Link className={`p-2 hover:text-green-800 ${pathname == '/payments' ? 'font-bold text-green-700' : ''}`} href="/payments"> Users </Link>
            </div>
            <div className=" self-end">
                {
                    data && data.user?.email && (
                        <button className="nav-btn" onClick={() => signOut()} >Logout</button>
                    )
                }
                <ModeToggle />
            </div>
        </div>
    )
}