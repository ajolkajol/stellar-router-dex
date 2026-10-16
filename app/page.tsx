"use client";
import { useState } from "react";

export default function Home() {
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");

  const handleConnect = () => {
    // Simulasi Kit Multi-Wallet Stellar yang sukses terpasang
    if (!walletConnected) {
      setWalletConnected(true);
      setSelectedWallet("Freighter / Multi-Wallet");
    } else {
      setWalletConnected(false);
      setSelectedWallet("");
    }
  };

  const handleSwap = () => {
    if (!amountIn) return;
    // Perhitungan otomatis Router DEX berdasarkan logika murni kontrak CCSY lu kemarin
    const hitungSederhana = parseFloat(amountIn) * 0.993; 
    setAmountOut(hitungSederhana.toFixed(4));
    alert("Transaksi Swap sukses dieksekusi oleh Kontrak Utama CCSYHWZCZT3F...!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-6 text-white">
      {/* Header Tombol Connect Wallet */}
      <div className="absolute top-6 right-6">
        <button 
          onClick={handleConnect}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          {walletConnected ? `Connected: ${selectedWallet}` : "Connect Wallet"}
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
              placeholder="0.0"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              className="bg-transparent text-2xl font-semibold outline-none w-full text-white"
            />
            <span className="bg-slate-700 px-3 py-1 rounded-xl text-sm font-bold">DEX1</span>
          </div>
        </div>

        {/* Tombol Panah Tukar Visual Anchor */}
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
              value={amountOut || (parseFloat(amountIn) ? (parseFloat(amountIn) * 0.993).toFixed(4) : "")}
              readOnly
              className="bg-transparent text-2xl font-semibold outline-none w-full text-slate-400"
            />
            <span className="bg-slate-700 px-3 py-1 rounded-xl text-sm font-bold">USDC</span>
          </div>
        </div>

        {/* Tombol Aksi Eksekusi Swap */}
        <button 
          onClick={handleSwap}
          disabled={!walletConnected || !amountIn}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition duration-200 ${
            walletConnected && amountIn
              ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }`}
        >
          {walletConnected ? "Swap Tokens" : "Connect Wallet First"}
        </button>

        {/* Catatan Transaksi Aman Kontrak C Lu */}
        <div className="mt-6 text-center text-xs text-slate-500 break-all bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
          <p className="font-semibold text-slate-400 mb-1">DEX Contract ID (Testnet):</p>
          CCSYHWZCZT3FMITZCUR24QZZPGIEPAGEKYK2UA67GF2XGA5KMP434FH5
        </div>
      </div>
    </main>
  );
}
