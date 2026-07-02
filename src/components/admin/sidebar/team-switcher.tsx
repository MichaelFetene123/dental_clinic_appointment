"use client"

import * as React from "react"

import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function TeamSwitcher() {
    const { } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Image
                            src={"/images/logo/logo-1.png"}
                            width={100}
                            height={100}
                            alt="logo"
                            className="bg-cover mb-3"
                        />
                    </DropdownMenuTrigger>

                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
