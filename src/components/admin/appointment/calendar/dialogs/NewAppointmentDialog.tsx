"use client";

import { format } from "date-fns";
import { CalendarCheck2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Label }    from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { APPOINTMENT_TYPES } from "../types";
import type { ActionResponse } from "@/lib/actions/mutations/appointment-mutations";

interface NewAppointmentDialogProps {
    selectedSlot: { date: Date; time: string } | null;
    onClose:      () => void;
    onSubmit:     (formData: FormData) => void;
    error:        Error | null;
    isPending:    boolean;
}

export function NewAppointmentDialog({
    selectedSlot,
    onClose,
    onSubmit,
    error,
    isPending,
}: NewAppointmentDialogProps) {
    const actionErrors = error?.cause as Record<string, string> | undefined;
    const rootError = error?.message;

    // CLIENT SIDE VALIDATION
    const isPast = selectedSlot ? (() => {
        const [hours, minutes] = selectedSlot.time.split(':').map(Number);
        const selectedDateTime = new Date(selectedSlot.date);
        selectedDateTime.setHours(hours, minutes, 0, 0);
        return selectedDateTime < new Date();
    })() : false;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSubmit(formData);
    };

    return (
        <Dialog open={!!selectedSlot} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>New Appointment</DialogTitle>
                </DialogHeader>

                {selectedSlot && (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 py-4"
                    >
                        <input type="hidden" name="date" value={format(selectedSlot.date, "yyyy-MM-dd")} />
                        <input type="hidden" name="time" value={selectedSlot.time} />

                        {/* Client-level error for past dates */}
                        {isPast && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm text-center font-medium">
                                Appointments cannot be scheduled in the past.
                            </div>
                        )}

                        {/* Slot summary */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarCheck2 className="h-4 w-4" />
                            <span>
                                {format(selectedSlot.date, "EEEE, MMMM d")} at {selectedSlot.time}
                            </span>
                        </div>

                        {/* Patient name */}
                        <div className="space-y-2">
                            <Label>Patient Name</Label>
                            <Input name="name" placeholder="Enter patient name" />
                            {actionErrors?.name && <p className="text-sm text-destructive">{actionErrors.name}</p>}
                        </div>

                        {/* Phone + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input name="phone" type="tel" placeholder="+1234567890" />
                                {actionErrors?.phone && <p className="text-sm text-destructive">{actionErrors.phone}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input name="email" type="email" placeholder="patient@example.com" />
                                {actionErrors?.email && <p className="text-sm text-destructive">{actionErrors.email}</p>}
                            </div>
                        </div>



                        {/* Appointment type */}
                        <div className="space-y-2">
                            <Label>Appointment Type</Label>
                            <Select name="reason">
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
                            {actionErrors?.reason && <p className="text-sm text-destructive">{actionErrors.reason}</p>}
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label>Notes</Label>
                            <Textarea name="notes" placeholder="Add any additional notes..." />
                        </div>

                        {/* Server-level error */}
                        {error && rootError && !actionErrors && (
                            <p className="text-sm text-destructive font-medium">{rootError}</p>
                        )}

                        <Button type="submit" disabled={isPending || isPast} className="w-full">
                            {isPending ? "Scheduling..." : "Schedule Appointment"}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
