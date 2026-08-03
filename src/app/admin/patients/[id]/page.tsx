import PatientDetailClient from './patient-detail-client'
import { notFound } from 'next/navigation'
import { requirePermission, ForbiddenError } from '@/lib/auth/guards'

async function PatientAuthGuard({ id }: { id: string }) {
    try {
        await requirePermission("patient.read");
        return <PatientDetailClient id={id} />
    } catch (e) {
        if (e instanceof ForbiddenError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] bg-muted/20 border rounded-lg m-6 p-12 text-center">
                    <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                    <p className="text-muted-foreground">You do not have permission to view patient details.</p>
                </div>
            )
        }
        throw e;
    }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Short-circuit non-CUID ids (e.g. favicon.ico requested by the browser)
    // CUIDs are 25 chars starting with 'c'. Avoids an unnecessary DB round-trip.
    if (!id || id.length < 10 || id.includes(".")) {
        notFound();
    }

    return <PatientAuthGuard id={id} />;
}