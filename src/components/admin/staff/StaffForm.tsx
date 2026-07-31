"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateStaff, useUpdateStaff } from "@/hooks/use-staff";
import { RoleData } from "@/lib/actions/queries/role-queries";
import { StaffRow } from "@/lib/actions/queries/staff-queries";
import { DialogFooter } from "@/components/ui/dialog";

interface StaffFormProps {
  roles: RoleData[];
  onSuccess: () => void;
  staff?: StaffRow;
}

export function StaffForm({ roles, onSuccess, staff }: StaffFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const createMutation = useCreateStaff(onSuccess);
  const updateMutation = useUpdateStaff(onSuccess);
  const mutation = staff ? updateMutation : createMutation;
  const pending = mutation.isPending;

  // Find the role ID based on the staff's current role names
  const defaultRoleId =
    staff && staff.roles.length > 0
      ? roles.find((r) => staff.roles.includes(r.name))?.id
      : undefined;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {staff && <input type="hidden" name="id" value={staff.id} />}

      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input
          name="name"
          required
          placeholder="Jane Doe"
          disabled={pending}
          defaultValue={staff?.name}
        />
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input
          name="email"
          type="email"
          required
          placeholder="jane@clinic.com"
          disabled={pending}
          defaultValue={staff?.email}
        />
      </Field>

      <Field>
        <FieldLabel>Phone</FieldLabel>
        <Input
          name="phone"
          type="tel"
          placeholder="555-1234"
          disabled={pending}
          defaultValue={staff?.phone !== "N/A" ? staff?.phone : ""}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Department</FieldLabel>
          <Select
            name="department"
            required
            disabled={pending}
            defaultValue={
              staff?.department !== "N/A" ? staff?.department : undefined
            }
          >
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
          <Input
            name="position"
            required
            placeholder="e.g. Dentist"
            disabled={pending}
            defaultValue={staff?.position !== "N/A" ? staff?.position : ""}
          />
        </Field>
      </div>

      <Field>
        <FieldLabel>System Role</FieldLabel>
        <Select
          name="roleId"
          required
          disabled={pending}
          defaultValue={defaultRoleId}
        >
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
          {pending
            ? staff
              ? "Updating..."
              : "Creating..."
            : staff
            ? "Update Staff Member"
            : "Create Staff Member"}
        </Button>
      </DialogFooter>
    </form>
  );
}
