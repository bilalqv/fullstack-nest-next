import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    if (!credentials || !credentials.email || !credentials.password) {
                        return null
                    }
                    console.log('authorize');
                    const res = await fetch("http://localhost:3003/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(credentials)
                    });
                    // {
                    //     id: 123,
                    //     name: "John Doe",
                    //     accessToken: "ABC.123.XYZ",
                    // }
                    const data = await res.json();
                    console.log('data:= ', data);
                    if (data && data.status === "success") {
                        return data;
                    } else {
                        return null;
                    }
                } catch (err: any) {
                    console.log('Error:= ', err.message);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    }
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, config)
}