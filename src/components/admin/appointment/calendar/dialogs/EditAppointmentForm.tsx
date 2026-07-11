"use client";

import { useActionState, useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast }   from "sonner";
import { format }  from "date-fns";
import Form from "next/form";
import { updateAppointmentAdmin, type ActionResponse } from "@/lib/actions/mutations/appointment-mutations";
import { queryKeys } from "@/lib/queryKeys";
import { Button }    from "@/components/ui/button";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea }  from "@/components/ui/textarea";
import { APPOINTMENT_TYPES, timeSlots, type AppointmentEntry } from "../types";

interface EditAppointmentFormProps {
    selectedAppointment: AppointmentEntry;
    onCancel:  () => void;
    onSuccess: () => void;
}

export function EditAppointmentForm({
    selectedAppointment,
    onCancel,
    onSuccess,
}: EditAppointmentFormProps) {
    const queryClient = useQueryClient();
    const [editState, editAction, isEditPending] = useActionState<ActionResponse, FormData>(
        updateAppointmentAdmin,
        { success: false, error: "" }
    );
    const editErrors = !editState.success ? editState.errors : undefined;

    // Track whether the submitted data differed from the original appointment
    const hadChangesRef = useRef(false);

    const handleSubmit = useCallback(
        (formData: FormData) => {
            const name  = formData.get("name") as string;
            const email = formData.get("email") as string;
            const phone = formData.get("phone") as string;
            const date  = formData.get("date") as string;
            const time  = formData.get("time") as string;
            const reason = formData.get("reason") as string;
            const notes = (formData.get("notes") as string) ?? "";

            const originalDate  = format(selectedAppointment.date, "yyyy-MM-dd");
            const originalNotes = selectedAppointment.notes !== "N/A" ? selectedAppointment.notes : "";
            const originalPhone = selectedAppointment.phone !== "N/A" ? selectedAppointment.phone : "";
            const originalEmail = selectedAppointment.email !== "N/A" ? selectedAppointment.email : "";

            hadChangesRef.current =
                name   !== selectedAppointment.patient ||
                email  !== originalEmail ||
                phone  !== originalPhone ||
                date   !== originalDate ||
                time   !== selectedAppointment.time ||
                reason !== selectedAppointment.type ||
                notes  !== originalNotes;

            editAction(formData);
        },
        [editAction, selectedAppointment]
    );

    useEffect(() => {
        if (editState.success) {
            if (hadChangesRef.current) {
                toast.success("Appointment successfully updated!");
            } else {
                toast.warning("No changes were made to the appointment.");
            }
            queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
            onSuccess();
        }
    }, [editState.success, queryClient, onSuccess]);

    return (
        <Form action={handleSubmit} className="space-y-4 py-4">
            <input type="hidden" name="id" value={selectedAppointment.id} />

            {/* Patient name */}
            <div className="space-y-2">
                <Label>Patient Name</Label>
                <Input name="name" defaultValue={selectedAppointment.patient} placeholder="Enter patient name" />
                {editErrors?.name && <p className="text-sm text-destructive">{editErrors.name}</p>}
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                        name="phone"
                        type="tel"
                        placeholder="+1234567890"
                        defaultValue={selectedAppointment.phone !== "N/A" ? selectedAppointment.phone : ""}
                    />
                    {editErrors?.phone && <p className="text-sm text-destructive">{editErrors.phone}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="patient@example.com"
                        defaultValue={selectedAppointment.email !== "N/A" ? selectedAppointment.email : ""}
                    />
                    {editErrors?.email && <p className="text-sm text-destructive">{editErrors.email}</p>}
                </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Date</Label>
                    <Input name="date" type="date" defaultValue={format(selectedAppointment.date, "yyyy-MM-dd")} />
                    {editErrors?.date && <p className="text-sm text-destructive">{editErrors.date}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Time</Label>
                    <Select name="time" defaultValue={selectedAppointment.time}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {editErrors?.time && <p className="text-sm text-destructive">{editErrors.time}</p>}
                </div>
            </div>

            {/* Appointment type */}
            <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select name="reason" defaultValue={selectedAppointment.type}>
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
                {editErrors?.reason && <p className="text-sm text-destructive">{editErrors.reason}</p>}
            </div>

            {/* Notes */}
            <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                    name="notes"
                    placeholder="Add any additional notes..."
                    defaultValue={selectedAppointment.notes !== "N/A" ? selectedAppointment.notes : ""}
                />
            </div>

            {/* Server-level error */}
            {!editState.success && editState.error && !editState.errors && (
                <p className="text-sm text-destructive font-medium">{editState.error}</p>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                <Button type="submit" disabled={isEditPending} className="flex-1">
                    {isEditPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} disabled={isEditPending} className="flex-1">
                    Cancel
                </Button>
            </div>
        </Form>
    );
}
