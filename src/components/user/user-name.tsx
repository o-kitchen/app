"use client";

import { Account } from "@lens-protocol/client";
import { cn } from "@/lib/utils";

interface UserNameProps {
  account?: Account;
  className?: string;
}

export const UserName = ({ account, className }: UserNameProps) => {
  const displayName = account?.metadata?.name || 
                     account?.username?.localName || 
                     "Anonymous";

  return (
    <span className={cn("text-sm font-medium", className)}>
      {displayName}
    </span>
  );
};
