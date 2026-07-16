"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, Eye, EyeOff, Clock, CircleDot, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { StatusBadge } from "./ui/status-badge";
import { Skeleton } from "./ui/skeleton";
import { getWristbandDetailAction } from "@/app/(admin)/actions";
import type { AdminWristbandDetailDto } from "@/core/application/dto";

function formatDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <span className="text-right text-sm font-medium text-slate-900 dark:text-slate-100">{children}</span>
    </div>
  );
}

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-700 hover:text-brand-600 dark:text-slate-200"
    >
      <span className="max-w-[180px] truncate">{value}</span>
      {copied ? <Check className="h-3.5 w-3.5 text-brand-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

interface CardDetailModalProps {
  wristbandId: string | null;
  onClose: () => void;
}

export function CardDetailModal({ wristbandId, onClose }: CardDetailModalProps) {
  const [detail, setDetail] = useState<AdminWristbandDetailDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  function downloadQr() {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas || !detail) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `qr-${detail.emergencyId}.png`;
    link.click();
  }

  useEffect(() => {
    if (!wristbandId) {
      setDetail(null);
      setShowCode(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getWristbandDetailAction(wristbandId).then((res) => {
      if (cancelled) return;
      if (res.error) setError(res.error);
      else setDetail(res.detail ?? null);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [wristbandId]);

  const timeline = detail
    ? [
        { label: "Dibuat", at: detail.createdAt },
        { label: "Diklaim", at: detail.claimedAt },
        { label: "Diaktifkan", at: detail.activatedAt },
      ]
    : [];

  return (
    <Modal
      open={Boolean(wristbandId)}
      onClose={onClose}
      title="Detail Tag"
      description={detail ? detail.wearerLabel : undefined}
    >
      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {error && !loading && <p className="text-sm text-red-600">{error}</p>}

      {detail && !loading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <StatusBadge status={detail.status} />
            <StatusBadge status={detail.activationCodeStatus} kind="activation" />
          </div>

          {/* QR code */}
          <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <div ref={qrRef} className="rounded-lg bg-white p-3">
              <QRCodeCanvas value={detail.qrUrl} size={160} level="M" marginSize={2} />
            </div>
            <p className="max-w-full truncate text-center text-xs text-slate-500 dark:text-slate-400">
              {detail.qrUrl}
            </p>
            <Button variant="secondary" size="sm" onClick={downloadQr}>
              <Download className="h-4 w-4" />
              Download QR (PNG)
            </Button>
          </div>

          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 px-4 dark:divide-slate-700/60 dark:border-slate-700">
            <InfoRow label="Emergency ID">
              <CopyValue value={detail.emergencyId} />
            </InfoRow>
            <InfoRow label="Public Token">
              <CopyValue value={detail.publicToken} />
            </InfoRow>
            <InfoRow label="URL NFC/QR">
              <CopyValue value={detail.nfcUrl} />
            </InfoRow>
            <InfoRow label="Kode Aktivasi">
              <span className="inline-flex items-center gap-2">
                <span className="font-mono text-xs">
                  {detail.activationCode
                    ? showCode
                      ? detail.activationCode
                      : "••••••"
                    : "—"}
                </span>
                {detail.activationCode && (
                  <button
                    type="button"
                    onClick={() => setShowCode((s) => !s)}
                    className="rounded p-1 text-slate-400 hover:text-brand-600"
                    aria-label={showCode ? "Sembunyikan kode" : "Tampilkan kode"}
                  >
                    {showCode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                )}
              </span>
            </InfoRow>
            <InfoRow label="Mode profil">{detail.profileMode}</InfoRow>
            <InfoRow label="Peran pemakai">{detail.wearerRole}</InfoRow>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Clock className="h-3.5 w-3.5" /> Aktivitas
            </p>
            <div className="space-y-2">
              {timeline.map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-sm">
                  <CircleDot
                    className={`h-3.5 w-3.5 ${t.at ? "text-brand-500" : "text-slate-300 dark:text-slate-600"}`}
                  />
                  <span className="w-24 text-slate-500 dark:text-slate-400">{t.label}</span>
                  <span className="text-slate-700 dark:text-slate-200">{formatDate(t.at)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
