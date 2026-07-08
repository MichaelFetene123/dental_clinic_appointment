"use client"

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState, useActionState } from "react";
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
    date: z.string().min(1, { message: "Date is required." }),
    time: z.string().min(1, { message: "Time is required." }),
    reason: z.string().min(5, { message: "Reason must be at least 5 characters." }),
    notes: z.string().optional(),
});

type FormState = {
    errors?: Record<string, string>;
    success?: boolean;
};

interface AppointmentFormProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AppointmentForm({ show, setShow }: AppointmentFormProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedReason, setSelectedReason] = useState("");

    async function submitAction(_prevState: FormState, formData: FormData): Promise<FormState> {
        const rawData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            date: formData.get("date") as string,
            time: formData.get("time") as string,
            reason: formData.get("reason") as string,
            notes: (formData.get("notes") as string) || undefined,
        };

        const result = appointmentSchema.safeParse(rawData);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            for (const issue of result.error.issues) {
                const fieldName = issue.path[0] as string;
                if (!fieldErrors[fieldName]) {
                    fieldErrors[fieldName] = issue.message;
                }
            }
            return { errors: fieldErrors };
        }

        console.log("Appointment Data:", result.data);
        return { success: true };
    }

    const [state, formAction, pending] = useActionState(submitAction, {} as FormState);

    if (!show) return null;

    return (
        <Card className="w-full max-w-lg mx-auto px-3 pt-6 fixed top-0 right-0 mt-8 mr-3 ">
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
                <form action={formAction} className="space-y-6 mt-3">
                    <div className="flex justify-between gap-5">
                        <Field data-invalid={!!state?.errors?.name} className="w-1/2">
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input id="name" name="name" placeholder="John Doe" disabled={pending} />
                            {state?.errors?.name && <FieldError>{state.errors.name}</FieldError>}
                        </Field>

                        <Field data-invalid={!!state?.errors?.email} className="w-1/2">
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" name="email" type="email" placeholder="example@email.com" disabled={pending} />
                            {state?.errors?.email && <FieldError>{state.errors.email}</FieldError>}
                        </Field>
                    </div>

                    <div className="flex justify-between gap-5">
                        <Field data-invalid={!!state?.errors?.phone} className="w-1/2">
                            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                            <Input id="phone" name="phone" type="tel" placeholder="123-456-7890" disabled={pending} />
                            {state?.errors?.phone && <FieldError>{state.errors.phone}</FieldError>}
                        </Field>
                        <Field data-invalid={!!state?.errors?.reason} className="w-1/2">
                            <FieldLabel htmlFor="reason">Reason</FieldLabel>
                            <Select
                                onValueChange={(value) => setSelectedReason(value)}
                                defaultValue={selectedReason}
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
                            <input type="hidden" name="reason" value={selectedReason} />
                            {state?.errors?.reason && <FieldError>{state.errors.reason}</FieldError>}
                        </Field>
                    </div>

                    <div className="flex justify-between gap-5">
                        <Field data-invalid={!!state?.errors?.date} className="w-1/2">
                            <FieldLabel htmlFor="date">Date</FieldLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2" />
                                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                                    <div className="rounded-md border">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                setSelectedDate(date);
                                            }}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <input type="hidden" name="date" value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""} />
                            {state?.errors?.date && <FieldError>{state.errors.date}</FieldError>}
                        </Field>

                        <Field data-invalid={!!state?.errors?.time} className="w-1/2">
                            <FieldLabel htmlFor="time">Time</FieldLabel>
                            <Input id="time" name="time" type="time" disabled={pending} />
                            {state?.errors?.time && <FieldError>{state.errors.time}</FieldError>}
                        </Field>
                    </div>

                    <Field data-invalid={!!state?.errors?.notes}>
                        <FieldLabel htmlFor="notes">Notes</FieldLabel>
                        <Textarea id="notes" name="notes" placeholder="Additional notes (optional)" disabled={pending} />
                        {state?.errors?.notes && <FieldError>{state.errors.notes}</FieldError>}
                    </Field>

                    <Button type="submit" variant="default" className="w-full" disabled={pending}>
                        {pending ? "Booking..." : "Book Appointment"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default AppointmentForm;