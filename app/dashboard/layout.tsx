"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Activity,
    BarChart3,
    LayoutDashboard,
    Settings,
    Wrench,
    Menu,
    LogOut,
    Database,
    CalendarClock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Breakdown Maint.",
        href: "/dashboard/breakdown",
        icon: Wrench,
    },
    {
        title: "Preventive Maint.",
        href: "/dashboard/pm",
        icon: CalendarClock,
    },
    {
        title: "Master Data",
        href: "/dashboard/masters",
        icon: Database,
    },
    {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full bg-muted/10">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-background lg:flex sticky top-0 h-screen">
                <div className="flex h-16 items-center border-b px-6">
                    <Link className="flex items-center gap-2 font-bold text-xl tracking-tighter" href="/dashboard">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">PrintMaint</span>
                    </Link>
                </div>
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={`w-full justify-start items-center gap-3 mb-1 ${isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.title}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
                <div className="border-t p-4">
                    <div className="flex items-center gap-3 px-2 py-2 mb-2">
                        <Avatar className="h-9 w-9 border">
                            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Admin User</span>
                            <span className="text-xs text-muted-foreground">Tenant Admin</span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20" size="sm">
                        <LogOut className="h-4 w-4" />
                        Log Out
                    </Button>
                </div>
            </aside>

            <div className="flex flex-1 flex-col">
                {/* Mobile Header */}
                <header className="flex h-16 items-center gap-4 border-b bg-background px-6 lg:hidden sticky top-0 z-50">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-0">
                            <div className="flex h-16 items-center border-b px-6">
                                <Link className="flex items-center gap-2 font-bold text-xl" href="/dashboard">
                                    <Activity className="h-6 w-6 text-primary" />
                                    <span>PrintMaint</span>
                                </Link>
                            </div>
                            <nav className="flex flex-col gap-2 p-4">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span
                                                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                                                    }`}
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.title}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <span className="font-semibold lg:hidden">Dashboard</span>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
