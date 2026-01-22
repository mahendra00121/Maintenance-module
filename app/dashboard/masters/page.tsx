"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Plus, Search, Edit2, Trash2, Database, Settings2, BoxSelect } from "lucide-react";

export default function MasterDataPage() {
    const [departments, setDepartments] = useState([
        { id: 1, name: "Press Room", description: "Main offset printing area" },
        { id: 2, name: "Binding", description: "Post-press binding operations" },
        { id: 3, name: "Packaging", description: "Final packaging and dispatch" },
    ]);

    const [breakdownTypes, setBreakdownTypes] = useState([
        { id: 1, name: "Electrical", description: "Motor, wiring, and sensor issues" },
        { id: 2, name: "Mechanical", description: "Gears, rollers, and physical damage" },
        { id: 3, name: "Software", description: "HMI and controller errors" },
    ]);

    const [newDept, setNewDept] = useState({ name: "", description: "" });
    const [newType, setNewType] = useState({ name: "", description: "" });
    const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false);
    const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);

    const [machines, setMachines] = useState([
        { id: 1, name: "Heidelberg XL 75", department: "Press Room", model: "XL75-2022-001", status: "Active" },
        { id: 2, name: "Komori Lithrone", department: "Press Room", model: "KL40-2020-552", status: "Active" },
    ]);

    const [newMachine, setNewMachine] = useState({ name: "", department: "", model: "", status: "Active" });
    const [isMachineDialogOpen, setIsMachineDialogOpen] = useState(false);

    const addMachine = () => {
        if (newMachine.name && newMachine.department) {
            setMachines([...machines, { id: Date.now(), ...newMachine }]);
            setNewMachine({ name: "", department: "", model: "", status: "Active" });
            setIsMachineDialogOpen(false);
        }
    };

    const addDepartment = () => {
        if (newDept.name) {
            setDepartments([...departments, { id: Date.now(), ...newDept }]);
            setNewDept({ name: "", description: "" });
            setIsDeptDialogOpen(false);
        }
    };

    const addBreakdownType = () => {
        if (newType.name) {
            setBreakdownTypes([...breakdownTypes, { id: Date.now(), ...newType }]);
            setNewType({ name: "", description: "" });
            setIsTypeDialogOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Master Data Management</h2>
                    <p className="text-muted-foreground">
                        Configure system-wide settings, machines, and departments.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="departments" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="departments" className="gap-2">
                        <BoxSelect className="h-4 w-4" /> Departments
                    </TabsTrigger>
                    <TabsTrigger value="machines" className="gap-2">
                        <Database className="h-4 w-4" /> Machines
                    </TabsTrigger>
                    <TabsTrigger value="types" className="gap-2">
                        <Settings2 className="h-4 w-4" /> Breakdown Types
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="departments" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search departments..." className="pl-8" />
                        </div>
                        <Dialog open={isDeptDialogOpen} onOpenChange={setIsDeptDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Add Department
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Department</DialogTitle>
                                    <DialogDescription>Create a new department for the plant floor.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Department Name</Label>
                                        <Input value={newDept.name} onChange={(e) => setNewDept({ ...newDept, name: e.target.value })} placeholder="e.g. Press Room" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Input value={newDept.description} onChange={(e) => setNewDept({ ...newDept, description: e.target.value })} placeholder="Brief details..." />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={addDepartment}>Save Department</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {departments.map((dept) => (
                                    <TableRow key={dept.id}>
                                        <TableCell className="font-medium">{dept.name}</TableCell>
                                        <TableCell>{dept.description}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="icon" variant="ghost"><Edit2 className="h-4 w-4" /></Button>
                                            <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="machines" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search machines..." className="pl-8" />
                        </div>
                        <Dialog open={isMachineDialogOpen} onOpenChange={setIsMachineDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Add Machine
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Machine</DialogTitle>
                                    <DialogDescription>Register a new machine asset.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Machine Name</Label>
                                        <Input value={newMachine.name} onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })} placeholder="e.g. Heidelberg XL 75" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Model / Serial No.</Label>
                                        <Input value={newMachine.model} onChange={(e) => setNewMachine({ ...newMachine, model: e.target.value })} placeholder="e.g. XL75-2022-001" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Department</Label>
                                        <select
                                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={newMachine.department}
                                            onChange={(e) => setNewMachine({ ...newMachine, department: e.target.value })}
                                        >
                                            <option value="" disabled>Select Department</option>
                                            {departments.map(dept => (
                                                <option key={dept.id} value={dept.name}>{dept.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={addMachine}>Save Machine</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Machine Name</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Model / Serial</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {machines.map((machine) => (
                                    <TableRow key={machine.id}>
                                        <TableCell className="font-medium">{machine.name}</TableCell>
                                        <TableCell>{machine.department}</TableCell>
                                        <TableCell>{machine.model}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {machine.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="icon" variant="ghost"><Edit2 className="h-4 w-4" /></Button>
                                            <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="types" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="relative w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search types..." className="pl-8" />
                        </div>
                        <Dialog open={isTypeDialogOpen} onOpenChange={setIsTypeDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> Add Breakdown Type
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Breakdown Type</DialogTitle>
                                    <DialogDescription>Categorize maintenance issues.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Type Name</Label>
                                        <Input value={newType.name} onChange={(e) => setNewType({ ...newType, name: e.target.value })} placeholder="e.g. Hydraulic" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Input value={newType.description} onChange={(e) => setNewType({ ...newType, description: e.target.value })} placeholder="Brief detail..." />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={addBreakdownType}>Save Type</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {breakdownTypes.map((type) => (
                                    <TableRow key={type.id}>
                                        <TableCell className="font-medium">{type.name}</TableCell>
                                        <TableCell>{type.description}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="icon" variant="ghost"><Edit2 className="h-4 w-4" /></Button>
                                            <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
