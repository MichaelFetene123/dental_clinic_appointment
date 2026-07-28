"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

import { queryKeys } from "@/lib/queryKeys";
import { getPortalUsers, type PortalUserRow } from "@/lib/actions/queries/portal-user-queries";
import {
  updatePortalUserEmail,
  resetPortalUserPassword,
  unlinkPortalUser,
  deletePortalUser,
} from "@/lib/actions/mutations/portal-user-mutations";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePermissions } from "@/components/providers/PermissionProvider";
import {
  MoreHorizontal,
  Users,
  Mail,
  Key,
  Unlink,
  Trash2,
  Search,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";

// ─── Hooks ───────────────────────────────────────────────────────────────────

function usePortalUsers() {
  return useQuery({
    queryKey: queryKeys.portalUsers.lists(),
    queryFn: () => getPortalUsers(),
    staleTime: 30_000,
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function EditEmailDialog({
  user,
  open,
  onOpenChange,
}: {
  user: PortalUserRow;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [email, setEmail] = useState(user.email);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updatePortalUserEmail(user.id, email),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Email updated successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.portalUsers.all });
      onOpenChange(false);
    },
    onError: () => toast.error("Failed to update email"),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Update Portal Email</DialogTitle>
          <DialogDescription>
            Change the login email for <span className="font-semibold">{user.name}</span>'s portal account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="portal-email">Email Address</Label>
            <Input
              id="portal-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@email.com"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={() => mutate()} disabled={isPending || !email.trim()}>
            {isPending ? "Saving…" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ResetPasswordDialog({
  user,
  open,
  onOpenChange,
}: {
  user: PortalUserRow;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => resetPortalUserPassword(user.id),
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setTempPassword(res.data?.tempPassword ?? null);
      queryClient.invalidateQueries({ queryKey: queryKeys.portalUsers.all });
    },
    onError: () => toast.error("Failed to reset password"),
  });

  const handleCopy = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setTempPassword(null);
    setCopied(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            A new temporary password will be generated for{" "}
            <span className="font-semibold">{user.name}</span>. All current sessions will be revoked.
          </DialogDescription>
        </DialogHeader>

        {tempPassword ? (
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              Share this password with the patient. They can change it after logging in.
            </p>
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
          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => mutate()} disabled={isPending}>
              {isPending ? "Resetting…" : "Reset Password"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Row Actions ─────────────────────────────────────────────────────────────

type RowAction =
  | { type: "editEmail"; user: PortalUserRow }
  | { type: "resetPassword"; user: PortalUserRow }
  | { type: "unlink"; user: PortalUserRow }
  | { type: "delete"; user: PortalUserRow };

function PortalUserRowActions({ user }: { user: PortalUserRow }) {
  const [action, setAction] = useState<RowAction | null>(null);
  const queryClient = useQueryClient();
  const { hasPermission, isSuperAdmin } = usePermissions();

  const canEdit = isSuperAdmin || hasPermission("patient.edit");
  const canDelete = isSuperAdmin || hasPermission("patient.delete");

  const { mutate: unlink, isPending: isUnlinking } = useMutation({
    mutationFn: () => unlinkPortalUser(user.id),
    onSuccess: (res) => {
      if (!res.success) { toast.error(res.error); return; }
      toast.success("Portal account unlinked. Patient record preserved.");
      queryClient.invalidateQueries({ queryKey: queryKeys.portalUsers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      setAction(null);
    },
    onError: () => toast.error("Failed to unlink portal account"),
  });

  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePortalUser(user.id),
    onSuccess: (res) => {
      if (!res.success) { toast.error(res.error); return; }
      toast.success("Portal account deleted. Patient record preserved.");
      queryClient.invalidateQueries({ queryKey: queryKeys.portalUsers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      setAction(null);
    },
    onError: () => toast.error("Failed to delete portal account"),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {canEdit && (
            <>
              <DropdownMenuItem onClick={() => setAction({ type: "editEmail", user })} className="gap-2">
                <Mail className="h-4 w-4" />
                Update Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAction({ type: "resetPassword", user })} className="gap-2">
                <Key className="h-4 w-4" />
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAction({ type: "unlink", user })} className="gap-2 text-orange-600 focus:text-orange-600">
                <Unlink className="h-4 w-4" />
                Unlink Account
              </DropdownMenuItem>
            </>
          )}
          {canDelete && (
            <DropdownMenuItem onClick={() => setAction({ type: "delete", user })} className="gap-2 text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete Account
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Email Dialog */}
      {action?.type === "editEmail" && (
        <EditEmailDialog
          user={action.user}
          open
          onOpenChange={(v) => !v && setAction(null)}
        />
      )}

      {/* Reset Password Dialog */}
      {action?.type === "resetPassword" && (
        <ResetPasswordDialog
          user={action.user}
          open
          onOpenChange={(v) => !v && setAction(null)}
        />
      )}

      {/* Unlink Confirm */}
      {action?.type === "unlink" && (
        <AlertDialog open onOpenChange={(v) => !v && setAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unlink Portal Account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove <span className="font-semibold">{user.name}</span>'s ability to log into the patient portal.
                Their <strong>patient record will remain intact</strong>. This action cannot be undone without re-granting access.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isUnlinking}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => unlink()}
                disabled={isUnlinking}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isUnlinking ? "Unlinking…" : "Unlink Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Confirm */}
      {action?.type === "delete" && (
        <AlertDialog open onOpenChange={(v) => !v && setAction(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Portal Account?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <span className="font-semibold">{user.name}</span>'s portal account.
                Their <strong>patient record will remain intact</strong>. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => remove()}
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90 text-white"
              >
                {isDeleting ? "Deleting…" : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function PortalUsersClient() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = usePortalUsers();

  const filtered = (data?.data ?? []).filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.patient?.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = (data?.data ?? []).filter((u) => u.hasActiveSession).length;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portal Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage patient portal accounts — update emails, reset passwords, or revoke access.
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="gap-1.5 h-9 px-3 text-sm">
            <Users className="h-4 w-4" />
            {data?.total ?? 0} Total
          </Badge>
          <Badge variant="secondary" className="gap-1.5 h-9 px-3 text-sm text-green-700 bg-green-50 border border-green-200">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {activeCount} Active Sessions
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="portal-user-search"
          placeholder="Search by name or email…"
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Portal Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  {search ? "No portal users match your search." : "No portal users found."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((user) => (
                <TableRow key={user.id} className="group">
                  {/* Patient Name */}
                  <TableCell>
                    {user.patient ? (
                      <Link
                        href={`/admin/patients/${user.patient.id}`}
                        className="font-medium text-foreground hover:text-primary hover:underline transition-colors"
                      >
                        {user.patient.name}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground italic">No patient linked</span>
                    )}
                    {user.patient?.phone && (
                      <p className="text-xs text-muted-foreground mt-0.5">{user.patient.phone}</p>
                    )}
                  </TableCell>

                  {/* Portal Email */}
                  <TableCell>
                    <span className="text-sm">{user.email}</span>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {user.hasActiveSession ? (
                      <Badge variant="outline" className="gap-1.5 text-green-700 border-green-300 bg-green-50">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1.5 text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(user.createdAt), "MMM dd, yyyy")}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <PortalUserRowActions user={user} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
