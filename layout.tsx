import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Impor Provider dan file CSS resmi agar pop-up modal pilihan dompet bisa muncul ke layar
import { WalletProvider, NetworkType } from "stellar-wallet-kit";
import "stellar-wallet-kit/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stellar Soroban Router DEX",
  description: "MVP Router DEX on Stellar Testnet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider
          config={{
            network: NetworkType.TESTNET,
            autoConnect: true,
            theme: {
              mode: "dark",
              primaryColor: "#8b5cf6",
              borderRadius: "16px",
            },
          }}
        >
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
