"use client";

import { useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createStaff } from "@/lib/actions/mutations/staff-mutations";
import { RoleData } from "@/lib/actions/queries/role-queries";
import { DialogFooter } from "@/components/ui/dialog";
import { queryKeys } from "@/lib/queryKeys";

interface StaffFormProps {
  roles: RoleData[];
  onSuccess: () => void;
}

export function StaffForm({ roles, onSuccess }: StaffFormProps) {
  const queryClient = useQueryClient();
  const [state, formAction, pending] = useActionState(createStaff, { success: false, error: "" });

  useEffect(() => {
    if (state.success) {
      toast.success("Staff member created successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.staff.all });
      onSuccess();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, onSuccess, queryClient]);

  return (
    <form action={formAction} className="space-y-4">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input name="name" required placeholder="Jane Doe" disabled={pending} />
      </Field>
      
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input name="email" type="email" required placeholder="jane@clinic.com" disabled={pending} />
      </Field>
      
      <Field>
        <FieldLabel>Phone</FieldLabel>
        <Input name="phone" type="tel" required placeholder="555-1234" disabled={pending} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Department</FieldLabel>
          <Select name="department" required disabled={pending}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Clinical">Clinical</SelectItem>
              <SelectItem value="Administration">Administration</SelectItem>
              <SelectItem value="Hygiene">Hygiene</SelectItem>
              <SelectItem value="Orthodontics">Orthodontics</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Position</FieldLabel>
          <Input name="position" required placeholder="e.g. Dentist" disabled={pending} />
        </Field>
      </div>

      <Field>
        <FieldLabel>System Role</FieldLabel>
        <Select name="roleId" required disabled={pending}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <DialogFooter className="pt-4">
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Creating..." : "Create Staff Member"}
        </Button>
      </DialogFooter>
    </form>
  );
}
