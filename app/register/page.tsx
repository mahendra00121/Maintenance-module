import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Building2, User, Mail, Lock, CreditCard } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 relative overflow-hidden py-10">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]"></div>
            <div className="absolute left-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]"></div>

            <div className="w-full max-w-lg px-4">
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
                        <CardTitle className="text-2xl font-bold">Start your free trial</CardTitle>
                        <CardDescription>
                            Create a new tenant workspace for your printing plant
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="company">Company Name</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="company" placeholder="Acme Prints" className="pl-9 bg-background/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="owner">Owner Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="owner" placeholder="John Doe" className="pl-9 bg-background/50" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Work Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="email" placeholder="name@company.com" type="email" className="pl-9 bg-background/50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="password" type="password" className="pl-9 bg-background/50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="plan">Select Plan</Label>
                            <Select defaultValue="professional">
                                <SelectTrigger className="bg-background/50 pl-9 relative">
                                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="starter">Starter (Up to 5 Machines)</SelectItem>
                                    <SelectItem value="professional">Professional (Up to 20 Machines)</SelectItem>
                                    <SelectItem value="enterprise">Enterprise (Unlimited)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" size="lg">
                            Create Account
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Sign In
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
