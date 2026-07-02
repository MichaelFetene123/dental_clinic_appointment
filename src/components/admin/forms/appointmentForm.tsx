"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { IoClose } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";

const appointmentSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    date: z.date({ required_error: "Date is required." }),
    time: z.string().min(1, { message: "Time is required." }),
    reason: z.string().min(5, { message: "Reason must be at least 5 characters." }),
    notes: z.string().optional(),
});

interface AppointmentFormProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>; // State updater function to hide form
}

export function AppointmentForm({ show, setShow }: AppointmentFormProps) {
    const form = useForm({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            date: undefined,
            time: "",
            reason: "",
            notes: "",
        },
    });


    const onSubmit = (data: z.infer<typeof appointmentSchema>) => {
        console.log("Appointment Data:", data);
    };
    if (!show) return null;


    return (
        <Card className="w-[500px] mx-auto px-3 pt-6 fixed top-0 right-0 mt-8 mr-3 ">
            <CardHeader >
                <div className="flex justify-between">
                    <CardTitle>Book an Appointment</CardTitle>
                    <button className="flex justify-end">
                        <IoClose size={30} onClick={() => setShow(false)} />
                    </button>
                </div>
            </CardHeader>
            <Separator />
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-3">
                        <div className="flex justify-between gap-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="example@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-between gap-5">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="123-456-7890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Reason</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a reason" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="checkup">Routine Checkup</SelectItem>
                                                    <SelectItem value="cleaning">Teeth Cleaning</SelectItem>
                                                    <SelectItem value="whitening">Teeth Whitening</SelectItem>
                                                    <SelectItem value="filling">Cavity Filling</SelectItem>
                                                    <SelectItem value="extraction">Tooth Extraction</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-between gap-5">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                        <CalendarIcon className="mr-2" />
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                                                    <div className="rounded-md border">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={(date) => {
                                                                field.onChange(date);
                                                            }}
                                                        />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Additional notes (optional)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full bg-[#0E4E81] hover:bg-[#2374b7]">Book Appointment</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default AppointmentForm;