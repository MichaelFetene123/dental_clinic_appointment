"use client";

import React, { useState, useTransition } from "react";
import { RoleData, PermissionData } from "@/lib/actions/queries/role-queries";
import {
  createRole,
  updateRole,
  deleteRole,
} from "@/lib/actions/mutations/role-mutations";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function RolesManager({
  initialRoles,
  permissions,
}: {
  initialRoles: RoleData[];
  permissions: PermissionData[];
}) {
  const [isPending, startTransition] = useTransition();
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<Set<string>>(new Set());

  // Group permissions by resource
  const groupedPerms = permissions.reduce(
    (acc, p) => {
      if (!acc[p.resource]) acc[p.resource] = [];
      acc[p.resource].push(p);
      return acc;
    },
    {} as Record<string, PermissionData[]>,
  );

  const handleEdit = (role: RoleData) => {
    setEditingRoleId(role.id);
    setIsCreating(false);
    setName(role.name);
    setDescription(role.description || "");
    setSelectedPerms(new Set(role.permissionIds));
  };

  const handleCreateNew = () => {
    setEditingRoleId(null);
    setIsCreating(true);
    setName("");
    setDescription("");
    setSelectedPerms(new Set());
  };

  const cancelEdit = () => {
    setEditingRoleId(null);
    setIsCreating(false);
  };

  const togglePermission = (permId: string) => {
    const newSet = new Set(selectedPerms);
    if (newSet.has(permId)) newSet.delete(permId);
    else newSet.add(permId);
    setSelectedPerms(newSet);
  };

  const handleSave = async () => {
    startTransition(async () => {
      if (isCreating) {
        const result = await createRole(name, description, Array.from(selectedPerms));
        if (result.success) {
          toast.success(`Role "${name}" created successfully.`);
          setIsCreating(false);
        } else {
          toast.error(result.error);
        }
      } else if (editingRoleId) {
        const result = await updateRole(
          editingRoleId,
          name,
          description,
          Array.from(selectedPerms),
        );
        if (result.success) {
          toast.success(`Role "${name}" updated successfully.`);
          setEditingRoleId(null);
        } else {
          toast.error(result.error);
        }
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    startTransition(async () => {
      await deleteRole(id);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Roles & Permissions</h2>
          <p className="text-sm text-muted-foreground">
            Create, edit, and review roles and permissions.
          </p>
        </div>
        {!isCreating && !editingRoleId && (
          <Button onClick={handleCreateNew} disabled={isPending} className="sm:self-start">
            <Plus className="mr-2 h-4 w-4" /> New Role
          </Button>
        )}
      </div>

      {(isCreating || editingRoleId) && (
        <Card>
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg">
                  {isCreating ? "Create New Role" : "Edit Role"}
                </CardTitle>
                <CardDescription>
                  Define the role details and choose the permissions it should
                  have.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={cancelEdit}
                aria-label="Close role editor"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Senior Dentist"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Textarea
                  id="role-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description..."
                  className="min-h-24"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Permissions Matrix</h4>
                <p className="text-sm text-muted-foreground">
                  Toggle only the access this role should have.
                </p>
              </div>

              <ScrollArea className="h-[420px] rounded-lg border bg-muted/10 p-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {Object.entries(groupedPerms).map(([resource, perms]) => (
                    <Card key={resource} className="border-dashed">
                      <CardHeader className="space-y-2 pb-3">
                        <CardTitle className="text-sm capitalize">
                          {resource}
                        </CardTitle>
                        <CardDescription>
                          {perms.length} permission
                          {perms.length === 1 ? "" : "s"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        {perms.map((p) => (
                          <label
                            key={p.id}
                            className="flex items-start gap-3 rounded-md border border-transparent px-2 py-1.5 text-sm transition-colors hover:border-border hover:bg-background"
                          >
                            <Checkbox
                              checked={selectedPerms.has(p.id)}
                              onCheckedChange={() => togglePermission(p.id)}
                              className="mt-0.5"
                            />
                            <span className="flex-1 capitalize leading-5">
                              {p.action}
                            </span>
                          </label>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>

          <CardFooter className="justify-end gap-2 border-t px-6 py-4">
            <Button variant="outline" onClick={cancelEdit} disabled={isPending}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isPending || !name.trim()}>
              <Save className="mr-2 h-4 w-4" /> Save Role
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isCreating && !editingRoleId && (
        <div className="grid gap-4">
          {initialRoles.map((role) => (
            <Card key={role.id}>
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{role.name}</h3>
                    {role.isSystem && <Badge variant="secondary">System</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {role.description || "No description provided."}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">
                    {role.permissionIds.length} permissions assigned
                  </p>
                </div>

                <div className="flex gap-2 self-start md:self-auto">
                  {!role.isSystem && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(role)}
                      >
                        <Edit2 className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(role.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {initialRoles.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No custom roles found.
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
