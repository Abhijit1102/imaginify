'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type FormData = {
    username: string;
    email: string;
    password: string;
};

export default function SignUpForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<FormData>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/sign-up', data);
            toast({ title: 'Success', description: response.data.message });
            router.replace("/");
        } catch (error) {
            // Check if error response exists
            if (axios.isAxiosError(error) && error.response) {
                const message = error.response.data.message || 'There was a problem with your sign-up. Please try again.';
                toast({ title: 'Sign Up Failed', description: message, variant: 'destructive' });
            } else {
                toast({ title: 'Sign Up Failed', description: 'Unexpected error occurred. Please try again later.', variant: 'destructive' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-700">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-blue-600">
                        Join Imaginify
                    </h1>
                    <p className="mb-4 text-blue-700">
                        Sign up to start your Account
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-600">Username</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-700">Email</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-700">Password</FormLabel>
                                    <Input type="password" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full bg-blue-700 text-white hover:bg-blue-800' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Already a member?{' '}
                        <Link href="/sign-in" className="text-blue-700 hover:text-blue-800">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
