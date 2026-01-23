"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend
} from 'recharts';

const monthlyData = [
    { name: 'Jan', downtime: 45, maintenance: 20 },
    { name: 'Feb', downtime: 30, maintenance: 25 },
    { name: 'Mar', downtime: 55, maintenance: 35 },
    { name: 'Apr', downtime: 20, maintenance: 20 },
    { name: 'May', downtime: 40, maintenance: 30 },
    { name: 'Jun', downtime: 25, maintenance: 25 },
];

const machinePerformance = [
    { name: 'RMGT-2', efficiency: 85 },
    { name: 'Komori-5', efficiency: 92 },
    { name: 'Heidelberg', efficiency: 78 },
    { name: 'Cutter-1', efficiency: 95 },
    { name: 'Binder-2', efficiency: 88 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
                <p className="text-muted-foreground">
                    Deep dive into maintenance KPIs and machine performance.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Downtime vs Maintenance Hours</CardTitle>
                        <CardDescription>Monthly comparison of unplanned downtime vs scheduled maintenance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="downtime" name="Downtime (Hrs)" fill="#f87171" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="maintenance" name="Planned Maint. (Hrs)" fill="#34d399" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Machine Efficiency Index</CardTitle>
                        <CardDescription>Current operational efficiency per machine.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={machinePerformance} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                    <XAxis type="number" domain={[0, 100]} hide />
                                    <YAxis dataKey="name" type="category" width={100} fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                                    <Bar dataKey="efficiency" name="Efficiency (%)" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
