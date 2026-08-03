import { redirectIfMissingPermission } from "@/lib/auth/guards";

export default async function AppointmentLayout({ children }: { children: React.ReactNode }) {
    await redirectIfMissingPermission("appointment.read");
    return <>{children}</>;
}
