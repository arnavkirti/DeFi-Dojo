"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { WalletDefault } from "@coinbase/onchainkit/wallet";

const Navbar = () => {
  const { login, authenticated, user, logout } = usePrivy();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DeFi-Dojo
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </a>
            <a
              href="#roadmap"
              className="text-muted-foreground hover:text-foreground"
            >
              Roadmap
            </a>
            {authenticated ? (
              <Button
                variant="outline"
                onClick={logout}
                className="border-primary/20"
              >
                Disconnect
              </Button>
            ) : (
              <button
                 className=""
                onClick={login}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
