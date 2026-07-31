import PortalUsersClient from "./portal-users-client";
import { requirePermission } from "@/lib/auth/guards";

export default async function PortalUsersPage() {
    await requirePermission("portal_users.read");
    return <PortalUsersClient />;
}
