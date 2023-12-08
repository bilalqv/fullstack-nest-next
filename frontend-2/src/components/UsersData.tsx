import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';

async function getData() {
    try {
        const secret = process.env.NEXTAUTH_SECRET;
        const session = await getServerSession(authOptions);
        const res = await fetch('http://localhost:3003/users/all', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.user?.accessToken}`,
            }
        });

        const data = await res.json();
        return data;
    } catch (err) {
        return 'Error';
    }

}

export default async function UsersData() {
    const data = await getData();
    return (
        <div className="border rounded-md p-4 bg-gray-50">
            <p className="font-bold">Users Data</p>
            {
                (data && data.success) ? (
                    data.data.map((person: any, id: any) => (
                        <div key={id} className='flex space-x-3 py-4 my-2'>
                            <p> {person.id} </p>
                            <p> {person.firstName} </p>
                            <p> {person.lastName} </p>
                        </div>
                    ))
                ) : (<p> = Error </p>)
            }
        </div>
    );
}