import { Suspense } from "react";
import { requirePatientAuth } from "@/lib/auth/guards";
import Link from "next/link";
import { Calendar, FileText, Activity, User, LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth/auth-actions";
import { Button } from "@/components/ui/button";

async function PortalLayoutContent({ children }: { children: React.ReactNode }) {
    const { session, patient } = await requirePatientAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-6">
                        <Link href="/portal" className="font-bold text-xl text-primary">
                            Patient Portal
                        </Link>
                        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                            <Link href="/portal" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Appointments
                            </Link>
                            <Link href="/portal/history" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Dental History
                            </Link>
                            <Link href="/portal/documents" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Documents
                            </Link>
                            <Link href="/portal/profile" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                                <User className="h-4 w-4" /> Profile
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:inline-block">Welcome, {patient.name}</span>
                        <form action={logout}>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-background"><div className="animate-pulse text-lg text-muted-foreground">Loading portal...</div></div>}>
            <PortalLayoutContent>{children}</PortalLayoutContent>
        </Suspense>
    );
}
