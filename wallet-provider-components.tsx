"use client";
import React from "react";
import { WalletProvider, NetworkType } from "stellar-wallet-kit";

export default function WalletProviderComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider
      config={{
        network: NetworkType.TESTNET,
        autoConnect: true,
      }}
    >
      {children}
    </WalletProvider>
  );
}
