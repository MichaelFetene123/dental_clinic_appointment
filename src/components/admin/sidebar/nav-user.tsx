"use client"

import {
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
    MoreVerticalIcon,
    UserCircleIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Image } from "@imagekit/next"
import Link from "next/link"
import { logout } from "@/lib/actions/auth/auth-actions"

export function NavUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { isMobile } = useSidebar()

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg relative overflow-hidden bg-muted">
                                {user.avatar ? (
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width={32}
                                        height={32}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <AvatarFallback className="rounded-lg bg-transparent">{initials}</AvatarFallback>
                                )}
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                            <MoreVerticalIcon className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg relative overflow-hidden bg-muted">
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={32}
                                            height={32}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <AvatarFallback className="rounded-lg bg-transparent">{initials}</AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/admin/profile" className="w-full cursor-pointer">
                                    <UserCircleIcon className="mr-2" />
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            
                            {/* <DropdownMenuItem>
                                <CreditCardIcon className="mr-2" />
                                Billing
                            </DropdownMenuItem> */}

                            {/* <DropdownMenuItem>
                                <BellIcon className="mr-2" />
                                Notifications
                            </DropdownMenuItem> */}

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                            <LogOutIcon className="mr-2" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
