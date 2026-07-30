"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { SystemUser, SystemModule, PermissionAction } from "@/data/types";
import { currentUserSimulated } from "@/data/current-user";
import { hasPermission } from "@/lib/permissions";

interface CurrentUserContextType {
  currentUser: SystemUser;
  can: (module: SystemModule, action: PermissionAction) => boolean;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [currentUser] = useState<SystemUser>(currentUserSimulated);

  const can = (module: SystemModule, action: PermissionAction): boolean => {
    return hasPermission(currentUser, module, action);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, can }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
}
