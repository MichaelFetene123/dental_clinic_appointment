import React, { Suspense } from 'react'
import { StaffTable } from '@/components/admin/staff/StaffTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StaffFormDialog } from '@/components/admin/staff/StaffFormDialog'
import { getRoles } from '@/lib/actions/queries/role-queries'
import { DataTableSkeleton } from '@/components/skeleton/DataTableSkeleton'

async function StaffContent() {
    const roles = await getRoles();

    return (
        <>
            <div className="flex justify-end mb-4">
                <StaffFormDialog roles={roles} />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Staff Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <StaffTable roles={roles} />
                </CardContent>
            </Card>
        </>
    );
}

export default function StaffPage() {
    return (
        <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="mt-3">
                <h1 className="text-2xl font-semibold">Staff Management</h1>
                <p className="text-muted-foreground">Manage your clinic's doctors, receptionists, and administrative staff.</p>
            </div>
            
            <Suspense fallback={
                <Card className="mt-14">
                    <CardHeader>
                        <CardTitle>All Staff Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTableSkeleton columnCount={4} rowCount={5} />
                    </CardContent>
                </Card>
            }>
                <StaffContent />
            </Suspense>
        </div>
    )
}
