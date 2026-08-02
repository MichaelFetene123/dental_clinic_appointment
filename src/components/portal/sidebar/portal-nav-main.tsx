"use client"

import { type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function PortalNavMain({
    items, name
}: {
    name?: string
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                {name && <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden"><span className="text-[16px]">{name}</span></SidebarGroupLabel>}
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className="py-1">
                            <SidebarMenuButton 
                                asChild 
                                tooltip={item.title} 
                                className="h-auto py-3 transition-all duration-200 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center"
                            >
                                <Link 
                                    href={item.url} 
                                    className="flex items-center gap-2 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:justify-center"
                                >
                                    {item.icon && <item.icon size={24} className="shrink-0" />}
                                    <span className="text-[16px] whitespace-normal leading-tight group-data-[collapsible=icon]:hidden">
                                        {item.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

