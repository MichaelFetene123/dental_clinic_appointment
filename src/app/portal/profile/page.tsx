import { requirePatientAuth } from "@/lib/auth/guards";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangePasswordForm } from "@/components/portal/forms/change-password-form";

export default async function PortalProfilePage() {
    const { patient } = await requirePatientAuth();

    return (
        <div className="flex flex-col gap-5 py-4 md:gap-6 md:py-6 px-4 lg:px-6 space-y-6 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="general" className="max-w-4xl">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4 max-w-xl">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input value={patient.name} readOnly disabled />
                                    <p className="text-xs text-muted-foreground">To change your name, please contact the clinic.</p>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input value={patient.email || ""} readOnly disabled />
                                </div>

                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input value={patient.phone || ""} readOnly disabled />
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="justify-end border-t p-4 bg-muted/20">
                            <Button disabled>Update Profile (Coming Soon)</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <div className="space-y-6">
                        <ChangePasswordForm />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
