
"use client";
// Force git status update

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, RefreshCw } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

interface PMSchedule {
    id: string;
    machine: string;
    date: string; // YYYY-MM-DD
    type: string;
    status: "scheduled" | "completed" | "delayed";
}

export default function PMPage() {
    const [activeTab, setActiveTab] = useState("schedule");
    const [maintenanceFilter, setMaintenanceFilter] = useState("all");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Dynamic State for Schedules
    const [schedules, setSchedules] = useState<PMSchedule[]>([
        { id: "1", machine: "Komori-5", date: "2025-01-08", type: "Regular", status: "scheduled" },
        { id: "2", machine: "RMGT-2", date: "2025-01-15", type: "Oil Change", status: "scheduled" },
        { id: "3", machine: "Cutter-1", date: "2025-01-22", type: "Inspection", status: "scheduled" },
    ]);

    const [newSchedule, setNewSchedule] = useState({
        machine: "",
        date: "",
        type: "Regular"
    });

    const handleCreateSchedule = () => {
        if (!newSchedule.machine || !newSchedule.date) return;

        const newEntry: PMSchedule = {
            id: Math.random().toString(36).substr(2, 9),
            machine: newSchedule.machine,
            date: newSchedule.date,
            type: newSchedule.type,
            status: "scheduled"
        };

        setSchedules([...schedules, newEntry]);
        setIsCreateOpen(false);
        setNewSchedule({ machine: "", date: "", type: "Regular" });
    };

    // Helper to find schedule for a specific day in JAN 2025
    const getScheduleForDay = (day: number) => {
        // Construct date string for Jan 2025
        const dateStr = `2025-01-${day.toString().padStart(2, '0')}`;
        return schedules.filter(s => s.date === dateStr);
    };

    // Mock data for tickets
    const pmTickets = [
        {
            id: "PMT001258",
            date: "06/05/25",
            dept: "Printing Department",
            machine: "RMGT-2",
            type: "Regular",
            scheduled: "06/05/25 09:00",
            actualStart: "",
            scheduledEnd: "06/05/25 13:00",
            actualEnd: "",
            status: "Pending"
        },
        {
            id: "PMT00352",
            date: "08/05/25",
            dept: "Printing Department",
            machine: "Komori-5",
            type: "Overhaul",
            scheduled: "18/05/25 08:00",
            actualStart: "",
            scheduledEnd: "21/05/25 16:00",
            actualEnd: "",
            status: "Pending"
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Preventive Maintenance</h2>
                    <p className="text-muted-foreground">
                        Manage PM schedules, tickets, and execution.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="flex flex-col sm:grid w-full sm:grid-cols-3 h-auto sm:max-w-[600px]">
                    <TabsTrigger value="schedule" className="w-full">PM Schedule</TabsTrigger>
                    <TabsTrigger value="ticket" className="w-full">PM Ticket</TabsTrigger>
                    <TabsTrigger value="maintenance" className="w-full">PM Maintenance</TabsTrigger>
                </TabsList>

                {/* --- 1. PM SCHEDULE TAB --- */}
                <TabsContent value="schedule" className="space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <CardTitle>Preventive Maintenance Schedule</CardTitle>
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full md:w-auto">
                                        <Select>
                                            <SelectTrigger className="w-full md:w-[150px]">
                                                <SelectValue placeholder="Dept" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="press">Printing</SelectItem>
                                                <SelectItem value="binding">Binding</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select>
                                            <SelectTrigger className="w-full md:w-[150px]">
                                                <SelectValue placeholder="Machine" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="m1">RMGT-2</SelectItem>
                                                <SelectItem value="m2">Komori-5</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select defaultValue="jan">
                                            <SelectTrigger className="w-full md:w-[120px]">
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="jan">January</SelectItem>
                                                <SelectItem value="feb">February</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-2">
                                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-blue-900 hover:bg-blue-800"><Plus className="mr-2 h-4 w-4" /> Create</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Create PM Schedule</DialogTitle>
                                            <DialogDescription>Add a new preventive maintenance slot.</DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-1 gap-2">
                                                <Label>Machine</Label>
                                                <Select
                                                    value={newSchedule.machine}
                                                    onValueChange={(val) => setNewSchedule({ ...newSchedule, machine: val })}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Machine" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Komori-5">Komori-5</SelectItem>
                                                        <SelectItem value="RMGT-2">RMGT-2</SelectItem>
                                                        <SelectItem value="Cutter-1">Cutter-1</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                <Label>Type</Label>
                                                <Select
                                                    value={newSchedule.type}
                                                    onValueChange={(val) => setNewSchedule({ ...newSchedule, type: val })}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Regular">Regular Service</SelectItem>
                                                        <SelectItem value="Oil Change">Oil Change</SelectItem>
                                                        <SelectItem value="Overhaul">Overhaul</SelectItem>
                                                        <SelectItem value="Inspection">Inspection</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2">
                                                <Label>Date</Label>
                                                <Input
                                                    type="date"
                                                    className="w-full"
                                                    value={newSchedule.date}
                                                    onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={() => setIsCreateOpen(false)} variant="outline">Cancel</Button>
                                            <Button onClick={handleCreateSchedule} className="bg-blue-900">Save Schedule</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="outline" className="text-blue-900 border-blue-900 hover:bg-blue-50">
                                    <RefreshCw className="mr-2 h-4 w-4" /> Reschedule
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Calendar Grid Simulation */}
                            <div className="overflow-x-auto">
                                <div className="border rounded-md min-w-[600px] overflow-hidden bg-white">
                                    <div className="grid grid-cols-7 bg-blue-100 divide-x text-center font-semibold text-sm py-2 text-blue-900">
                                        <div>Monday</div>
                                        <div>Tuesday</div>
                                        <div>Wednesday</div>
                                        <div>Thursday</div>
                                        <div>Friday</div>
                                        <div>Saturday</div>
                                        <div>Sunday</div>
                                    </div>
                                    <div className="grid grid-cols-7 divide-x divide-y auto-rows-[minmax(100px,auto)]">
                                        {/* Empty cells for dates before Jan 1st (Jan 1 is Wednesday) */}
                                        <div className="p-2 bg-slate-50"></div>
                                        <div className="p-2 bg-slate-50"></div>

                                        {/* Days 1-31 */}
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                                            const daySchedules = getScheduleForDay(day);
                                            return (
                                                <div key={day} className="p-2 relative hover:bg-slate-50 transition-colors h-24">
                                                    <span className="absolute top-2 right-2 text-sm text-slate-400 font-medium">{day}</span>
                                                    <div className="mt-6 flex flex-col gap-1">
                                                        {daySchedules.map((s) => (
                                                            <div key={s.id} className="bg-blue-100 text-blue-800 text-[10px] p-1 rounded border border-blue-200 truncate cursor-pointer hover:bg-blue-200" title={`${s.machine} - ${s.type}`}>
                                                                {s.machine}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Remaining empty cells to fill the grid (if needed, simplified here) */}
                                        <div className="p-2 bg-slate-50"></div>
                                        <div className="p-2 bg-slate-50"></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- 2. PM TICKET TAB --- */}
                <TabsContent value="ticket" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preventive Maintenance Ticket</CardTitle>
                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <Label className="min-w-fit">From</Label>
                                    <Input type="date" className="w-full md:w-[150px]" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label className="min-w-fit">To</Label>
                                    <Input type="date" className="w-full md:w-[150px]" />
                                </div>
                                <div className="relative w-full md:w-72 md:ml-auto">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search..." className="pl-8" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-blue-50/50">
                                        <TableRow>
                                            <TableHead>PM Ticket No.</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Machine</TableHead>
                                            <TableHead>PM Type</TableHead>
                                            <TableHead>Scheduled Date & Time</TableHead>
                                            <TableHead>Actual Start Date & Time</TableHead>
                                            <TableHead>Schedule End Date & Time</TableHead>
                                            <TableHead>Actual End Date & Time</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pmTickets.map(ticket => (
                                            <TableRow key={ticket.id}>
                                                <TableCell className="font-medium">{ticket.id}</TableCell>
                                                <TableCell>{ticket.date}</TableCell>
                                                <TableCell>{ticket.dept}</TableCell>
                                                <TableCell>{ticket.machine}</TableCell>
                                                <TableCell>{ticket.type}</TableCell>
                                                <TableCell>{ticket.scheduled}</TableCell>
                                                <TableCell>{ticket.actualStart}</TableCell>
                                                <TableCell>{ticket.scheduledEnd}</TableCell>
                                                <TableCell>{ticket.actualEnd}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- 3. PM MAINTENANCE TAB --- */}
                <TabsContent value="maintenance" className="space-y-4">
                    {/* Status Filters */}
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 bg-card rounded-lg border shadow-sm">
                        <span className="font-semibold text-sm mb-2 md:mb-0">Filter Status:</span>
                        <RadioGroup defaultValue="all" value={maintenanceFilter} onValueChange={setMaintenanceFilter} className="flex flex-wrap items-center gap-4 md:gap-6">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="pm_r1" />
                                <Label htmlFor="pm_r1">All</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pending" id="pm_r2" />
                                <Label htmlFor="pm_r2">Pending</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="open" id="pm_r3" />
                                <Label htmlFor="pm_r3">Open</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="complete" id="pm_r4" />
                                <Label htmlFor="pm_r4">Complete</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="closed" id="pm_r5" />
                                <Label htmlFor="pm_r5">Ticket Closed</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-blue-50/50">
                                        <TableRow>
                                            <TableHead>PM Ticket No.</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Machine</TableHead>
                                            <TableHead>PM Type</TableHead>
                                            <TableHead>Scheduled Date & Time</TableHead>
                                            <TableHead>Actual Start Date & Time</TableHead>
                                            <TableHead>Schedule End Date & Time</TableHead>
                                            <TableHead>Actual End Date & Time</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pmTickets.map(ticket => (
                                            <TableRow key={ticket.id}>
                                                <TableCell className="font-medium">{ticket.id}</TableCell>
                                                <TableCell>{ticket.date}</TableCell>
                                                <TableCell>{ticket.dept}</TableCell>
                                                <TableCell>{ticket.machine}</TableCell>
                                                <TableCell>{ticket.type}</TableCell>
                                                <TableCell>{ticket.scheduled}</TableCell>
                                                <TableCell>{ticket.actualStart}</TableCell>
                                                <TableCell>{ticket.scheduledEnd}</TableCell>
                                                <TableCell>{ticket.actualEnd}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
