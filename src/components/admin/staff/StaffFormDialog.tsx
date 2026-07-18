"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StaffForm } from "./StaffForm";
import { RoleData } from "@/lib/actions/queries/role-queries";

export function StaffFormDialog({ roles }: { roles: RoleData[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Add Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
          <DialogDescription>
            Create a new staff member account. They will use their email to log in.
          </DialogDescription>
        </DialogHeader>
        <StaffForm roles={roles} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
