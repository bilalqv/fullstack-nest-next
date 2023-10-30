import { access } from "fs";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
    },
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    accessToken: token.accessToken,
                }
            }
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    accessToken: u.accessToken,
                }

            }
            return token;
        },
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }