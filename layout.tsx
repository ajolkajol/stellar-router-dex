import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Impor Provider resmi dari NPM Kit
import { WalletProvider, NetworkType } from "stellar-wallet-kit";

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
        {/* Membuka akses dompet digital ke seluruh halaman */}
        <WalletProvider
          config={{
            network: NetworkType.TESTNET,
            autoConnect: true,
          }}
        >
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
