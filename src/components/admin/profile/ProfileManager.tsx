"use client";

import { useState, useRef } from "react";
import { Image } from "@imagekit/next";
import { useProfile } from "@/hooks/use-profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CameraIcon, ShieldAlertIcon } from "lucide-react";
import { logoutAllDevices } from "@/lib/actions/auth/auth-actions";

type ProfileProps = {
  profile: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    isSuperAdmin: boolean;
    roles: string[];
  };
};

export function ProfileManager({ profile }: ProfileProps) {
  const {
    isPending,
    isAvatarUploading,
    handleUpdateProfile,
    handleChangePassword,
    handleUpdateAvatar,
    handleRemoveAvatar,
  } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const onAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpdateAvatar(file);
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateProfile(name, email, phone || null);
  };

  const onPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleChangePassword(currentPassword, newPassword, confirmPassword);
    // clear form on optimistic submit
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Tabs defaultValue="general" className="max-w-4xl">
      <TabsList className="mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal details and public avatar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 rounded-full border-2 bg-muted relative overflow-hidden">
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                  )}
                  {isAvatarUploading && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="animate-spin border-2 border-primary border-t-transparent rounded-full h-6 w-6"></span>
                    </div>
                  )}
                </Avatar>
                
                <div 
                  className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CameraIcon className="text-white h-6 w-6 mb-1" />
                  <span className="text-white text-xs">Change</span>
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={onAvatarFileChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isAvatarUploading}>
                  Upload new photo
                </Button>
                {profile.avatar && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90" onClick={handleRemoveAvatar} disabled={isPending || isAvatarUploading}>
                    Remove photo
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            <form id="profileForm" onSubmit={onProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Label>Assigned Roles</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.isSuperAdmin && (
                    <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">Super Admin</Badge>
                  )}
                  {profile.roles.map((role) => (
                    <Badge key={role} variant="secondary">{role}</Badge>
                  ))}
                  {!profile.isSuperAdmin && profile.roles.length === 0 && (
                    <span className="text-sm text-muted-foreground">No roles assigned</span>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-end border-t p-4 bg-muted/20">
            <Button type="submit" form="profileForm" disabled={isPending || isAvatarUploading}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Ensure your account is using a long, random password to stay secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="passwordForm" onSubmit={onPasswordSubmit} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </form>
            </CardContent>
            <CardFooter className="justify-end border-t p-4 bg-muted/20">
              <Button type="submit" form="passwordForm" disabled={isPending}>
                {isPending ? "Updating..." : "Update Password"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <ShieldAlertIcon className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Log out of all active sessions across all your devices. This cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="destructive" 
                onClick={() => logoutAllDevices(profile.id)}
              >
                Log out all devices
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
