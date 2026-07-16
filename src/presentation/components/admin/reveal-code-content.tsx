"use client";

import { useRef, useState } from "react";
import { Copy, Check, KeyRound, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "./ui/button";
import type { RegisterWristbandOutput } from "@/core/application/dto";

function CopyRow({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <div className="mt-1 flex items-center gap-2">
        <code className={`min-w-0 flex-1 truncate text-sm text-slate-900 dark:text-slate-100 ${mono ? "font-mono" : ""}`}>
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-brand-600 dark:hover:bg-slate-700"
          aria-label={`Salin ${label}`}
        >
          {copied ? <Check className="h-4 w-4 text-brand-600" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

/**
 * Shared result view for a freshly provisioned tag: QR code (download-able)
 * plus copyable identifiers. Used by both the reveal modal and the
 * "New tag" modal on the Registered Tags page.
 */
export function RevealCodeContent({ result }: { result: RegisterWristbandOutput }) {
  const qrRef = useRef<HTMLDivElement>(null);

  function downloadQr() {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qr-${result.emergencyId}.png`;
    link.click();
  }

  return (
    <div className="space-y-3">
      {/* QR code */}
      <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <div ref={qrRef} className="rounded-lg bg-white p-3">
          <QRCodeCanvas value={result.qrUrl} size={176} level="M" marginSize={2} />
        </div>
        <p className="max-w-full truncate text-center text-xs text-slate-500 dark:text-slate-400">
          {result.qrUrl}
        </p>
        <Button variant="secondary" size="sm" onClick={downloadQr}>
          <Download className="h-4 w-4" />
          Download QR (PNG)
        </Button>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
        <KeyRound className="h-4 w-4 shrink-0" />
        <span>Kode Aktivasi hanya untuk paket/manual — jangan dicetak pada gelang.</span>
      </div>
      <CopyRow label="Kode Aktivasi" value={result.activationCode} />
      <CopyRow label="Emergency ID (Public ID)" value={result.emergencyId} />
      <CopyRow label="Public Token" value={result.publicToken} />
      <CopyRow label="URL QR" value={result.qrUrl} />
      <CopyRow label="URL NFC" value={result.nfcUrl} />
    </div>
  );
}
