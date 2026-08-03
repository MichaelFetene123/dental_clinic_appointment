import { redirectIfMissingPermission } from "@/lib/auth/guards";

export default async function PortalUsersLayout({ children }: { children: React.ReactNode }) {
    await redirectIfMissingPermission("portal_users.read");
    return <>{children}</>;
}
