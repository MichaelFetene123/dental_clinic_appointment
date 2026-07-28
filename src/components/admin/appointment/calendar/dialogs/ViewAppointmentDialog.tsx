"use client";

import { format } from "date-fns";
import { Calendar, Clock, Phone, User, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button }  from "@/components/ui/button";
import { Badge }   from "@/components/ui/badge";
import { Label }   from "@/components/ui/label";
import { getAppointmentTypeDetails, type AppointmentEntry } from "../types";
import { EditAppointmentForm } from "./EditAppointmentForm";

interface ViewAppointmentDialogProps {
    selectedAppointment: AppointmentEntry | null;
    isEditing:   boolean;
    resetKey:    number;
    onClose:     () => void;
    onEdit:      () => void;
    onCancelEdit:() => void;
    onSuccess:   () => void;
}

export function ViewAppointmentDialog({
    selectedAppointment,
    isEditing,
    resetKey,
    onClose,
    onEdit,
    onCancelEdit,
    onSuccess,
}: ViewAppointmentDialogProps) {
    return (
        <Dialog
            open={!!selectedAppointment}
            onOpenChange={(open) => { if (!open) onClose(); }}
        >
            <DialogContent className="sm:max-w-[550px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Appointment" : "Appointment Details"}
                    </DialogTitle>
                </DialogHeader>

                {/* ── View mode ─────────────────────────────────────── */}
                {selectedAppointment && !isEditing && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{selectedAppointment.patient}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {format(selectedAppointment.date, "PPPP")} at {selectedAppointment.time}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {getAppointmentTypeDetails(selectedAppointment.type)?.duration} minutes
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{selectedAppointment.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
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
                                <p className="text-sm text-muted-foreground">{selectedAppointment.notes}</p>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Button className="flex-1" variant="outline" onClick={onEdit}>Edit</Button>
                            <Button className="flex-1" variant="destructive" onClick={onClose}>Cancel</Button>
                        </div>
                    </div>
                )}

                {/* ── Edit mode ─────────────────────────────────────── */}
                {selectedAppointment && isEditing && (
                    <EditAppointmentForm
                        key={resetKey}
                        selectedAppointment={selectedAppointment}
                        onCancel={onCancelEdit}
                        onSuccess={onSuccess}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
