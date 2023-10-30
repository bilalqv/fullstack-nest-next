'use client'
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

export default function Login() {
    const email = useRef('');
    const password = useRef('');
    const [data, setData] = useState('');

    function handleLogin(e: any) {
        e.preventDefault();

        signIn('credentials', {
            email: email.current,
            password: password.current,
            redirect: true,
            callbackUrl: '/dashboard',
        });
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p>Login</p>
            <div >
                <form onSubmit={handleLogin} className=' space-y-3'>
                    <div>
                        <label className=' block'>Email: </label>
                        <input onChange={e => email.current = e.target.value} className='p-2 rounded-md  focus:border-blue-100 focus:ring-blue-500' type="email" name="email" />
                    </div>
                    <div>
                        <label className=' block'>Password: </label>
                        <input onChange={e => password.current = e.target.value} className='p-2 rounded-md focus:border-blue-100 focus:ring-blue-500' type="password" name="password" />
                    </div>
                    <button className=' bg-gray-50 p-2 rounded-md hover:bg-gray-100 w-max mx-auto' type="submit">Login</button>
                </form>
            </div>
            <p> {data} </p>
        </main>
    )
}
