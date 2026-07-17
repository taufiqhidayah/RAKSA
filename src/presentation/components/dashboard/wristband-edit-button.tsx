"use client";

import { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Pencil, X } from "lucide-react";
import { updateFamilyMemberAction, type FamilyActionState } from "@/app/(dashboard)/actions";
import type { WristbandSummaryDto } from "@/core/application/dto";
import { WristbandStatus } from "@/core/domain/enums";
import { FamilyMemberFields } from "./family-member-fields";
import { WristbandPhotoUploader } from "./wristband-photo-uploader";
import { TagActiveToggle } from "./tag-active-toggle";

const initialState: FamilyActionState = {};

export function WristbandEditButton({ tag }: { tag: WristbandSummaryDto }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, formAction, pending] = useActionState(updateFamilyMemberAction, initialState);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state.success && open) {
      setOpen(false);
      router.refresh();
    }
  }, [state.success, open, router]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
      >
        <Pencil className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        Edit
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="dash-scope fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Edit anggota keluarga"
            className="dash-animate-up relative max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-float)] dark:border-slate-800 dark:bg-slate-900 sm:max-w-md sm:rounded-3xl"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-200 dark:bg-slate-700 sm:hidden" />
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Edit Anggota</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ubah foto, peran & nama anggota keluarga.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <WristbandPhotoUploader
                wristbandId={tag.id}
                wearerLabel={tag.wearerLabel}
                photoUrl={tag.photoUrl}
              />
              <TagActiveToggle
                wristbandId={tag.id}
                active={tag.status === WristbandStatus.ACTIVE}
              />
              <Link
                href={`/setup?wristband=${tag.id}`}
                className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Profil & kontak darurat
                <ArrowUpRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </Link>
            </div>

            <form action={formAction} className="mt-5 space-y-5">
              <input type="hidden" name="wristbandId" value={tag.id} />
              <FamilyMemberFields
                defaultRole={tag.wearerRole}
                defaultLabel={tag.wearerLabel}
                defaultNotify={tag.notifyOnScan}
                fieldErrors={state.fieldErrors}
              />

              {state.error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/25"
                >
                  {state.error}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.75)] transition-all hover:bg-brand-500 disabled:pointer-events-none disabled:opacity-60"
                >
                  {pending ? "Menyimpan…" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
