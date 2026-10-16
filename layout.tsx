import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletProviderComponents from "./wallet-provider-components";

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
        {/* Memanggil file pemisah khusus Client Component */}
        <WalletProviderComponents>
          {children}
        </WalletProviderComponents>
      </body>
    </html>
  );
}
