"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Imports removed to prevent build errors
// Inline components used instead
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Users,
    ArrowUpRight,
    TrendingDown,
    LineChart as LineChartIcon,
    BarChart3 as BarChartIcon,
    PieChart as PieChartIcon,
    MoreVertical
} from "lucide-react";

// Inline Chart Components to avoid multiple file complexities for now, 
// normally would be in @/components/dashboard/...
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    Bar
} from 'recharts';

const dataTrend = [
    { name: 'Mon', breakdowns: 4, pm: 2 },
    { name: 'Tue', breakdowns: 3, pm: 1 },
    { name: 'Wed', breakdowns: 7, pm: 3 },
    { name: 'Thu', breakdowns: 2, pm: 4 },
    { name: 'Fri', breakdowns: 5, pm: 2 },
    { name: 'Sat', breakdowns: 8, pm: 5 },
    { name: 'Sun', breakdowns: 1, pm: 0 },
];

const dataStatus = [
    { name: 'Open', value: 5, color: '#f87171' }, // Red-400
    { name: 'In Progress', value: 3, color: '#fbbf24' }, // Amber-400
    { name: 'Closed', value: 12, color: '#34d399' }, // Emerald-400
    { name: 'Pending', value: 2, color: '#94a3b8' }, // Slate-400
];

const COLORS = ['#f87171', '#fbbf24', '#34d399', '#94a3b8'];
const TREND_COLORS = ['#8884d8', '#82ca9d'];

export default function DashboardPage() {
    const [trendChartType, setTrendChartType] = useState<'line' | 'bar' | 'pie'>('line');
    const [statusChartType, setStatusChartType] = useState<'pie' | 'bar'>('pie');

    // Aggregate data for Pie Chart view of Trend
    const trendPieData = [
        { name: 'Total Breakdowns', value: dataTrend.reduce((acc, curr) => acc + curr.breakdowns, 0) },
        { name: 'Total PM', value: dataTrend.reduce((acc, curr) => acc + curr.pm, 0) }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">
                        Overview of your plant's maintenance performance.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Placeholder for Date Range Picker */}
                    <Button variant="outline" className="hidden md:flex">Jan 20, 2024 - Jan 22, 2024</Button>
                    <Button>Download Report</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Breakdowns</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-red-500 flex items-center mr-1">
                                <ArrowUpRight className="h-3 w-3" /> +12%
                            </span>
                            from last week
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                        <Clock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-emerald-500 flex items-center mr-1">
                                <TrendingDown className="h-3 w-3" /> -2
                            </span>
                            from yesterday
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">PM Schedules Due</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Next due in 2 hours
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unallocated Tickets</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Requires immediate attention
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-1 md:col-span-2 lg:col-span-4 glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Weekly Breakdown Trend</CardTitle>
                            <CardDescription>
                                Number of breakdown vs PM tickets over the last 7 days.
                            </CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTrendChartType('line')}>
                                    <LineChartIcon className="mr-2 h-4 w-4" />
                                    <span>Line Chart</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTrendChartType('bar')}>
                                    <BarChartIcon className="mr-2 h-4 w-4" />
                                    <span>Bar Chart</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTrendChartType('pie')}>
                                    <PieChartIcon className="mr-2 h-4 w-4" />
                                    <span>Pie Chart</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                {trendChartType === 'line' ? (
                                    <LineChart data={dataTrend}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="breakdowns" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="pm" stroke="#82ca9d" strokeWidth={2} />
                                    </LineChart>
                                ) : trendChartType === 'bar' ? (
                                    <BarChart data={dataTrend}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'var(--muted)' }}
                                            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="breakdowns" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="pm" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                ) : (
                                    <PieChart>
                                        <Pie
                                            data={trendPieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {trendPieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={TREND_COLORS[index % TREND_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2 lg:col-span-3 glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Ticket Status Distribution</CardTitle>
                            <CardDescription>
                                Current status of all active tickets.
                            </CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setStatusChartType('pie')}>
                                    <PieChartIcon className="mr-2 h-4 w-4" />
                                    <span>Pie Chart</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusChartType('bar')}>
                                    <BarChartIcon className="mr-2 h-4 w-4" />
                                    <span>Bar Chart</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                {statusChartType === 'pie' ? (
                                    <PieChart>
                                        <Pie
                                            data={dataStatus}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {dataStatus.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                ) : (
                                    <BarChart data={dataStatus}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'var(--muted)' }}
                                            contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--foreground)' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {dataStatus.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Recent Breakdown Tickets</CardTitle>
                    <CardDescription>Latest 5 reports from the shop floor.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="h-9 w-9 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 font-bold text-xs">
                                        #{1000 + i}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium leading-none">Offset Machine B-{i}</p>
                                        <p className="text-xs text-muted-foreground mt-1">Paper Jam inside roller unit</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden md:block text-xs text-muted-foreground text-right">
                                        <p>Reported: Today, 10:{10 + i} AM</p>
                                        <p>By: Operator John</p>
                                    </div>
                                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${i % 2 === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {i % 2 === 0 ? 'Allocated' : 'Open'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
