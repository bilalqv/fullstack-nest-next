'use client'
import LoginForm from "@/components/forms/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ZSignInFormSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(6),
});

type TSignInFormSchema = z.infer<typeof ZSignInFormSchema>;

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TSignInFormSchema>({
        resolver: zodResolver(ZSignInFormSchema),
    })

    function handleLogin({ email, password }: TSignInFormSchema) {

        try {
            signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/dashboard',
            });

            toast({
                title: 'Logged in.',
                description: "You've been logged in.",
            });
        } catch (err) {
            toast({
                title: 'Something went wrong.',
                description: "Unable to log you in.",
                variant: 'destructive'
            });
        }
    }

    // text-center flex justify-center flex-col  min-h-screen p-0

    return (
        <main className="flex max-h-screen flex-col items-center justify-center">
            <div className="">
                <p className=" text-center font-bold mb-3 text-lg">Login</p>

                <LoginForm />

                <p className="mt-4">Not Registered? <Link href='/register' className=" text-green-700">Register</Link> </p>
            </div>
        </main>
    )
}
