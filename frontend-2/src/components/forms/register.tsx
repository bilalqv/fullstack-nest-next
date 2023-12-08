'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

export const ZSignUpFormSchema = z.object({
    firstName: z.string().trim().min(1, { message: 'Please enter a valid first name.' }),
    lastName: z.string().trim().min(1, { message: 'Please enter a valid last name.' }),
    email: z.string().email().min(1),
    password: z
        .string()
        .min(6, { message: 'Password should contain at least 6 characters' })
        .max(72, { message: 'Password should not contain more than 72 characters' }),
});

type TSignUpFormSchema = z.infer<typeof ZSignUpFormSchema>;

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<TSignUpFormSchema>({
        resolver: zodResolver(ZSignUpFormSchema),
    });

    const router = useRouter();

    async function onFormSubmit({ firstName, lastName, email, password }: TSignUpFormSchema) {
        try {
            const res = await fetch('http://localhost:3003/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
            })
            router.push('/login');
        } catch (err) {

            console.log(err);
            toast({
                title: 'Something went wrong.',
                description: "Unable to create your account.",
                variant: 'destructive'
            })
        }
        finally {
        }
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex w-full flex-col gap-y-4" >

            <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input className="mt-2" id="firstName" type="text" placeholder="First Name" {...register('firstName')} />
                {errors.firstName && <span className="mt-1 text-xs text-red-500">{errors.firstName.message}</span>}
            </div>

            <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input className="mt-2" id="lastName" type="text" placeholder="Last Name" {...register('lastName')} />
                {errors.lastName && <span className="mt-1 text-xs text-red-500">{errors.lastName.message}</span>}
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input className="mt-2" id="email" type="email" placeholder="Email" {...register('email')} />
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
                {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
        </form>
    )
}