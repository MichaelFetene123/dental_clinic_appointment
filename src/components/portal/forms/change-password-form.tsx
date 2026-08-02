"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/use-profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";

export function ChangePasswordForm() {
    const { handleChangePassword, isPending } = useProfile();
    const router = useRouter();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ currentPassword?: string; newPassword?: string; confirmPassword?: string }>({});

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const result = await handleChangePassword(currentPassword, newPassword, confirmPassword);
        
        if (!result) {
            // Success: password changed and sessions revoked.
            // Redirect to login page to re-authenticate.
            router.push("/login");
            return;
        }

        if (result.confirmError) {
            setErrors({ confirmPassword: result.confirmError });
        } else if (result.serverError) {
            setErrors({ currentPassword: result.serverError });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Update your password. Upon a successful change, you will be logged out of all active sessions and required to log in again.
                </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => {
                                setCurrentPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, currentPassword: undefined }));
                            }}
                            required
                        />
                        {errors.currentPassword && (
                            <p className="text-sm font-medium text-destructive">{errors.currentPassword}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <PasswordInput
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, newPassword: undefined }));
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <PasswordInput
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                            }}
                            required
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm font-medium text-destructive">{errors.confirmPassword}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="justify-end border-t p-4 bg-muted/20">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Updating..." : "Update Password"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
