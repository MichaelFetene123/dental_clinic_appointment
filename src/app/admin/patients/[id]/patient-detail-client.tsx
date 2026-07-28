"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { usePatientDetail } from '@/hooks/use-patients'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

import { GrantAccessModal } from '@/components/admin/patient/GrantAccessModal'
import { AppointmentForm } from "@/components/admin/forms/appointmentForm"
import PatientForm from "@/components/admin/forms/patientForm"

import {
    Calendar, Mail, MapPin, Phone, VenusAndMars, User,
    CalendarCheck, Clock, FileText, Activity, Key, Edit, Plus
} from 'lucide-react'

interface PatientDetailClientProps {
    id: string;
}

export default function PatientDetailClient({ id }: PatientDetailClientProps) {
    const { data: patient, isLoading } = usePatientDetail(id)

    // Dialog States
    const [grantModalOpen, setGrantModalOpen] = useState(false);
    const [showApptForm, setShowApptForm] = useState(false);
    const [editPatientOpen, setEditPatientOpen] = useState(false);

    if (isLoading) {
        return (
            <div className='flex flex-col gap-6 p-6'>
                <div className="flex gap-4 items-center">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <Skeleton className="h-[400px] w-full rounded-xl" />
            </div>
        )
    }

    if (!patient) {
        return (
            <div className='flex flex-col items-center justify-center h-[50vh]'>
                <User className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                <h1 className="text-2xl font-bold text-foreground">Patient Not Found</h1>
                <p className="text-muted-foreground mt-2">The requested patient could not be located.</p>
            </div>
        )
    }

    const upcomingAppointments = patient.appointments?.filter(
        (appt: any) => new Date(appt.date) >= new Date()
    ) || [];

    const pastAppointments = patient.appointments?.filter(
        (appt: any) => new Date(appt.date) < new Date()
    ) || [];

    return (
        <div className='flex flex-col gap-6 p-4 md:p-6 lg:max-w-7xl mx-auto'>
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl border shadow-sm'>
                <div className="flex gap-4 items-center">
                    <Image
                        src={"/images/download.jpg"}
                        alt={patient.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover aspect-square border"
                    />
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{patient.name}</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Patient since {format(new Date(patient.createdAt), 'MMM yyyy')}
                        </p>
                    </div>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    {patient.userId ? (
                        <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 h-10 px-4 cursor-pointer gap-2 transition-colors hover:bg-green-100" onClick={() => setGrantModalOpen(true)}>
                            <Key className="w-4 h-4" />
                            Portal Active
                        </Badge>
                    ) : (
                        <Button variant="outline" className="gap-2 h-10" onClick={() => setGrantModalOpen(true)}>
                            <Key className="w-4 h-4" />
                            Grant Access
                        </Button>
                    )}
                    <Button variant="outline" className="gap-2 h-10" onClick={() => setEditPatientOpen(true)}>
                        <Edit className="w-4 h-4" />
                        Edit Profile
                    </Button>
                    <Button className="gap-2 h-10 font-semibold shadow-sm" onClick={() => setShowApptForm(true)}>
                        <Plus className="w-4 h-4" />
                        New Appointment
                    </Button>
                </div>
            </div>

            {/* Main Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Left Column: Patient Info */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className='text-lg flex items-center gap-2'>
                                <User className="w-5 h-5 text-primary" />
                                General Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className='flex gap-3 items-start'>
                                <VenusAndMars className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Gender</p>
                                    <p className="text-sm font-medium">{patient.gender}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className='flex gap-3 items-start'>
                                <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Date of Birth</p>
                                    <p className="text-sm font-medium">{patient.dateOfBirth ? format(new Date(patient.dateOfBirth), 'MMM dd, yyyy') : 'N/A'}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className='flex gap-3 items-start'>
                                <Phone className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Phone</p>
                                    <p className="text-sm font-medium">{patient.phone || 'N/A'}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className='flex gap-3 items-start'>
                                <Mail className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Email</p>
                                    <p className="text-sm font-medium break-all">{patient.email || 'N/A'}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex gap-3 items-start">
                                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</p>
                                    <p className="text-sm font-medium">{patient.address || 'N/A'}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex gap-3 items-start">
                                <Key className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Portal Access</p>
                                    <p className="text-sm font-medium">
                                        {patient.userId && patient.user?.email ? (
                                            <span className="text-green-600 font-semibold">Granted Email: {patient.user.email}</span>
                                        ) : (
                                            <span className="text-muted-foreground">No portal account granted yet.</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Appointments & History */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Upcoming Appointments */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-4 border-b">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CalendarCheck className="w-5 h-5 text-primary" />
                                Upcoming Appointments
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {upcomingAppointments.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground text-sm">
                                    No upcoming appointments scheduled.
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {upcomingAppointments.map((appt: any, i: number) => (
                                        <div key={i} className="p-4 hover:bg-muted/30 transition-colors flex justify-between items-center gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground">{format(new Date(appt.date), 'MMMM dd, yyyy')} • {appt.time}</p>
                                                    <p className="text-sm text-muted-foreground mt-0.5">{appt.reason}</p>
                                                </div>
                                            </div>
                                            <Badge variant={appt.status === "SCHEDULED" ? "default" : "secondary"}>
                                                {appt.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Past Appointments History Table */}
                    <Card className="shadow-sm">
                        <CardHeader className="pb-4 border-b">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" />
                                Recent History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[120px]">Date</TableHead>
                                        <TableHead>Treatment/Reason</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pastAppointments.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                                No past appointments found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        pastAppointments.slice(0, 5).map((appt: any, i: number) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">
                                                    {format(new Date(appt.date), 'MMM dd, yyyy')}
                                                </TableCell>
                                                <TableCell>
                                                    {appt.reason}
                                                    {appt.notes && (
                                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{appt.notes}</p>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="text-xs">
                                                        {appt.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Dental & Medical Documents Summary (If they exist in schema) */}
                    {(patient.dentalHistory?.length > 0 || patient.medicalDocuments?.length > 0) && (
                        <Card className="shadow-sm">
                            <CardHeader className="pb-4 border-b">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Records & Documents
                                </CardTitle>
                                <CardDescription>Additional clinical records attached to this patient.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 text-sm text-muted-foreground">
                                <ul className="list-disc pl-5 space-y-1">
                                    {patient.dentalHistory?.length > 0 && (
                                        <li>{patient.dentalHistory.length} Dental History records logged.</li>
                                    )}
                                    {patient.medicalDocuments?.length > 0 && (
                                        <li>{patient.medicalDocuments.length} Medical Documents attached.</li>
                                    )}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Conditionally rendered modals to avoid React 19 focus-trap issues */}
            {grantModalOpen && (
                <GrantAccessModal
                    patientId={patient.id}
                    patientName={patient.name}
                    defaultEmail={patient.email}
                    hasAccess={!!patient.userId}
                    open={grantModalOpen}
                    onOpenChange={setGrantModalOpen}
                />
            )}

            {showApptForm && (
                <AppointmentForm
                    show={showApptForm}
                    setShow={setShowApptForm}
                    patient={{
                        id: patient.id,
                        name: patient.name,
                        email: patient.email,
                        phone: patient.phone
                    }}
                />
            )}

            {editPatientOpen && (
                <PatientForm
                    show={editPatientOpen}
                    setShow={setEditPatientOpen}
                    patient={patient}
                />
            )}
        </div>
    )
}
