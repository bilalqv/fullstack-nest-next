'use client';
import Link from "next/link";
import RegisterForm from "@/components/forms/register";

export default function Register() {

    return (
        <main className="flex max-h-screen flex-col items-center justify-center">
            <div className="" >
                <p className=" text-center font-bold mb-3 text-lg">Register</p>
                <RegisterForm />

                <p className="mt-4">Already Registered? <Link href='/login' className=" text-green-700">Login</Link> </p>
            </div>
        </main>
    )
}

