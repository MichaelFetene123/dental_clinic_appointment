import { Suspense } from 'react'
import PatientDetailClient from './patient-detail-client'
import { notFound } from 'next/navigation'
import { requirePermission } from '@/lib/auth/guards'

async function PatientAuthGuard({ id }: { id: string }) {
    await requirePermission("patient.read");
    return <PatientDetailClient id={id} />
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Short-circuit non-CUID ids (e.g. favicon.ico requested by the browser)
    // CUIDs are 25 chars starting with 'c'. Avoids an unnecessary DB round-trip.
    if (!id || id.length < 10 || id.includes(".")) {
        notFound();
    }

    return (
        <Suspense fallback={<div className="p-8 text-muted-foreground">Loading patient details...</div>}>
            <PatientAuthGuard id={id} />
        </Suspense>
    )
}