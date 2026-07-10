import { Suspense } from 'react';
import ClientPage from './client-page';
import Layout from '@/components/layout/Layout';

export default function AppointmentPage() {
    return (
        <Suspense fallback={<Layout><div className="flex justify-center items-center min-h-[50vh]">Loading appointment form...</div></Layout>}>
            <ClientPage />
        </Suspense>
    );
}
