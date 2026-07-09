"use client"

import React from 'react'
import { StaffTable } from '@/components/admin/staff/StaffTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StaffPage() {
    return (
        <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="flex justify-between mt-3">
                <div>
                    <h1 className="text-2xl font-semibold">Staff Management</h1>
                    <p className="text-muted-foreground">Manage your clinic's doctors, receptionists, and administrative staff.</p>
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>All Staff Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <StaffTable />
                </CardContent>
            </Card>
        </div>
    )
}
