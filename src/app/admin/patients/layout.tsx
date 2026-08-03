import { redirectIfMissingPermission } from "@/lib/auth/guards";

export default async function PatientsLayout({ children }: { children: React.ReactNode }) {
    await redirectIfMissingPermission("patient.read");
    return <>{children}</>;
}
