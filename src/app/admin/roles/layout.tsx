import { redirectIfMissingPermission } from "@/lib/auth/guards";

export default async function RolesLayout({ children }: { children: React.ReactNode }) {
    await redirectIfMissingPermission("staff.manage");
    return <>{children}</>;
}
