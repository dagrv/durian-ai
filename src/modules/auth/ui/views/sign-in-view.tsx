"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "A Password is required" })
})

export const SignInView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending]= useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);
 
        authClient.signIn.email({
                email: data.email,
                password: data.password
            },{
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                },
                onError: ({error}) => {
                    setError(error.message)
                }
            }
        );

        
    }
    
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-semibold">Welcome back !</h1>
                                    <p className="text-muted-foreground text-balance">Login to your account</p>
                                </div>

                                <div className="grid gap-3">
                                    <FormField control={form.control} name="email"
                                    render={({field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input className="font-medium" type="email" placeholder="email@example.com" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <div className="grid gap-3">
                                    <FormField control={form.control} name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input className="font-medium" type="password" placeholder="*********************" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                </div>

                                {!!error && (
                                    <Alert className="bg-linear-to-br from-red-900 to-red-950 text-white ">
                                        <OctagonAlertIcon className="h-8 w-8" />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}

                                <Button disabled={pending} type="submit" className="shadow-xl cursor-pointer w-full border-dashed bg-linear-to-br from-green-700 to-green-800">
                                    Login
                                </Button>

                                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0
                                after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 px-3">Or continue with</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button disabled={pending} variant="outline" type="button" className="shadow-sm w-full font-semibold">
                                        Google
                                    </Button>
                                    <Button disabled={pending} variant="outline" type="button" className="shadow-sm w-full font-semibold">
                                        GitHub
                                    </Button>
                                    {/* <Button variant="outline" type="button" className="w-full font-semibold">
                                        Apple
                                    </Button>
                                    <Button variant="outline" type="button" className="w-full font-semibold">
                                        Microsoft
                                    </Button> */}
                                </div>

                                <div className="text-center text-sm">
                                    Don't have an account ? <Link className="font-semibold text-green-700" href="/sign-up">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-800 to-green-950 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src="/logo2.svg" alt="Logo" className="h-[90px] w-[90px]" />
                        <p className="text-3xl font-semibold text-white">Durian AI</p>
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs
            text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="">Terms of Services</a> and <a href="#">Privacy Policy</a>
            </div>
        </div>
    );
}
