"use client";

import React, { useState, useTransition } from "react";
import { RoleData, PermissionData } from "@/lib/actions/queries/role-queries";
import { createRole, updateRole, deleteRole } from "@/lib/actions/mutations/role-mutations";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const groupedPerms = permissions.reduce((acc, p) => {
    if (!acc[p.resource]) acc[p.resource] = [];
    acc[p.resource].push(p);
    return acc;
  }, {} as Record<string, PermissionData[]>);

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
        await createRole(name, description, Array.from(selectedPerms));
        setIsCreating(false);
      } else if (editingRoleId) {
        await updateRole(editingRoleId, name, description, Array.from(selectedPerms));
        setEditingRoleId(null);
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Roles & Permissions</h2>
        {!isCreating && !editingRoleId && (
          <Button onClick={handleCreateNew} disabled={isPending}>
            <Plus className="w-4 h-4 mr-2" /> New Role
          </Button>
        )}
      </div>

      {(isCreating || editingRoleId) && (
        <div className="border border-border p-6 rounded-xl bg-card shadow-sm space-y-6">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">
              {isCreating ? "Create New Role" : "Edit Role"}
            </h3>
            <Button variant="ghost" size="sm" onClick={cancelEdit}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role Name</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Senior Dentist"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description..."
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Permissions Matrix</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(groupedPerms).map(([resource, perms]) => (
                <div key={resource} className="border rounded-lg p-4 bg-muted/20">
                  <h5 className="font-semibold capitalize mb-3 text-primary border-b pb-2">
                    {resource}
                  </h5>
                  <div className="flex flex-col gap-2">
                    {perms.map((p) => (
                      <label key={p.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedPerms.has(p.id)}
                          onChange={() => togglePermission(p.id)}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="capitalize">{p.action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={cancelEdit} disabled={isPending}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isPending || !name.trim()}>
              <Save className="w-4 h-4 mr-2" /> Save Role
            </Button>
          </div>
        </div>
      )}

      {!isCreating && !editingRoleId && (
        <div className="grid grid-cols-1 gap-4">
          {initialRoles.map((role) => (
            <div key={role.id} className="flex items-center justify-between p-5 border rounded-xl bg-card hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {role.name}
                  {role.isSystem && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                      System
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {role.description || "No description provided."}
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  {role.permissionIds.length} permissions assigned
                </p>
              </div>
              <div className="flex gap-2">
                {!role.isSystem && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(role)}>
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(role.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
          {initialRoles.length === 0 && (
            <div className="p-8 text-center border rounded-xl text-muted-foreground">
              No custom roles found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
