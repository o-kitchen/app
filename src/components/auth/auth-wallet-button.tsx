"use client";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";

interface ConnectWalletButtonProps {
  text: string;
  className?: string;
}

export const ConnectWalletButton = ({ text = "Login", className }: ConnectWalletButtonProps) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        if (!isConnected) {
          return (
            <Button 
              variant="neon" 
              onClick={show} 
              className={`font-semibold ${className}`}
            >
              {text}
            </Button>
          );
        }
      }}
    </ConnectKitButton.Custom>
  );
};
