"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Copy, Check, ArrowRight, CircleSlash, CreditCard } from "lucide-react";
import type { AdminWristbandRowDto } from "@/core/application/dto";
import { StatusBadge } from "./ui/status-badge";
import { CardDetailModal } from "./card-detail-modal";
import { LinkButton } from "./ui/button";

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
    .replace(".", ":");
  return `${date} ${time}`;
}

function CardHeader() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-700/60">
      <div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recent registrations</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Recently provisioned NFC tags.</p>
      </div>
      <Link
        href="/admin/cards"
        className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        View all
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export function RecentRegistrations({ items }: { items: AdminWristbandRowDto[] }) {
  const [detailId, setDetailId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyId(e: React.MouseEvent, row: AdminWristbandRowDto) {
    e.stopPropagation();
    await navigator.clipboard.writeText(row.emergencyId);
    setCopiedId(row.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <>
      <div className="admin-animate-in overflow-hidden rounded-[var(--radius-card)] border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/60 dark:bg-slate-800">
        <CardHeader />

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-600/10 dark:bg-brand-500/10 dark:text-brand-300">
              <CreditCard className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">No tags yet</h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
              No NFC tags registered yet. Get started by registering your first tag.
            </p>
            <div className="mt-5">
              <LinkButton href="/admin/cards?new=1" pill>
                Register tag
              </LinkButton>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                    <th className="px-5 py-3.5 font-medium">Public ID</th>
                    <th className="px-5 py-3.5 font-medium">Label</th>
                    <th className="px-5 py-3.5 font-medium">Status</th>
                    <th className="px-5 py-3.5 font-medium">Created</th>
                    <th className="px-5 py-3.5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="admin-stagger divide-y divide-slate-50 dark:divide-slate-700/50">
                  {items.map((row, i) => (
                    <tr
                      key={row.id}
                      style={{ ["--i" as string]: i }}
                      onClick={() => setDetailId(row.id)}
                      className="group cursor-pointer transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-700/30"
                    >
                      <td className="px-5 py-3.5 font-mono font-medium text-slate-900 dark:text-slate-100">
                        {row.emergencyId}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{row.wearerLabel}</td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{formatDateTime(row.createdAt)}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1 opacity-60 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={(e) => copyId(e, row)}
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-700"
                            aria-label="Copy Public ID"
                            title="Copy Public ID"
                          >
                            {copiedId === row.id ? (
                              <Check className="h-4 w-4 text-brand-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDetailId(row.id);
                            }}
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-700"
                            aria-label="View details"
                            title="Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 px-5 py-3 text-xs text-slate-400 dark:border-slate-700/60">
              <CircleSlash className="h-3.5 w-3.5" />
              No more data
            </div>
          </>
        )}
      </div>

      <CardDetailModal wristbandId={detailId} onClose={() => setDetailId(null)} />
    </>
  );
}
