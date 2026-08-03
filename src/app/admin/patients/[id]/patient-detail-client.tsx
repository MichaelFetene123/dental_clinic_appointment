"use client"

import React, { useState, Suspense } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { usePatientDetail, useSuspensePatientDetail, useDeletePatient } from '@/hooks/use-patients'
import { usePermissions } from '@/components/providers/PermissionProvider'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { GrantAccessModal } from '@/components/admin/patient/GrantAccessModal'
import { AppointmentForm } from "@/components/admin/forms/appointmentForm"
import PatientForm from "@/components/admin/forms/patientForm"

import {
    Calendar, Mail, MapPin, Phone, VenusAndMars, User,
    CalendarCheck, Clock, FileText, Activity, Key, Edit, Plus, Trash2, Loader2
} from 'lucide-react'
import { HeaderSkeleton } from '@/components/skeleton/patientdetailpageSkeletons/HeaderSkeleton'
import { GeneralInfoSkeleton } from '@/components/skeleton/patientdetailpageSkeletons/GeneralInfoSkeleton'
import { UpcomingAppointmentsSkeleton } from '@/components/skeleton/patientdetailpageSkeletons/UpcomingAppointmentsSkeleton'
import { HistorySkeleton } from '@/components/skeleton/patientdetailpageSkeletons/HistorySkeleton'



// --- SUB-COMPONENTS ---
function PatientHeader({ id, onGrant, onEdit, onAppt, onDelete, deletePending }: any) {
    const { data: patient } = useSuspensePatientDetail(id);
    const { hasPermission, isSuperAdmin } = usePermissions();
    const canEdit = isSuperAdmin || hasPermission("patient.edit");
    const canDelete = isSuperAdmin || hasPermission("patient.delete");
    const canManagePortal = isSuperAdmin || hasPermission("portal_users.manage");
    const canCreateAppointment = isSuperAdmin || hasPermission("appointment.create");

    if (!patient) return null;

    return (
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl border shadow-sm'>
            <div className="flex gap-4 items-center">
                <Image src={"/images/download.jpg"} alt={patient.name} width={64} height={64} className="rounded-full object-cover aspect-square border" />
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">{patient.name}</h1>
                    <p className="text-sm text-muted-foreground mt-1">Patient since {format(new Date(patient.createdAt), 'MMM yyyy')}</p>
                </div>
            </div>
            <div className='flex flex-wrap gap-2 items-center'>
                {canManagePortal && (
                    <Button variant={patient.userId ? "outline" : "default"} className="gap-2 h-10" onClick={onGrant}>
                        <Key className="w-4 h-4" />{patient.userId ? "Manage Access" : "Grant Access"}
                    </Button>
                )}
                {canEdit && (
                    <Button variant="outline" className="gap-2 h-10" onClick={onEdit}>
                        <Edit className="w-4 h-4" />Edit Profile
                    </Button>
                )}
                {canCreateAppointment && (
                    <Button className="gap-2 h-10 font-semibold shadow-sm" onClick={onAppt}>
                        <Plus className="w-4 h-4" />New Appointment
                    </Button>
                )}
                {canDelete && (
                    <Button variant="destructive" className="gap-2 h-10" onClick={onDelete} disabled={deletePending}>
                        {deletePending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Delete Patient
                    </Button>
                )}
            </div>
        </div>
    )
}

function PatientGeneralInfo({ id }: { id: string }) {
    const { data: patient } = useSuspensePatientDetail(id);
    if (!patient) return null;

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className='text-lg flex items-center gap-2'><User className="w-5 h-5 text-primary" /> General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className='flex gap-3 items-start'>
                    <VenusAndMars className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div><p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Gender</p><p className="text-sm font-medium">{patient.gender}</p></div>
                </div>
                <Separator />
                <div className='flex gap-3 items-start'>
                    <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div><p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Date of Birth</p><p className="text-sm font-medium">{patient.dateOfBirth ? format(new Date(patient.dateOfBirth), 'MMM dd, yyyy') : 'N/A'}</p></div>
                </div>
                <Separator />
                <div className='flex gap-3 items-start'>
                    <Phone className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div><p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Phone</p><p className="text-sm font-medium">{patient.phone || 'N/A'}</p></div>
                </div>
                <Separator />
                <div className='flex gap-3 items-start'>
                    <Mail className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div><p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>Email</p><p className="text-sm font-medium break-all">{patient.email || 'N/A'}</p></div>
                </div>
                <Separator />
                <div className="flex gap-3 items-start">
                    <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</p><p className="text-sm font-medium">{patient.address || 'N/A'}</p></div>
                </div>
                <Separator />
                <div className="flex gap-3 items-start">
                    <Key className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Portal Access</p>
                        <p className="text-sm font-medium">
                            {patient.userId && patient.user?.email ? <span className="text-green-600 font-semibold">Granted Email: {patient.user.email}</span> : <span className="text-muted-foreground">No portal account granted yet.</span>}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function PatientUpcomingAppointments({ id }: { id: string }) {
    const { data: patient } = useSuspensePatientDetail(id);
    if (!patient) return null;
    const upcomingAppointments = patient.appointments?.filter((appt: any) => new Date(appt.date) >= new Date()) || [];

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><CalendarCheck className="w-5 h-5 text-primary" /> Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {upcomingAppointments.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground text-sm">No upcoming appointments scheduled.</div>
                ) : (
                    <div className="divide-y">
                        {upcomingAppointments.map((appt: any, i: number) => (
                            <div key={i} className="p-4 hover:bg-muted/30 transition-colors flex justify-between items-center gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 text-primary p-2 rounded-lg"><Clock className="w-5 h-5" /></div>
                                    <div><p className="font-semibold text-foreground">{format(new Date(appt.date), 'MMMM dd, yyyy')} • {appt.time}</p><p className="text-sm text-muted-foreground mt-0.5">{appt.reason}</p></div>
                                </div>
                                <Badge variant={appt.status === "SCHEDULED" ? "default" : "secondary"}>{appt.status}</Badge>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function PatientHistory({ id }: { id: string }) {
    const { data: patient } = useSuspensePatientDetail(id);
    if (!patient) return null;
    const pastAppointments = patient.appointments?.filter((appt: any) => new Date(appt.date) < new Date()) || [];

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> Recent History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow><TableHead className="w-[120px]">Date</TableHead><TableHead>Treatment/Reason</TableHead><TableHead>Status</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        {pastAppointments.length === 0 ? (
                            <TableRow><TableCell colSpan={3} className="h-24 text-center text-muted-foreground">No past appointments found.</TableCell></TableRow>
                        ) : (
                            pastAppointments.slice(0, 5).map((appt: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{format(new Date(appt.date), 'MMM dd, yyyy')}</TableCell>
                                    <TableCell>{appt.reason}{appt.notes && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{appt.notes}</p>}</TableCell>
                                    <TableCell><Badge variant="outline" className="text-xs">{appt.status}</Badge></TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}


// --- DIALOGS CONTROLLER ---
function PatientDialogs({ id, grantModalOpen, setGrantModalOpen, showApptForm, setShowApptForm, editPatientOpen, setEditPatientOpen, deleteDialogOpen, setDeleteDialogOpen, deleteMutation }: any) {
    const { data: patient } = usePatientDetail(id);
    const router = useRouter();

    if (!patient) return null;

    return (
        <>
            {grantModalOpen && (
                <GrantAccessModal patientId={patient.id} patientName={patient.name} defaultEmail={patient.email} hasAccess={!!patient.userId} open={grantModalOpen} onOpenChange={setGrantModalOpen} />
            )}
            {showApptForm && (
                <AppointmentForm show={showApptForm} setShow={setShowApptForm} patient={{ id: patient.id, name: patient.name, email: patient.email, phone: patient.phone }} />
            )}
            {editPatientOpen && (
                <PatientForm show={editPatientOpen} setShow={setEditPatientOpen} patient={patient} />
            )}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Patient</AlertDialogTitle>
                        <AlertDialogDescription>Are you sure you want to permanently delete <strong>{patient?.name}</strong>? This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteMutation.isPending} onClick={(e) => {
                            e.preventDefault();
                            deleteMutation.mutate(patient.id, {
                                onSuccess: (result: any) => {
                                    if (result.success) {
                                        setDeleteDialogOpen(false);
                                        router.push('/admin/patients');
                                    }
                                }
                            });
                        }}>
                            {deleteMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Deleting…</> : 'Delete Patient'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

// --- MAIN LAYOUT ---
interface PatientDetailClientProps { id: string; }

export default function PatientDetailClient({ id }: PatientDetailClientProps) {
    const deleteMutation = useDeletePatient();
    
    // We use standard query here so it doesn't suspend the whole layout, just to check existence.
    const { data: patient, isSuccess } = usePatientDetail(id);

    const [grantModalOpen, setGrantModalOpen] = useState(false);
    const [showApptForm, setShowApptForm] = useState(false);
    const [editPatientOpen, setEditPatientOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    if (isSuccess && !patient) {
        return (
            <div className='flex flex-col items-center justify-center h-[50vh]'>
                <User className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                <h1 className="text-2xl font-bold text-foreground">Patient Not Found</h1>
                <p className="text-muted-foreground mt-2">The requested patient could not be located.</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-6 p-4 md:p-6 lg:max-w-7xl mx-auto'>
            <Suspense fallback={<HeaderSkeleton />}>
                <PatientHeader 
                    id={id} 
                    onGrant={() => setGrantModalOpen(true)} 
                    onEdit={() => setEditPatientOpen(true)} 
                    onAppt={() => setShowApptForm(true)} 
                    onDelete={() => setDeleteDialogOpen(true)} 
                    deletePending={deleteMutation.isPending}
                />
            </Suspense>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <Suspense fallback={<GeneralInfoSkeleton />}>
                        <PatientGeneralInfo id={id} />
                    </Suspense>
                </div>
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <Suspense fallback={<UpcomingAppointmentsSkeleton />}>
                        <PatientUpcomingAppointments id={id} />
                    </Suspense>
                    <Suspense fallback={<HistorySkeleton />}>
                        <PatientHistory id={id} />
                    </Suspense>

                </div>
            </div>

            <PatientDialogs 
                id={id}
                grantModalOpen={grantModalOpen} setGrantModalOpen={setGrantModalOpen}
                showApptForm={showApptForm} setShowApptForm={setShowApptForm}
                editPatientOpen={editPatientOpen} setEditPatientOpen={setEditPatientOpen}
                deleteDialogOpen={deleteDialogOpen} setDeleteDialogOpen={setDeleteDialogOpen}
                deleteMutation={deleteMutation}
            />
        </div>
    )
}

