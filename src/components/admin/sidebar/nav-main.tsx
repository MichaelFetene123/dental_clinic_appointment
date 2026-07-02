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

export function NavMain({
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
                {name && <SidebarGroupLabel><span className="text-[16px]">{name}</span></SidebarGroupLabel>}
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className="py-2">
                            <SidebarMenuButton tooltip={item.title} className="py-3">
                                <Link href={item.url.startsWith('/admin') ? item.url : `/admin${item.url}`} className="flex items-center gap-2 py-3">
                                    {item.icon && <item.icon size={24} className=""/>}
                                    <span className="text-[16px]">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
