"use client"

import * as React from "react"

import {
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

export function TeamSwitcher() {
    const { } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/">
                    <Image
                        src={"/images/logo/logo-1.png"}
                        width={100}
                        height={100}
                        alt="logo"
                        className="bg-cover mb-3 transition-opacity hover:opacity-80"
                    />
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
