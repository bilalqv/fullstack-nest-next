'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
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

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
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

    return (

        <form onSubmit={handleSubmit(handleLogin)} className="flex w-full flex-col gap-y-4" >
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="Email"
                    className="mt-2"
                />
                {errors.email && <span className="mt-1 text-xs text-red-500">{errors.email.message}</span>}
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        className="bg-background mt-2 pr-10"
                        placeholder="Password"
                        {...register('password')}
                    />

                    <Button
                        variant="link"
                        type="button"
                        className="absolute right-0 top-0 flex h-full items-center justify-center pr-3"
                        aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                        onClick={() => setShowPassword((show) => !show)}
                    >
                        {showPassword ? (
                            <EyeOff className="text-muted-foreground h-5 w-5" />
                        ) : (
                            <Eye className="text-muted-foreground h-5 w-5" />
                        )}
                    </Button>
                </div>
                {errors.password && <span className="mt-1 text-xs text-red-500">{errors.password.message}</span>}
            </div>
            <Button type="submit" disabled={isSubmitting} >
                {isSubmitting ? 'Loading...' : 'Login'}
            </Button>

        </form>
    )
}