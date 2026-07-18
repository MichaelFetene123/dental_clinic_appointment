import { requirePatientAuth } from "@/lib/auth/guards";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function PortalProfilePage() {
    const { patient } = await requirePatientAuth();

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and contact details.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input value={patient.name} readOnly disabled />
                        <p className="text-xs text-muted-foreground">To change your name, please contact the clinic.</p>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={patient.email || ""} readOnly disabled />
                    </div>

                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input value={patient.phone || ""} readOnly disabled />
                    </div>

                    <Button disabled className="mt-4">Update Profile (Coming Soon)</Button>
                </CardContent>
            </Card>
        </div>
    );
}
