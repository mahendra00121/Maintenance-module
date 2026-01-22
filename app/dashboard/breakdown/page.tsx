"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have this or standard textarea
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Bot, Wrench } from "lucide-react";

interface BreakdownTicket {
    id: string;
    date: string;
    dept: string;
    machine: string;
    status: "Stopped" | "Running" | "Pending" | "Open" | "Maintenance End" | "Closed";
    type: string;
    description: string;
    priority: string;
    reportedBy: string;
    startTime: string;
}

export default function BreakdownPage() {
    const [activeTab, setActiveTab] = useState("intimation");
    const [maintenanceFilter, setMaintenanceFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Analysis State
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [selectedTicketForAnalysis, setSelectedTicketForAnalysis] = useState<BreakdownTicket | null>(null);

    // Mock Data
    const [tickets, setTickets] = useState<BreakdownTicket[]>([
        { id: "MT001258", date: "06/05/25", dept: "Printing Department", machine: "RMGT-2", status: "Stopped", type: "Utility", description: "Machine Auto Stop", priority: "High", reportedBy: "Ramesh", startTime: "09:00 AM" },
        { id: "MT001257", date: "06/05/25", dept: "Printing Department", machine: "Komori-5", status: "Stopped", type: "Electrical", description: "Short Circuit", priority: "High", reportedBy: "Uday", startTime: "10:15 AM" },
        { id: "MT001256", date: "05/05/25", dept: "Cutting Department", machine: "Polar-115", status: "Pending", type: "Mechanical", description: "Blade dullness detected", priority: "Medium", reportedBy: "Suresh", startTime: "08:30 AM" },
        { id: "MT001255", date: "04/05/25", dept: "Printing Department", machine: "Heidelberg XL", status: "Open", type: "Electrical", description: "Sensor failure on Feeder", priority: "Low", reportedBy: "Raj", startTime: "02:00 PM" },
    ]);

    const [newTicket, setNewTicket] = useState({
        dept: "",
        machine: "",
        description: "",
        machineStatus: "",
        type: "",
        priority: "",
    });

    const handleCreateTicket = () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }); // DD/MM/YY
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const ticket: BreakdownTicket = {
            id: "MT" + Math.random().toString().substr(2, 6),
            date: dateStr,
            dept: newTicket.dept === "printing" ? "Printing Department" : "Cutting Department", // Simple mapping
            machine: newTicket.machine === "rmgt" ? "RMGT-2" : newTicket.machine === "komori" ? "Komori-5" : newTicket.machine,
            status: newTicket.machineStatus === "stopped" ? "Stopped" : "Running",
            type: newTicket.type.charAt(0).toUpperCase() + newTicket.type.slice(1),
            description: newTicket.description,
            priority: newTicket.priority.charAt(0).toUpperCase() + newTicket.priority.slice(1),
            reportedBy: "CurrentUser", // Mock user
            startTime: timeStr
        };

        setTickets([ticket, ...tickets]);
        setIsCreateOpen(false);
        setNewTicket({ dept: "", machine: "", description: "", machineStatus: "", type: "", priority: "" });
    };

    const handleAnalyze = (ticket: BreakdownTicket) => {
        setSelectedTicketForAnalysis(ticket);
        setIsAnalysisOpen(true);
        setIsAnalyzing(true);
        setAnalysisResult(null);

        // Simulate AI Analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysisResult(`**Root Cause Analysis for ${ticket.id}:**\n\nBased on the reported issue "${ticket.description}" on ${ticket.machine}, the likely cause is a **${ticket.type} malfunction**.\n\n**Recommendations:**\n1. Inspect the main power unit.\n2. Check for loose connections.\n3. Verify sensor data logs.`);
        }, 2000);
    };

    // Filter Logic
    const filteredIntimationTickets = tickets.filter(t =>
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.machine.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredMaintenanceTickets = tickets.filter(t => {
        if (maintenanceFilter === "all") return true;
        if (maintenanceFilter === "pending") return t.status === "Pending";
        if (maintenanceFilter === "open") return t.status === "Open";
        if (maintenanceFilter === "end") return t.status === "Maintenance End";
        if (maintenanceFilter === "closed") return t.status === "Closed";
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Breakdown Module</h2>
                    <p className="text-muted-foreground">
                        Manage breakdown operations: from Intimation to Maintenance closure.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="intimation" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="flex flex-col sm:grid w-full sm:grid-cols-2 h-auto sm:max-w-[400px]">
                    <TabsTrigger value="intimation" className="w-full">Breakdown Intimation</TabsTrigger>
                    <TabsTrigger value="maintenance" className="w-full">Breakdown Maintenance</TabsTrigger>
                </TabsList>

                {/* --- 1. BREAKDOWN INTIMATION TAB --- */}
                <TabsContent value="intimation" className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search ticket no, machine..."
                                className="pl-8 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
                                    <Plus className="mr-2 h-4 w-4" /> Create
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px]">
                                <DialogHeader>
                                    <DialogTitle>Breakdown Intimation</DialogTitle>
                                    <DialogDescription>
                                        Create a new maintenance ticket.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                    {/* Column 1 */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Maintenance Ticket No.</Label>
                                            <Input value="Autogenerated" disabled className="bg-muted" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Department</Label>
                                            <Select value={newTicket.dept} onValueChange={(val) => setNewTicket({ ...newTicket, dept: val })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="printing">Printing Department</SelectItem>
                                                    <SelectItem value="cutting">Cutting Department</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Breakdown Description</Label>
                                            <Textarea
                                                className="min-h-[100px]"
                                                placeholder="Describe the issue..."
                                                value={newTicket.description}
                                                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Column 2 */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Date</Label>
                                            <Input value={new Date().toLocaleDateString()} disabled className="bg-muted" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Machine</Label>
                                            <Select value={newTicket.machine} onValueChange={(val) => setNewTicket({ ...newTicket, machine: val })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Machine" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="rmgt">RMGT-2</SelectItem>
                                                    <SelectItem value="komori">Komori-5</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Machine Status</Label>
                                                <Select value={newTicket.machineStatus} onValueChange={(val) => setNewTicket({ ...newTicket, machineStatus: val })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="stopped">Stopped</SelectItem>
                                                        <SelectItem value="running">Running</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Breakdown Type</Label>
                                                <Select value={newTicket.type} onValueChange={(val) => setNewTicket({ ...newTicket, type: val })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="electrical">Electrical</SelectItem>
                                                        <SelectItem value="mechanical">Mechanical</SelectItem>
                                                        <SelectItem value="utility">Utility</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Priority</Label>
                                            <Select value={newTicket.priority} onValueChange={(val) => setNewTicket({ ...newTicket, priority: val })}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="high">High</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="low">Low</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Breakdown Start Time</Label>
                                            <Input value="Autogenerated" disabled className="bg-muted" />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleCreateTicket} className="w-full sm:w-auto bg-blue-600">Save</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-blue-50/50">
                                    <TableRow>
                                        <TableHead>Ticket No.</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Machine</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Reported By</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredIntimationTickets.map(ticket => (
                                        <TableRow key={ticket.id}>
                                            <TableCell className="font-medium text-blue-600">{ticket.id}</TableCell>
                                            <TableCell>{ticket.date}</TableCell>
                                            <TableCell>{ticket.dept}</TableCell>
                                            <TableCell>{ticket.machine}</TableCell>
                                            <TableCell>{ticket.status}</TableCell>
                                            <TableCell>{ticket.type}</TableCell>
                                            <TableCell>{ticket.description}</TableCell>
                                            <TableCell>{ticket.reportedBy}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                {/* --- 2. BREAKDOWN MAINTENANCE TAB --- */}
                <TabsContent value="maintenance" className="space-y-4">
                    {/* Status Filters */}
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 bg-card rounded-lg border shadow-sm">
                        <span className="font-semibold text-sm mb-2 md:mb-0">Filter Status:</span>
                        <RadioGroup defaultValue="all" value={maintenanceFilter} onValueChange={setMaintenanceFilter} className="flex flex-wrap items-center gap-4 md:gap-6">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="r1" />
                                <Label htmlFor="r1">All</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pending" id="r2" />
                                <Label htmlFor="r2">Pending</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="open" id="r3" />
                                <Label htmlFor="r3">Open</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="end" id="r4" />
                                <Label htmlFor="r4">Maintenance End</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="closed" id="r5" />
                                <Label htmlFor="r5">Ticket Closed</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Card>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-blue-50/50">
                                    <TableRow>
                                        <TableHead>Ticket No.</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Machine</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Reported By</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMaintenanceTickets.map(ticket => (
                                        <TableRow key={ticket.id}>
                                            <TableCell className="font-medium text-blue-600">{ticket.id}</TableCell>
                                            <TableCell>{ticket.date}</TableCell>
                                            <TableCell>{ticket.dept}</TableCell>
                                            <TableCell>{ticket.machine}</TableCell>
                                            <TableCell>
                                                <Badge variant={ticket.status === "Pending" ? "outline" : "secondary"} className={ticket.status === "Pending" ? "border-amber-500 text-amber-500" : ""}>
                                                    {ticket.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{ticket.type}</TableCell>
                                            <TableCell>{ticket.description}</TableCell>
                                            <TableCell>{ticket.reportedBy}</TableCell>
                                            <TableCell>
                                                <Button size="sm" variant="outline" className="h-8">
                                                    <Wrench className="h-3 w-3 mr-1" /> Process
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="ml-2 text-purple-600 border-purple-200 h-8 hover:bg-purple-50"
                                                    onClick={() => handleAnalyze(ticket)}
                                                >
                                                    <Bot className="h-3 w-3 mr-1" /> Analyze
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>

                    {/* Analysis Dialog */}
                    <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5 text-purple-600" />
                                    AI Root Cause Analysis
                                </DialogTitle>
                                <DialogDescription>
                                    Analyzing breakdown using historical data and error codes.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                {isAnalyzing ? (
                                    <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
                                        <p className="text-sm text-muted-foreground animate-pulse">Consulting Gemini knowledge base...</p>
                                    </div>
                                ) : (
                                    <div className="prose prose-sm max-w-none p-4 bg-purple-50 rounded-lg border border-purple-100 text-slate-700 whitespace-pre-line">
                                        {analysisResult}
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button onClick={() => setIsAnalysisOpen(false)}>Close</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </TabsContent>

            </Tabs>
        </div>
    );
}
