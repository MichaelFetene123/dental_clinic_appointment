"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { grantPortalAccess, revokePortalAccess } from "@/lib/actions/mutations/portal-mutations";
import { CopyIcon, CheckIcon } from "lucide-react";

interface GrantAccessModalProps {
  patientId: string;
  patientName: string;
  defaultEmail: string | null;
  hasAccess: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GrantAccessModal({
  patientId,
  patientName,
  defaultEmail,
  hasAccess,
  open,
  onOpenChange,
}: GrantAccessModalProps) {
  const [email, setEmail] = useState(defaultEmail || "");
  const [loading, setLoading] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGrant = async () => {
    if (!email) {
      toast.error("Email is required for portal access");
      return;
    }

    setLoading(true);
    try {
      const res = await grantPortalAccess(patientId, email);
      if (res.success) {
        toast.success("Portal access granted successfully");
        if (res.tempPassword) {
          setTempPassword(res.tempPassword);
        } else {
          onOpenChange(false);
        }
      } else {
        toast.error(res.error || "Failed to grant access");
      }
    } catch (e) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async () => {
    setLoading(true);
    try {
      const res = await revokePortalAccess(patientId);
      if (res.success) {
        toast.success("Portal access revoked successfully");
        onOpenChange(false);
      } else {
        toast.error(res.error || "Failed to revoke access");
      }
    } catch (e) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
        if (!val) setTempPassword(null);
        onOpenChange(val);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{hasAccess ? "Manage Portal Access" : "Grant Portal Access"}</DialogTitle>
          <DialogDescription>
            {hasAccess
              ? `Manage online portal access for ${patientName}.`
              : `Create an online portal account for ${patientName}. They will use this to log in.`}
          </DialogDescription>
        </DialogHeader>

        {hasAccess ? (
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              This patient currently has active portal access. If you revoke it, they will no longer be able to log in.
            </p>
            <Button variant="destructive" className="w-full" onClick={handleRevoke} disabled={loading}>
              {loading ? "Revoking..." : "Revoke Access"}
            </Button>
          </div>
        ) : tempPassword ? (
          <div className="py-4 flex flex-col gap-4">
            <div className="bg-green-50 text-green-900 border border-green-200 p-3 rounded-md text-sm">
              Account created successfully! Please securely share this temporary password with the patient.
            </div>
            <div className="flex flex-col gap-2">
              <Label>Temporary Password</Label>
              <div className="flex gap-2">
                <Input value={tempPassword} readOnly className="font-mono text-lg" />
                <Button size="icon" variant="outline" onClick={handleCopy}>
                  {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button onClick={() => onOpenChange(false)} className="mt-2">
              Done
            </Button>
          </div>
        ) : (
          <div className="py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
              />
              <p className="text-xs text-muted-foreground">
                If this email is already registered, the existing account will be linked.
              </p>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleGrant} disabled={loading}>
                {loading ? "Granting..." : "Grant Access"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
