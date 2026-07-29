"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState, useActionState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { createPortalAppointment } from "@/lib/actions/mutations/appointment-mutations";
import { useInvalidatePortalAppointments } from "@/hooks/use-portal-appointments";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

export function PortalAppointmentModal() {
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedReason, setSelectedReason] = useState("checkup");

    const [state, formAction, pending] = useActionState(createPortalAppointment, { success: false, error: "" });
    const actionErrors = !state?.success ? state?.errors : undefined;
    const invalidatePortalAppointments = useInvalidatePortalAppointments();

    useEffect(() => {
        if (state?.success) {
            toast.success("Appointment booked successfully!");
            invalidatePortalAppointments(); // Instantly refresh the appointments list
            setShow(false);
            // Reset form state for next time
            setSelectedDate(undefined);
            setSelectedReason("checkup");
        }
    }, [state?.success, invalidatePortalAppointments]);

    // Added a small helper effect to show the root error if there is one and no specific field errors
    useEffect(() => {
        if (state && !state.success) {
            if (state.error && !state.errors) {
                toast.error(state.error);
            }
        }
    }, [state]);

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Book Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Book an Appointment</DialogTitle>
                    <DialogDescription>
                        Select a date and time for your visit. Your personal details are already securely linked.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <form action={formAction} className="space-y-6 mt-3">
                    
                    <Field data-invalid={!!actionErrors?.reason} className="w-full">
                        <FieldLabel htmlFor="reason">Reason for Visit</FieldLabel>
                        <Select
                            onValueChange={(value) => setSelectedReason(value)}
                            value={selectedReason}
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
                        {actionErrors?.reason && <FieldError>{actionErrors.reason}</FieldError>}
                    </Field>

                    <div className="flex flex-col sm:flex-row justify-between gap-5">
                        <Field data-invalid={!!actionErrors?.date} className="w-full sm:w-1/2">
                            <FieldLabel htmlFor="date">Date</FieldLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2" />
                                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
                                    <div className="rounded-md border bg-card">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                setSelectedDate(date);
                                            }}
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <input type="hidden" name="date" value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""} />
                            {actionErrors?.date && <FieldError>{actionErrors.date}</FieldError>}
                        </Field>

                        <Field data-invalid={!!actionErrors?.time} className="w-full sm:w-1/2">
                            <FieldLabel htmlFor="time">Time</FieldLabel>
                            <Input id="time" name="time" type="time" disabled={pending} />
                            {actionErrors?.time && <FieldError>{actionErrors.time}</FieldError>}
                        </Field>
                    </div>

                    <Field data-invalid={!!actionErrors?.notes}>
                        <FieldLabel htmlFor="notes">Additional Notes (Optional)</FieldLabel>
                        <Textarea id="notes" name="notes" placeholder="Any specific concerns or details you'd like to share?" disabled={pending} />
                        {actionErrors?.notes && <FieldError>{actionErrors.notes}</FieldError>}
                    </Field>

                    <Button type="submit" variant="default" className="w-full" disabled={pending}>
                        {pending ? "Booking..." : "Confirm Booking"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
