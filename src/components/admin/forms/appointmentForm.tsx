"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState, useActionState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";
import { createAppointment } from "@/lib/actions/mutations/appointment-mutations";
import { searchPatients } from "@/lib/actions/queries/patient-search-query";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface AppointmentFormProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    patient?: {
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
    };
}

export function AppointmentForm({ show, setShow, patient }: AppointmentFormProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedReason, setSelectedReason] = useState("checkup");

    // Patient Search State
    const [isNewPatient, setIsNewPatient] = useState(patient ? false : true);
    const [patientSearchOpen, setPatientSearchOpen] = useState(false);
    const [patientSearchQuery, setPatientSearchQuery] = useState("");
    const [patientSearchResults, setPatientSearchResults] = useState<{ id: string; name: string; email: string | null; phone: string | null }[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<string>(patient ? patient.id : "");
    const [isPatientsLoaded, setIsPatientsLoaded] = useState(false);
    const [isLoadingPatients, setIsLoadingPatients] = useState(false);

    // Prefilled data for existing patient
    const [prefilledName, setPrefilledName] = useState(patient ? patient.name : "");
    const [prefilledEmail, setPrefilledEmail] = useState(patient && patient.email !== "N/A" ? patient.email || "" : "");
    const [prefilledPhone, setPrefilledPhone] = useState(patient && patient.phone !== "N/A" ? patient.phone || "" : "");

    useEffect(() => {
        if (patientSearchOpen && !isPatientsLoaded) {
            setIsLoadingPatients(true);
            searchPatients("").then(results => {
                setPatientSearchResults(results);
                setIsPatientsLoaded(true);
                setIsLoadingPatients(false);
            });
        }
    }, [patientSearchOpen, isPatientsLoaded]);

    const queryClient = useQueryClient();

    const [state, formAction, pending] = useActionState(createAppointment, { success: false, error: "" });
    const actionErrors = !state?.success ? state?.errors : undefined;

    const prevPending = useRef(false);
    useEffect(() => {
        // Only trigger success actions if we just transitioned from pending to not pending
        if (prevPending.current && !pending && state?.success) {
            toast.success("Appointment booked successfully!");
            queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
            if (selectedPatientId) {
                queryClient.invalidateQueries({ queryKey: queryKeys.patients.detail(selectedPatientId) });
            }
            setShow(false);
        }
        prevPending.current = pending;
    }, [pending, state?.success, queryClient, setShow, selectedPatientId]);

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Book an Appointment</DialogTitle>
                    <DialogDescription className="sr-only">
                        Fill out the form below to book an appointment.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <form action={formAction} className="space-y-6 mt-3">
                    <div className="flex flex-col gap-3 mb-6 bg-muted/30 p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                            <FieldLabel className="text-base font-semibold">Patient Information</FieldLabel>
                            {patient ? (
                                <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                                    Existing Patient
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setIsNewPatient(!isNewPatient);
                                        setSelectedPatientId("");
                                        setPrefilledName("");
                                        setPrefilledEmail("");
                                        setPrefilledPhone("");
                                        setPatientSearchQuery("");
                                    }}
                                >
                                    {isNewPatient ? "Select Existing Patient" : "Add New Patient"}
                                </Button>
                            )}
                        </div>

                        {!isNewPatient && (
                            <div className="flex flex-col gap-2">
                                {patient ? (
                                    <div className="w-full px-3 py-2 border rounded-md bg-muted/30 text-sm font-medium flex items-center justify-between">
                                        <span>{patient.name}</span>
                                        <span className="text-muted-foreground font-normal">{patient.phone}</span>
                                    </div>
                                ) : (
                                    <Popover open={patientSearchOpen} onOpenChange={setPatientSearchOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={patientSearchOpen}
                                                className="w-full justify-between"
                                            >
                                                {selectedPatientId
                                                    ? patientSearchResults.find((p) => p.id === selectedPatientId)?.name || prefilledName
                                                    : "Search for a patient..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[450px] p-0" align="start">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search by name, email, or phone..."
                                                    value={patientSearchQuery}
                                                    onValueChange={setPatientSearchQuery}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>{isLoadingPatients ? "Loading patients..." : "No patients found."}</CommandEmpty>
                                                    <CommandGroup>
                                                        {patientSearchResults.map((patient) => (
                                                            <CommandItem
                                                                key={patient.id}
                                                                value={`${patient.name} ${patient.email || ''} ${patient.phone || ''} ${patient.id}`}
                                                                onSelect={() => {
                                                                    setSelectedPatientId(patient.id);
                                                                    setPrefilledName(patient.name);
                                                                    setPrefilledEmail(patient.email || "");
                                                                    setPrefilledPhone(patient.phone || "");
                                                                    setPatientSearchOpen(false);
                                                                }}
                                                            >

                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        selectedPatientId === patient.id ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                <div className="flex flex-col">
                                                                    <span>{patient.name}</span>
                                                                    <span className="text-xs text-muted-foreground">{patient.email} | {patient.phone}</span>
                                                                </div>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                )}
                                <input type="hidden" name="patientId" value={selectedPatientId} />
                                <input type="hidden" name="name" value={prefilledName} />
                            </div>
                        )}

                        <div className="flex justify-between gap-5 mt-2">
                            <Field data-invalid={!!actionErrors?.name} className="w-1/2">
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    key={`name-${isNewPatient ? 'new' : selectedPatientId}`}
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    disabled={pending || !isNewPatient}
                                    defaultValue={!isNewPatient ? prefilledName : ""}
                                />
                                {actionErrors?.name && <FieldError>{actionErrors.name}</FieldError>}
                            </Field>

                            <Field data-invalid={!!actionErrors?.email} className="w-1/2">
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    key={`email-${isNewPatient ? 'new' : selectedPatientId}`}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    disabled={pending || !isNewPatient}
                                    defaultValue={!isNewPatient ? prefilledEmail : ""}
                                />
                                {actionErrors?.email && <FieldError>{actionErrors.email}</FieldError>}
                            </Field>
                        </div>

                        <div className="flex justify-between gap-5">
                            <Field data-invalid={!!actionErrors?.phone} className="w-full">
                                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                                <Input
                                    key={`phone-${isNewPatient ? 'new' : selectedPatientId}`}
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="123-456-7890"
                                    disabled={pending || !isNewPatient}
                                    defaultValue={!isNewPatient ? prefilledPhone : ""}
                                />
                                {actionErrors?.phone && <FieldError>{actionErrors.phone}</FieldError>}
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-between gap-5">
                        <Field data-invalid={!!actionErrors?.reason} className="w-full">
                            <FieldLabel htmlFor="reason">Reason</FieldLabel>
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
                    </div>

                    <div className="flex justify-between gap-5">
                        <Field data-invalid={!!actionErrors?.date} className="w-1/2">
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
                            {actionErrors?.date && <FieldError>{actionErrors.date}</FieldError>}
                        </Field>

                        <Field data-invalid={!!actionErrors?.time} className="w-1/2">
                            <FieldLabel htmlFor="time">Time</FieldLabel>
                            <Input id="time" name="time" type="time" disabled={pending} />
                            {actionErrors?.time && <FieldError>{actionErrors.time}</FieldError>}
                        </Field>
                    </div>

                    <Field data-invalid={!!actionErrors?.notes}>
                        <FieldLabel htmlFor="notes">Notes</FieldLabel>
                        <Textarea id="notes" name="notes" placeholder="Additional notes (optional)" disabled={pending} />
                        {actionErrors?.notes && <FieldError>{actionErrors.notes}</FieldError>}
                    </Field>

                    <Button type="submit" variant="default" className="w-full" disabled={pending}>
                        {pending ? "Booking..." : "Book Appointment"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AppointmentForm;
