"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  Ban,
  Trash2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Plus,
} from "lucide-react";
import type { AdminWristbandRowDto } from "@/core/application/dto";
import { revokeWristbandAction, deleteWristbandAction } from "@/app/(admin)/actions";
import { StatusBadge } from "./ui/status-badge";
import { EmptyState } from "./ui/empty-state";
import { Button } from "./ui/button";
import { ConfirmDialog } from "./ui/confirm-dialog";
import { CardDetailModal } from "./card-detail-modal";
import { NewTagModal } from "./new-tag-modal";
import { useToast } from "./ui/toast";

const FILTERS = [
  { value: "", label: "Semua" },
  { value: "unclaimed", label: "Belum diklaim" },
  { value: "claimed", label: "Diklaim" },
  { value: "active", label: "Aktif" },
  { value: "disabled", label: "Nonaktif" },
  { value: "revoked", label: "Dicabut" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface CardsTableProps {
  items: AdminWristbandRowDto[];
  total: number;
  page: number;
  pageSize: number;
  status: string;
  search: string;
}

type PendingAction = { type: "revoke" | "delete"; row: AdminWristbandRowDto } | null;

export function CardsTable({ items, total, page, pageSize, status, search }: CardsTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [detailId, setDetailId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newOpen, setNewOpen] = useState(searchParams.get("new") === "1");
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  function updateParams(mutate: (p: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    router.push(`/admin/cards?${params.toString()}`);
  }

  function setFilter(value: string) {
    updateParams((p) => {
      if (value) p.set("status", value);
      else p.delete("status");
      p.delete("page");
    });
  }

  function goToPage(next: number) {
    updateParams((p) => p.set("page", String(next)));
  }

  async function copyId(row: AdminWristbandRowDto) {
    await navigator.clipboard.writeText(row.emergencyId);
    setCopiedId(row.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function confirmAction() {
    if (!pendingAction) return;
    const { type, row } = pendingAction;
    const formData = new FormData();
    formData.set("wristbandId", row.id);

    startTransition(async () => {
      const result =
        type === "revoke"
          ? await revokeWristbandAction({}, formData)
          : await deleteWristbandAction({}, formData);

      if (result.error) {
        toast({ tone: "error", title: "Gagal", description: result.error });
      } else {
        toast({
          tone: "success",
          title: type === "revoke" ? "Tag dicabut" : "Tag dihapus",
          description: row.emergencyId,
        });
        router.refresh();
      }
      setPendingAction(null);
    });
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs + New */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const active = status === f.value;
            return (
              <button
                key={f.value || "all"}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-brand-600 text-white shadow-[0_6px_16px_-6px_rgb(124_58_237_/_0.6)]"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <Button onClick={() => setNewOpen(true)} pill className="shrink-0">
          <Plus className="h-4 w-4" />
          Daftarkan Tag
        </Button>
      </div>

      {search && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>
            Hasil pencarian untuk <strong className="text-slate-700 dark:text-slate-200">“{search}”</strong>
          </span>
          <button
            type="button"
            onClick={() => updateParams((p) => { p.delete("search"); p.delete("page"); })}
            className="text-brand-600 hover:underline"
          >
            Hapus
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="Belum ada tag"
          description="Belum ada tag NFC yang cocok. Daftarkan tag baru untuk mulai."
          action={
            <Button onClick={() => setNewOpen(true)}>
              <Plus className="h-4 w-4" />
              Daftarkan Tag
            </Button>
          }
        />
      ) : (
        <div className="admin-animate-in overflow-hidden rounded-[var(--radius-card)] border border-slate-200/80 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700/60 dark:bg-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                  <th className="px-5 py-3.5 font-medium">Public ID</th>
                  <th className="px-5 py-3.5 font-medium">Label</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium">Kode</th>
                  <th className="px-5 py-3.5 font-medium">Dibuat</th>
                  <th className="px-5 py-3.5 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="admin-stagger divide-y divide-slate-50 dark:divide-slate-700/50">
                {items.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{ ["--i" as string]: i }}
                    className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-700/30"
                  >
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => copyId(row)}
                        className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-slate-900 hover:text-brand-600 dark:text-slate-100"
                        title="Salin Public ID"
                      >
                        {row.emergencyId}
                        {copiedId === row.id ? (
                          <Check className="h-3.5 w-3.5 text-brand-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-slate-300" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{row.wearerLabel}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={row.activationCodeStatus} kind="activation" />
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{formatDate(row.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setDetailId(row.id)}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-700"
                          aria-label="Lihat detail"
                          title="Detail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingAction({ type: "revoke", row })}
                          disabled={row.status === "revoked"}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-amber-50 hover:text-amber-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-amber-500/10"
                          aria-label="Cabut tag"
                          title="Revoke"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingAction({ type: "delete", row })}
                          disabled={row.status !== "unclaimed"}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-red-500/10"
                          aria-label="Hapus tag"
                          title={row.status === "unclaimed" ? "Hapus permanen" : "Hanya tag unclaimed yang bisa dihapus"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5 text-sm dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              {total} tag · Halaman {page} dari {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" /> Sebelumnya
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
              >
                Berikutnya <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {newOpen && (
        <NewTagModal
          onClose={() => {
            setNewOpen(false);
            if (searchParams.get("new")) {
              updateParams((p) => p.delete("new"));
            } else {
              router.refresh();
            }
          }}
        />
      )}

      <CardDetailModal wristbandId={detailId} onClose={() => setDetailId(null)} />

      <ConfirmDialog
        open={Boolean(pendingAction)}
        title={pendingAction?.type === "delete" ? "Hapus tag permanen?" : "Cabut tag ini?"}
        description={
          pendingAction?.type === "delete"
            ? `Tag ${pendingAction.row.emergencyId} akan dihapus permanen beserta kode aktivasinya. Tindakan ini tidak bisa dibatalkan.`
            : `Tag ${pendingAction?.row.emergencyId} akan dicabut. Halaman darurat publik tidak akan menampilkan data lagi.`
        }
        confirmLabel={pendingAction?.type === "delete" ? "Hapus" : "Cabut"}
        loading={isPending}
        onConfirm={confirmAction}
        onClose={() => setPendingAction(null)}
      />
    </div>
  );
}
