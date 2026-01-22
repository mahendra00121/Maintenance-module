"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, Lock, Mail } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate inputs here if needed
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-1/2 top-1/2 -ml-[300px] -mt-[300px] -z-10 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px]"></div>

            <div className="w-full max-w-md px-4">
                <div className="flex justify-center mb-8">
                    <Link className="flex items-center gap-2 font-bold text-2xl tracking-tighter" href="/">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Activity className="h-8 w-8 text-primary" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">PrintMaint AI</span>
                    </Link>
                </div>

                <Card className="border-border/50 shadow-xl backdrop-blur bg-background/80">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="email" placeholder="name@example.com" type="email" className="pl-9 bg-background/50" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="text-xs text-primary hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="password" type="password" className="pl-9 bg-background/50" required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full" size="lg">
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="text-center text-sm text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Start Free Trial
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
