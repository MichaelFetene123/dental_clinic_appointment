"use client";

import React, { createContext, useContext } from "react";

type PermissionContextType = {
  permissions: string[];
  isSuperAdmin: boolean;
  hasPermission: (action: string) => boolean;
};

const PermissionContext = createContext<PermissionContextType | null>(null);

export function PermissionProvider({
  children,
  permissions,
  isSuperAdmin,
}: {
  children: React.ReactNode;
  permissions: string[];
  isSuperAdmin: boolean;
}) {
  const hasPermission = (action: string) => {
    if (isSuperAdmin) return true;
    return permissions.includes(action);
  };

  return (
    <PermissionContext.Provider value={{ permissions, isSuperAdmin, hasPermission }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
}
