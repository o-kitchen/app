"use client";

import { Account } from "@lens-protocol/client";
import { cn } from "@/lib/utils";

interface UserUsernameProps {
  account?: Account;
  className?: string;
}

export const UserUsername = ({ account, className }: UserUsernameProps) => {
  const username = account?.username?.localName;

  if (!username) {
    return null;
  }

  return (
    <span className={cn("text-sm text-muted-foreground", className)}>
      @{username}
    </span>
  );
};
