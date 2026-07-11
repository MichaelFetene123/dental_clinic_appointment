"use client"

import { AppointmentTable } from "@/components/admin/appointment/appointment-table"

export default function Archive() {
    return <AppointmentTable statusFilter="COMPLETED" />
}