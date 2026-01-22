import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Calendar, Database, ShieldCheck, Activity, BarChart3, ChevronRight, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 font-bold text-xl tracking-tighter" href="#">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">PrintMaint AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors flex items-center" href="/login">
            Login
          </Link>
          <Link href="/register">
            <Button size="sm" className="hidden sm:flex">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
          
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                  Next-Gen Maintenance System
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                   Smart Maintenance for the <span className="text-primary">Printing Industry</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                  Streamline specific breakdown and preventive maintenance workflows with Gemini AI-powered insights. Minimize downtime, maximize productivity.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                    Employee Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Intelligent Features</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Built specifically for high-performance printing plants. Manage everything from technician allocation to spare parts inventory.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card/50 backdrop-blur border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <Bot className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>AI-Powered Analysis</CardTitle>
                  <CardDescription>
                    Leverage Gemini AI to analyze breakdown root causes and suggest immediate fixes based on historical data.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Preventive Scheduling</CardTitle>
                  <CardDescription>
                    Automated PM ticket generation ensuring your machines are always serviced on time, preventing costly downtime.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card/50 backdrop-blur border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <Database className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Master Data Control</CardTitle>
                  <CardDescription>
                    Comprehensive management of machines, departments, and spare parts inventory in one centralized system.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
               <div className="space-y-6">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose PrintMaint AI?</h2>
                 <p className="text-muted-foreground text-lg">
                   We understand the unique challenges of the printing industry. Our platform is designed to handle the complexity of modern printing machinery.
                 </p>
                 <ul className="grid gap-4">
                   {[
                     "Reduce Machine Downtime by 40%",
                     "Real-time Technician Tracking",
                     "Seamless Spare Parts Management",
                     "Multi-tenant Architecture for Plant Chains"
                   ].map((benefit, index) => (
                     <li key={index} className="flex items-center gap-3">
                       <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                         <Check className="h-4 w-4" />
                       </div>
                       <span className="font-medium">{benefit}</span>
                     </li>
                   ))}
                 </ul>
                 <Button variant="outline" className="mt-4">
                   View Documentation <ChevronRight className="ml-2 h-4 w-4" />
                 </Button>
               </div>
               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                 <div className="relative rounded-xl border bg-card p-2 shadow-2xl">
                    {/* Mock Dashboard Preview */}
                    <div className="rounded-lg bg-muted/50 aspect-video flex items-center justify-center border border-dashed border-muted-foreground/20">
                      <div className="text-center space-y-2">
                        <BarChart3 className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                        <p className="text-sm text-muted-foreground">Interactive Dashboard Preview</p>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-muted/20">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 PrintMaint AI. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
