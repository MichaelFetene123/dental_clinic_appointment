import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PatientNotFound() {
    return (
        <div className='flex flex-col items-center justify-center h-96 gap-4 text-center'>
            <h1 className="text-2xl font-bold">Patient Not Found</h1>
            <p className="text-muted-foreground">The patient record you are looking for does not exist or has been removed.</p>
            <Button asChild variant="outline">
                <Link href="/admin/patients">Back to Patients</Link>
            </Button>
        </div>
    )
}
