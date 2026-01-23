"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
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
    // --- State Definitions ---
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

    const [machines, setMachines] = useState([
        { id: 1, name: "Heidelberg XL 75", department: "Press Room", model: "XL75-2022-001", status: "Active" },
        { id: 2, name: "Komori Lithrone", department: "Press Room", model: "KL40-2020-552", status: "Active" },
    ]);

    // --- Form States ---
    const [newDept, setNewDept] = useState({ name: "", description: "" });
    const [newType, setNewType] = useState({ name: "", description: "" });
    const [newMachine, setNewMachine] = useState({ name: "", department: "", model: "", status: "Active" });

    // --- Dialog Open States ---
    const [isDeptDialogOpen, setIsDeptDialogOpen] = useState(false);
    const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
    const [isMachineDialogOpen, setIsMachineDialogOpen] = useState(false);

    // --- Editing Tracking States ---
    const [editingDeptId, setEditingDeptId] = useState<number | null>(null);
    const [editingTypeId, setEditingTypeId] = useState<number | null>(null);
    const [editingMachineId, setEditingMachineId] = useState<number | null>(null);


    // --- Department Handlers ---
    const handleSaveDepartment = () => {
        if (!newDept.name) return;

        if (editingDeptId) {
            // Update existing
            setDepartments(departments.map(d => d.id === editingDeptId ? { ...d, ...newDept } : d));
        } else {
            // Create new
            setDepartments([...departments, { id: Date.now(), ...newDept }]);
        }

        // Reset
        setNewDept({ name: "", description: "" });
        setEditingDeptId(null);
        setIsDeptDialogOpen(false);
    };

    const handleEditDepartment = (dept: any) => {
        setNewDept({ name: dept.name, description: dept.description });
        setEditingDeptId(dept.id);
        setIsDeptDialogOpen(true);
    };

    const handleDeleteDepartment = (id: number) => {
        if (confirm("Are you sure you want to delete this department?")) {
            setDepartments(departments.filter(d => d.id !== id));
        }
    };


    // --- Machine Handlers ---
    const handleSaveMachine = () => {
        if (!newMachine.name || !newMachine.department) return;

        if (editingMachineId) {
            setMachines(machines.map(m => m.id === editingMachineId ? { ...m, ...newMachine } : m));
        } else {
            setMachines([...machines, { id: Date.now(), ...newMachine }]);
        }

        setNewMachine({ name: "", department: "", model: "", status: "Active" });
        setEditingMachineId(null);
        setIsMachineDialogOpen(false);
    };

    const handleEditMachine = (machine: any) => {
        setNewMachine({
            name: machine.name,
            department: machine.department,
            model: machine.model,
            status: machine.status
        });
        setEditingMachineId(machine.id);
        setIsMachineDialogOpen(true);
    };

    const handleDeleteMachine = (id: number) => {
        if (confirm("Are you sure you want to delete this machine?")) {
            setMachines(machines.filter(m => m.id !== id));
        }
    };


    // --- Breakdown Type Handlers ---
    const handleSaveType = () => {
        if (!newType.name) return;

        if (editingTypeId) {
            setBreakdownTypes(breakdownTypes.map(t => t.id === editingTypeId ? { ...t, ...newType } : t));
        } else {
            setBreakdownTypes([...breakdownTypes, { id: Date.now(), ...newType }]);
        }

        setNewType({ name: "", description: "" });
        setEditingTypeId(null);
        setIsTypeDialogOpen(false);
    };

    const handleEditType = (type: any) => {
        setNewType({ name: type.name, description: type.description });
        setEditingTypeId(type.id);
        setIsTypeDialogOpen(true);
    };

    const handleDeleteType = (id: number) => {
        if (confirm("Are you sure you want to delete this breakdown type?")) {
            setBreakdownTypes(breakdownTypes.filter(t => t.id !== id));
        }
    };


    // --- Reset handlers for Dialogs ---
    // Ensure that when opening via "Add" buttons, we clear any previous edit state
    const openAddDeptDialog = () => {
        setNewDept({ name: "", description: "" });
        setEditingDeptId(null);
        setIsDeptDialogOpen(true);
    };

    const openAddMachineDialog = () => {
        setNewMachine({ name: "", department: "", model: "", status: "Active" });
        setEditingMachineId(null);
        setIsMachineDialogOpen(true);
    };

    const openAddTypeDialog = () => {
        setNewType({ name: "", description: "" });
        setEditingTypeId(null);
        setIsTypeDialogOpen(true);
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
                <TabsList className="flex flex-col sm:grid w-full h-auto sm:grid-cols-3">
                    <TabsTrigger value="departments" className="gap-2 w-full">
                        <BoxSelect className="h-4 w-4" /> Departments
                    </TabsTrigger>
                    <TabsTrigger value="machines" className="gap-2 w-full">
                        <Database className="h-4 w-4" /> Machines
                    </TabsTrigger>
                    <TabsTrigger value="types" className="gap-2 w-full">
                        <Settings2 className="h-4 w-4" /> Breakdown Types
                    </TabsTrigger>
                </TabsList>

                {/* --- DEPARTMENTS TAB --- */}
                <TabsContent value="departments" className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search departments..." className="pl-8" />
                        </div>
                        <Button onClick={openAddDeptDialog}>
                            <Plus className="mr-2 h-4 w-4" /> Add Department
                        </Button>

                        <Dialog open={isDeptDialogOpen} onOpenChange={setIsDeptDialogOpen}>
                            {/* Hidden trigger managed by state/button controls */}
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingDeptId ? "Edit Department" : "Add New Department"}</DialogTitle>
                                    <DialogDescription>{editingDeptId ? "Update department details." : "Create a new department for the plant floor."}</DialogDescription>
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
                                    <Button onClick={handleSaveDepartment}>Save Department</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Card>
                        <div className="overflow-x-auto max-w-[85vw] md:max-w-full">
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
                                                <Button size="icon" variant="ghost" onClick={() => handleEditDepartment(dept)}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteDepartment(dept.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                {/* --- MACHINES TAB --- */}
                <TabsContent value="machines" className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search machines..." className="pl-8" />
                        </div>
                        <Button onClick={openAddMachineDialog}>
                            <Plus className="mr-2 h-4 w-4" /> Add Machine
                        </Button>

                        <Dialog open={isMachineDialogOpen} onOpenChange={setIsMachineDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingMachineId ? "Edit Machine" : "Add New Machine"}</DialogTitle>
                                    <DialogDescription>{editingMachineId ? "Update machine asset details." : "Register a new machine asset."}</DialogDescription>
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
                                    <Button onClick={handleSaveMachine}>Save Machine</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Card>
                        <div className="overflow-x-auto max-w-[85vw] md:max-w-full">
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
                                                <Button size="icon" variant="ghost" onClick={() => handleEditMachine(machine)}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteMachine(machine.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>

                {/* --- BREAKDOWN TYPES TAB --- */}
                <TabsContent value="types" className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search types..." className="pl-8" />
                        </div>
                        <Button onClick={openAddTypeDialog}>
                            <Plus className="mr-2 h-4 w-4" /> Add Breakdown Type
                        </Button>

                        <Dialog open={isTypeDialogOpen} onOpenChange={setIsTypeDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingTypeId ? "Edit Breakdown Type" : "Add Breakdown Type"}</DialogTitle>
                                    <DialogDescription>{editingTypeId ? "Update breakdown type definition." : "Categorize maintenance issues."}</DialogDescription>
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
                                    <Button onClick={handleSaveType}>Save Type</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Card>
                        <div className="overflow-x-auto max-w-[85vw] md:max-w-full">
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
                                                <Button size="icon" variant="ghost" onClick={() => handleEditType(type)}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteType(type.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
