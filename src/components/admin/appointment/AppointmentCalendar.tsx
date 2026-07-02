"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, eachDayOfInterval, addMonths, startOfMonth, endOfMonth, isSameMonth, isSameDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck2, ChevronLeft, ChevronRight, Clock, Phone, User, Calendar, Mail } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";


const APPOINTMENT_TYPES = {
    GENERAL: [
        { id: "checkup", name: "Check-up", duration: 30, color: "bg-blue-100 text-blue-700" },
        { id: "cleaning", name: "Cleaning", duration: 45, color: "bg-green-100 text-green-700" },
        { id: "emergency", name: "Emergency", duration: 60, color: "bg-red-100 text-red-700" },
    ],
    TREATMENTS: [
        { id: "rootcanal", name: "Root Canal", duration: 90, color: "bg-purple-100 text-purple-700" },
        { id: "extraction", name: "Extraction", duration: 60, color: "bg-orange-100 text-orange-700" },
        { id: "filling", name: "Filling", duration: 45, color: "bg-teal-100 text-teal-700" },
    ],
    ORTHODONTICS: [
        { id: "braces_adjustment", name: "Braces Adjustment", duration: 30, color: "bg-indigo-100 text-indigo-700" },
        { id: "braces_fitting", name: "Braces Fitting", duration: 90, color: "bg-pink-100 text-pink-700" },
        { id: "retainer_check", name: "Retainer Check", duration: 20, color: "bg-yellow-100 text-yellow-700" },
    ],
};

const appointments = [
    {
        id: 1,
        date: new Date(2024, 3, 15),
        time: "09:00",
        duration: 30,
        patient: "John Doe",
        type: "checkup",
        phone: "+1234567890",
        email: "john@example.com",
        notes: "Regular check-up appointment"
    },
    {
        id: 2,
        date: new Date(2024, 3, 15),
        time: "10:30",
        duration: 90,
        patient: "Jane Smith",
        type: "braces_fitting",
        phone: "+1234567891",
        email: "jane@example.com",
        notes: "Initial braces fitting"
    },
];

const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12; // For 0-11, map to 12-hour format
    const minute = i % 2 === 0 ? "00" : "30"; // Half-hour increments
    return `${hour.toString().padStart(2, "0")}:${minute}`; // HH:mm format
});

console.log(timeSlots);

export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<{
        id: number;
        date: Date;
        time: string;
        duration: number;
        patient: string;
        type: string;
        phone: string;
        email: string;
        notes: string;
    } | null>(null);
    const [view, setView] = useState("day");

    // ... (helper functions remain unchanged)
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({
        start: weekStart,
        end: addDays(weekStart, 6),
    });

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const monthDays = eachDayOfInterval({
        start: startOfWeek(monthStart, { weekStartsOn: 1 }),
        end: endOfMonth(monthEnd),
    });
    // Function to get appointments for a specific date and time
    const getAppointmentsForDateAndTime = (date: Date, time: string) => {
        return appointments.filter((apt) => {
            const aptDate = format(apt.date, 'yyyy-MM-dd');  // Format appointment date
            const selectedDate = format(date, 'yyyy-MM-dd'); // Format selected date
            return aptDate === selectedDate && apt.time === time;  // Compare formatted date and time
        });
    };

    const getAppointmentsForDate = (date: Date) => {
        return appointments.filter(
            (apt) => apt.date.toDateString() === date.toDateString()
        );
    };

    const handlePrevious = () => {
        switch (view) {
            case "day":
                setCurrentDate(addDays(currentDate, -1));
                break;
            case "week":
                setCurrentDate(addDays(currentDate, -7));
                break;
            case "month":
                setCurrentDate(addMonths(currentDate, -1));
                break;
        }
    };

    const handleNext = () => {
        switch (view) {
            case "day":
                setCurrentDate(addDays(currentDate, 1));
                break;
            case "week":
                setCurrentDate(addDays(currentDate, 7));
                break;
            case "month":
                setCurrentDate(addMonths(currentDate, 1));
                break;
        }
    };

    const getAppointmentTypeDetails = (typeId: string) => {
        return Object.values(APPOINTMENT_TYPES)
            .flat()
            .find(type => type.id === typeId);
    };

    const renderDayView = () => (
        <div className="grid grid-cols-2  ">
            <div className="sticky left-0 bg-white">
                <div className="h-12 border-b border-gray-200"></div>
                {timeSlots.map((time) => (
                    <div key={time} className="h-12 border-b border-gray-200 px-2 py-1">
                        <span className="text-xs text-gray-500">{time}</span>
                    </div>
                ))}
            </div>
            <div className="min-w-[300px]">
                <div className="h-12 border-b border-gray-200 px-2 py-2 text-center bg-gray-50">
                    <div className="font-medium">{format(currentDate, "EEEE")}</div>
                    <div className="text-sm text-gray-500">{format(currentDate, "MMMM d")}</div>
                </div>
                {timeSlots.map((time) => {
                    const dayAppointments = getAppointmentsForDateAndTime(currentDate, time);
                    return (
                        <div
                            key={`${format(currentDate, "yyyy-MM-dd")}T${time}`}
                            className="h-12 border-b border-gray-200 px-1 py-1 relative group"
                            onClick={() => setSelectedSlot({ date: currentDate, time })}
                        >
                            {dayAppointments.map((apt) => {
                                const typeDetails = getAppointmentTypeDetails(apt.type);
                                return (
                                    <div
                                        key={apt.id}
                                        className={`absolute inset-1 rounded p-1 text-xs cursor-pointer ${typeDetails?.color}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedAppointment(apt);
                                        }}
                                    >
                                        <div className="font-medium truncate">{apt.patient}</div>
                                        <div className="truncate">{typeDetails?.name}</div>
                                    </div>
                                );
                            })}
                            {dayAppointments.length === 0 && (
                                <div className="hidden group-hover:block">
                                    <Button
                                        variant="ghost"
                                        className="h-full w-full p-0 text-xs"
                                    >
                                        +
                                    </Button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderWeekView = () => (
        <div className="grid grid-cols-8 divide-x divide-gray-200">
            <div className="sticky left-0 bg-white">
                <div className="h-12 border-b border-gray-200"></div>
                {timeSlots.map((time) => (
                    <div key={time} className="h-12 border-b border-gray-200 px-2 py-1">
                        <span className="text-xs text-gray-500">{time}</span>
                    </div>
                ))}
            </div>
            {weekDays.map((date) => (
                <div key={date.toString()} className="min-w-[180px]">
                    <div className="h-12 border-b border-gray-200 px-2 py-2 text-center bg-gray-50">
                        <div className="font-medium">{format(date, "EEE")}</div>
                        <div className="text-sm text-gray-500">{format(date, "MMM d")}</div>
                    </div>
                    {timeSlots.map((time) => {
                        const appointments = getAppointmentsForDateAndTime(date, time);
                        return (
                            <div
                                key={`${format(date, "yyyy-MM-dd")}T${time}`}
                                className="h-12 border-b border-gray-200 px-1 py-1 relative group"
                                onClick={() => setSelectedSlot({ date, time })}
                            >
                                {appointments.map((apt) => {
                                    const typeDetails = getAppointmentTypeDetails(apt.type);
                                    return (
                                        <div
                                            key={apt.id}
                                            className={`absolute inset-1 rounded p-1 text-xs cursor-pointer ${typeDetails?.color}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedAppointment(apt);
                                            }}
                                        >
                                            <div className="font-medium truncate">{apt.patient}</div>
                                            <div className="truncate">{typeDetails?.name}</div>
                                        </div>
                                    );
                                })}
                                {appointments.length === 0 && (
                                    <div className="hidden group-hover:block">
                                        <Button
                                            variant="ghost"
                                            className="h-full w-full p-0 text-xs"
                                        >
                                            +
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );

    const renderMonthView = () => (
        <div className="grid grid-cols-7 gap-px bg-gray-200">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="bg-gray-50 p-2 text-center text-xs font-medium">
                    {day}
                </div>
            ))}
            {monthDays.map((date) => {
                const dayAppointments = getAppointmentsForDate(date);
                const isCurrentMonth = isSameMonth(date, currentDate);
                return (
                    <div
                        key={date.toString()}
                        className={`min-h-[120px] bg-white p-2 ${!isCurrentMonth ? "text-gray-400" : ""
                            } ${isSameDay(date, new Date()) ? "bg-blue-50" : ""}`}
                        onClick={() => {
                            setCurrentDate(date);
                            setView("day");
                        }}
                    >
                        <div className="font-medium">{format(date, "d")}</div>
                        <div className="mt-1 space-y-1">
                            {dayAppointments.slice(0, 3).map((apt) => {
                                const typeDetails = getAppointmentTypeDetails(apt.type);
                                return (
                                    <div
                                        key={apt.id}
                                        className={`text-xs p-1 rounded ${typeDetails?.color}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedAppointment(apt);
                                        }}
                                    >
                                        {apt.time} - {apt.patient}
                                    </div>
                                );
                            })}
                            {dayAppointments.length > 3 && (
                                <div className="text-xs text-gray-500">
                                    +{dayAppointments.length - 3} more
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Dental Clinic Schedule</h1>
                    <p className="text-gray-600 mt-2">Manage your appointments efficiently</p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div className="flex items-center gap-4">
                            <CardTitle className="flex items-center gap-2">
                                <CalendarCheck2 className="h-5 w-5" />
                                Schedule
                            </CardTitle>
                            <Tabs value={view} onValueChange={setView} className="ml-4">
                                <TabsList>
                                    <TabsTrigger value="day">Day</TabsTrigger>
                                    <TabsTrigger value="week">Week</TabsTrigger>
                                    <TabsTrigger value="month">Month</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="icon" onClick={handlePrevious}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">
                                {view === "month"
                                    ? format(currentDate, "MMMM yyyy")
                                    : view === "week"
                                        ? `${format(weekStart, "MMM d")} - ${format(addDays(weekStart, 6), "MMM d, yyyy")}`
                                        : format(currentDate, "MMMM d, yyyy")}
                            </span>
                            <Button variant="outline" size="icon" onClick={handleNext}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[800px] rounded-md border">
                            <Tabs value={view}>
                                <TabsContent value="day" className="m-0">
                                    {renderDayView()}
                                </TabsContent>
                                <TabsContent value="week" className="m-0">
                                    {renderWeekView()}
                                </TabsContent>
                                <TabsContent value="month" className="m-0">
                                    {renderMonthView()}
                                </TabsContent>
                            </Tabs>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* New Appointment Dialog */}
                <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New Appointment</DialogTitle>
                        </DialogHeader>
                        {selectedSlot && (
                            <div className="space-y-4 py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <CalendarCheck2 className="h-4 w-4" />
                                    <span>
                                        {format(selectedSlot.date, "EEEE, MMMM d")} at {selectedSlot.time}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <Label>Patient Name</Label>
                                    <Input placeholder="Enter patient name" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <Input type="tel" placeholder="+1234567890" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input type="email" placeholder="patient@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Appointment Category</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General</SelectItem>
                                            <SelectItem value="treatments">Treatments</SelectItem>
                                            <SelectItem value="orthodontics">Orthodontics</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Appointment Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(APPOINTMENT_TYPES).map(([category, types]) => (
                                                <div key={category}>
                                                    <div className="px-2 py-1.5 text-sm font-semibold">{category}</div>
                                                    {types.map((type) => (
                                                        <SelectItem key={type.id} value={type.id}>
                                                            {type.name} ({type.duration} min)
                                                        </SelectItem>
                                                    ))}
                                                </div>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Notes</Label>
                                    <Textarea placeholder="Add any additional notes..." />
                                </div>
                                <Button className="w-full">Schedule Appointment</Button>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* View Appointment Dialog */}
                <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Appointment Details</DialogTitle>
                        </DialogHeader>
                        {selectedAppointment && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span className="font-medium">{selectedAppointment.patient}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span>
                                            {format(selectedAppointment.date, "PPPP")} at {selectedAppointment.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span>{getAppointmentTypeDetails(selectedAppointment.type)?.duration} minutes</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span>{selectedAppointment.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span>{selectedAppointment.email}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Badge variant="secondary">
                                        {getAppointmentTypeDetails(selectedAppointment.type)?.name}
                                    </Badge>
                                </div>
                                {selectedAppointment.notes && (
                                    <div className="space-y-2">
                                        <Label>Notes</Label>
                                        <p className="text-sm text-gray-600">{selectedAppointment.notes}</p>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Button className="flex-1" variant="outline">Edit</Button>
                                    <Button className="flex-1" variant="destructive">Cancel</Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}