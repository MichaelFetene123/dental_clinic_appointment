import { Suspense } from 'react';
import PatientDetailClient from './patient-detail-client'

async function PatientDetailWrapper({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PatientDetailClient id={id} />
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div className="p-6">Loading patient data...</div>}>
            <PatientDetailWrapper params={params} />
        </Suspense>
    )
}