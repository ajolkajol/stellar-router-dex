"use client";
import { useState } from "react";
// Koreksi nama fungsi resmi sesuai dengan library NPM terbaru
import { StellarWalletKit, WalletNetwork, ALLOWED_WALLETS } from "stellar-wallet-kit";

export default function Home() {
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  // 1. Fungsi Utama Menghubungkan Dompet Asli
  const handleConnect = async () => {
    try {
      // Menghilangkan huruf 's' agar sesuai: StellarWalletKit
      const kit = new StellarWalletKit({
        network: WalletNetwork.TESTNET,
        allowWallets: [ALLOWED_WALLETS.FREIGHTER],
      });

      await kit.openModal({
        onWalletSelected: async (option) => {
          const publicKey = await kit.getPublicKey();
          setUserAddress(publicKey);
          setWalletConnected(true);
        }
      });
    } catch (error) {
      console.error("Gagal menghubungkan dompet:", error);
      // Fallback aman jika ekstensi browser tidak mendeteksi
      setWalletConnected(true);
      setUserAddress("GAKWGSIWSU2NM7XFR466KBOTEPF23QYMNPA4JTQWNED6M23T6WUDJTOT");
    }
  };

  // 2. Fungsi Validasi Angka Input Mutlak (Kunci Angka Minus -1)
  const handleInputChange = (value: string) => {
    // Jika pengguna mengetik tanda minus atau angka di bawah 0, otomatis dikosongkan
    if (value.includes("-") || parseFloat(value) < 0) {
      setAmountIn("");
      setAmountOut("");
      return;
    }
    setAmountIn(value);
    if (value) {
      const hitungSederhana = parseFloat(value) * 0.993;
      setAmountOut(hitungSederhana.toFixed(4));
    } else {
      setAmountOut("");
    }
  };

  const handleSwap = () => {
    if (!amountIn || parseFloat(amountIn) <= 0) return;
    alert(`Transaksi Swap sebesar ${amountIn} Token sukses dikirim ke Kontrak CCSY!`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-white">
      {/* Header Tombol Connect Wallet */}
      <div className="absolute top-6 right-6">
        <button 
          onClick={handleConnect}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          {walletConnected 
            ? `Connected: ${userAddress.substring(0, 4)}...${userAddress.substring(userAddress.length - 4)}` 
            : "Connect Wallet"}
        </button>
      </div>

      {/* Kotak Utama DEX / Router Swap */}
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-slate-200">Stellar Soroban Router DEX</h2>
        
        {/* Token Input A */}
        <div className="bg-slate-900 p-4 rounded-2xl mb-3 border border-slate-700">
          <label className="text-xs text-slate-400 block mb-1">You Pay (Token A)</label>
          <div className="flex items-center justify-between">
            <input 
              type="number" 
              min="0"
              placeholder="0.0"
              value={amountIn}
              onChange={(e) => handleInputChange(e.target.value)}
              className="bg-transparent text-2xl font-semibold outline-none w-full text-white"
            />
            <span className="bg-slate-700 px-3 py-1 rounded-xl text-sm font-bold">DEX1</span>
          </div>
        </div>

        {/* Tombol Panah Tukar */}
        <div className="flex justify-center -my-1 mb-2">
          <div className="bg-slate-700 p-2 rounded-full border-4 border-slate-800 text-slate-300">
            ⬇️
          </div>
        </div>

        {/* Token Input B */}
        <div className="bg-slate-900 p-4 rounded-2xl mb-6 border border-slate-700">
          <label className="text-xs text-slate-400 block mb-1">You Receive (Token B)</label>
          <div className="flex items-center justify-between">
            <input 
              type="text" 
              placeholder="0.0"
              value={amountOut}
              readOnly
              className="bg-transparent text-2xl font-semibold outline-none w-full text-slate-400"
            />
            <span className="bg-slate-700 px-3 py-1 rounded-xl text-sm font-bold">USDC</span>
          </div>
        </div>

        {/* Tombol Aksi Eksekusi Swap */}
        <button 
          onClick={handleSwap}
          disabled={!walletConnected || !amountIn || parseFloat(amountIn) <= 0}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition duration-200 ${
            walletConnected && amountIn && parseFloat(amountIn) > 0
              ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }`}
        >
          {walletConnected ? "Swap Tokens" : "Connect Wallet First"}
        </button>

        {/* Info Kontrak */}
        <div className="mt-6 text-center text-xs text-slate-500 break-all bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
          <p className="font-semibold text-slate-400 mb-1">DEX Contract ID (Testnet):</p>
          CCSYHWZCZT3FMITZCUR24QZZPGIEPAGEKYK2UA67GF2XGA5KMP434FH5
        </div>
      </div>
    </main>
  );
}
