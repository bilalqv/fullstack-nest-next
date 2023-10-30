'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Navbar(): JSX.Element {
    const pathname = usePathname();
    const { data } = useSession();
    // console.log('data = ', data);

    return (
        <div className=" dark:text-white fixed flex rounded-2xl top-0 left-0 right-0 w-max mx-auto border border-gray-700 outline-1 p-1 space-x-4
    ">
            <Link className={`nav-btn ${pathname == '/' ? 'nav-btn-active' : ''}`} href="/"> Home </Link>
            <Link className={`nav-btn ${pathname == '/register' ? 'nav-btn-active' : ''}`} href="/register"> Register </Link>
            <Link className={`nav-btn ${pathname == '/login' ? 'nav-btn-active' : ''}`} href="/login"> Login </Link>
            <Link className={`nav-btn ${pathname == '/dashboard' ? 'nav-btn-active' : ''}`} href="/dashboard"> Dashboard </Link>
            <Link className={`nav-btn ${pathname == '/payments' ? 'nav-btn-active' : ''}`} href="/payments"> Users </Link>
            {
                data && data.user?.email && (
                    <button className="nav-btn" onClick={() => signOut()} >Logout</button>
                )
            }
        </div>
    )
}