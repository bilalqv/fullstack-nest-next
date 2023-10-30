'use client';
import { useRouter } from "next/navigation";
import { useRef, useState } from "react"

export default function Register() {
    const firstName = useRef('');
    const lastName = useRef('');
    const email = useRef('');
    const password = useRef('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                firstName: firstName.current,
                lastName: lastName.current,
                email: email.current,
                password: password.current
            };
            const res = await fetch('http://localhost:3003/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            router.push('/login');
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="p-5 border border-gray-700 rounded-lg" >
                <p className=" text-center font-bold mb-3 text-lg">Register</p>
                <form method="" onSubmit={handleSubmit} action="#" className=' space-y-3'>
                    <div>
                        <label className=' block'>First Name: </label>
                        <input onChange={e => firstName.current = e.target.value} className='p-2 rounded-md focus:border-blue-100 focus:ring-blue-500' type="text" name="firstName" />
                    </div>

                    <div>
                        <label className=' block'>Last Name: </label>
                        <input onChange={e => lastName.current = e.target.value} className='p-2 rounded-md focus:border-blue-100 focus:ring-blue-500' type="text" name="lastName" />
                    </div>

                    <div>
                        <label className=' block'>Email: </label>
                        <input onChange={e => email.current = e.target.value} className='p-2 rounded-md focus:border-blue-100 focus:ring-blue-500' type="email" name="email" />
                    </div>
                    <div>
                        <label className=' block'>Password: </label>
                        <input onChange={e => password.current = e.target.value} className='p-2 rounded-md focus:border-blue-100 focus:ring-blue-500' type="password" name="password" />
                    </div>

                    <button className=' bg-gray-50 p-2 rounded-md hover:bg-gray-100 w-max mx-auto' type="submit"> {loading ? 'Registering' : 'Register'} </button>
                </form>
            </div>
        </main>
    )
}
