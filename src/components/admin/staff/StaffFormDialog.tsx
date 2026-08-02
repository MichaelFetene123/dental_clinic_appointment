"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { StaffForm } from "./StaffForm";
import { RoleData } from "@/lib/actions/queries/role-queries";
import { usePermissions } from "@/components/providers/PermissionProvider";

export function StaffFormDialog({ roles }: { roles: RoleData[] }) {
  const [open, setOpen] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { hasPermission } = usePermissions();

  if (!hasPermission("staff.create")) return null;

  const handleCopy = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setTempPassword(null);
      setCopied(false);
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" onClick={() => setOpen(true)}>
          <Plus size={16} /> Add Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{tempPassword ? "Staff Created Successfully" : "Add New Staff"}</DialogTitle>
          <DialogDescription>
            {tempPassword
              ? "A temporary password has been generated. Please share it with the staff member so they can log in."
              : "Create a new staff member account. They will use their email to log in."}
          </DialogDescription>
        </DialogHeader>
        
        {tempPassword ? (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
              <code className="flex-1 text-sm font-mono">{tempPassword}</code>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={handleClose}>Done</Button>
            </DialogFooter>
          </div>
        ) : (
          <StaffForm 
            roles={roles} 
            onSuccess={(pwd) => {
              if (pwd) {
                setTempPassword(pwd);
              } else {
                handleClose();
              }
            }} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
