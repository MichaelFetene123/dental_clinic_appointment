import { redirectIfMissingPermission } from "@/lib/auth/guards";

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
    await redirectIfMissingPermission("staff.read");
    return <>{children}</>;
}
