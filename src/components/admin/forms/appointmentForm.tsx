"use client"

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useState, useActionState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { IoClose } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import Form from "next/form";

import { appointmentFormSchema as appointmentSchema } from '@/lib/validationSchema';

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

    // Patient Search State
    const [isNewPatient, setIsNewPatient] = useState(true);
    const [patientSearchOpen, setPatientSearchOpen] = useState(false);
    const [patientSearchQuery, setPatientSearchQuery] = useState("");
    const [patientSearchResults, setPatientSearchResults] = useState<{ id: string; name: string; email: string | null; phone: string | null }[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<string>("");

    // Prefilled data for existing patient
    const [prefilledName, setPrefilledName] = useState("");
    const [prefilledEmail, setPrefilledEmail] = useState("");
    const [prefilledPhone, setPrefilledPhone] = useState("");

    useEffect(() => {
        if (patientSearchQuery.length >= 2) {
            const delayDebounceFn = setTimeout(() => {
                searchPatients(patientSearchQuery).then(results => {
                    setPatientSearchResults(results);
                });
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setPatientSearchResults([]);
        }
    }, [patientSearchQuery]);

    const queryClient = useQueryClient();

    const [state, formAction, pending] = useActionState(createAppointment, { success: false, error: "" });
    const actionErrors = !state?.success ? state?.errors : undefined;

    useEffect(() => {
        if (state?.success) {
            toast.success("Appointment booked successfully!");
            queryClient.invalidateQueries({ queryKey: queryKeys.appointments.all });
            queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
            setShow(false);
        }
    }, [state?.success]);

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
                <Form action={formAction} className="space-y-6 mt-3">
                    <div className="flex flex-col gap-3 mb-6 bg-muted/30 p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                            <FieldLabel className="text-base font-semibold">Patient Information</FieldLabel>
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
                        </div>

                        {!isNewPatient && (
                            <div className="flex flex-col gap-2">
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
                                                <CommandEmpty>No patients found.</CommandEmpty>
                                                <CommandGroup>
                                                    {patientSearchResults.map((patient) => (
                                                        <CommandItem
                                                            key={patient.id}
                                                            value={patient.id}
                                                            onSelect={(currentValue) => {
                                                                setSelectedPatientId(currentValue);
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
                                <input type="hidden" name="patientId" value={selectedPatientId} />
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
                </Form>
            </CardContent>
        </Card>
    );
}

export default AppointmentForm;
