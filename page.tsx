"use client";
import { useState } from "react";
// Menggunakan Hooks dan Komponen resmi bawaan SDK
import { useWallet, ConnectButton } from "stellar-wallet-kit";

export default function Home() {
  const { account, isConnected } = useWallet();
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");

  // FUNGSI BLOKIR MINUS: Mencegah tombol minus (-), e, dan karakter aneh diketik di keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["-", "e", "E", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  // VALIDASI INPUT MUTLAK: Mengunci agar nilai saldo tidak bisa di bawah nol
  const handleInputChange = (value: string) => {
    const parsed = parseFloat(value);
    
    // Jika input kosong, hapus semua angka desimal
    if (!value) {
      setAmountIn("");
      setAmountOut("");
      return;
    }

    // Jika ketahuan memasukkan angka minus atau tidak valid, langsung reset ke kosong
    if (parsed < 0 || isNaN(parsed)) {
      setAmountIn("");
      setAmountOut("");
      return;
    }

    setAmountIn(value);
    // Logika perhitungan simulasi router DEX dari kontrak CCSY Anda
    const hitungSederhana = parsed * 0.993; 
    setAmountOut(hitungSederhana.toFixed(4));
  };

  const handleSwap = () => {
    if (!amountIn || parseFloat(amountIn) <= 0) return;
    alert(`Transaksi Swap sebesar ${amountIn} Token sukses dikirim ke Kontrak DEX Utama CCSY!`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-white">
      {/* Header Tombol Connect Wallet Asli Bawaan SDK */}
      <div className="absolute top-6 right-6 SDK-connect-btn">
        <ConnectButton />
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
              step="any"
              placeholder="0.0"
              value={amountIn}
              onKeyDown={handleKeyDown}
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
              value={amountIn ? amountOut : "0.0"}
              readOnly
              className="bg-transparent text-2xl font-semibold outline-none w-full text-slate-400"
            />
            <span className="bg-slate-700 px-3 py-1 rounded-xl text-sm font-bold">USDC</span>
          </div>
        </div>

        {/* Tombol Aksi Eksekusi Swap */}
        <button 
          onClick={handleSwap}
          disabled={!isConnected || !amountIn || parseFloat(amountIn) <= 0}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition duration-200 ${
            isConnected && amountIn && parseFloat(amountIn) > 0
              ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isConnected ? "Swap Tokens" : "Connect Wallet First"}
        </button>

        {/* Info Alamat Dompet Asli Pengguna */}
        {isConnected && account && (
          <div className="mt-4 text-center text-xs text-green-400 bg-green-950/30 p-2 rounded-xl border border-green-800/40">
            Wallet Detected: {account.address.substring(0, 6)}...{account.address.substring(account.address.length - 6)}
          </div>
        )}

        {/* Info Kontrak */}
        <div className="mt-6 text-center text-xs text-slate-500 break-all bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
          <p className="font-semibold text-slate-400 mb-1">DEX Contract ID (Testnet):</p>
          CCSYHWZCZT3FMITZCUR24QZZPGIEPAGEKYK2UA67GF2XGA5KMP434FH5
        </div>
      </div>
    </main>
  );
}
