"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Globe, ShieldCheck } from "lucide-react";
import { saveSetupAction, type FamilyActionState } from "@/app/(dashboard)/actions";
import type { WristbandSetupDto } from "@/core/application/dto";
import { WristbandPhotoUploader } from "./wristband-photo-uploader";
import { EmergencyContactsManager } from "./emergency-contacts-manager";
import {
  getProfileModeLabel,
  getStatusBadgeClass,
  getStatusLabel,
  getWearerRoleLabel,
} from "./dashboard-labels";
import { ProfileMode } from "@/core/domain/enums";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const initialState: FamilyActionState = {};

const fieldBase =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-500/20";
const labelBase =
  "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

export function SetupView({ setup }: { setup: WristbandSetupDto }) {
  const [state, formAction, pending] = useActionState(saveSetupAction, initialState);
  const errors = state.fieldErrors ?? {};

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
  const publicUrl = `${appUrl}/${setup.emergencyId}`;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Setup Profil Darurat
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {getProfileModeLabel(setup.profileMode as ProfileMode)} ·{" "}
            {getWearerRoleLabel(setup.wearerRole)} · {setup.wearerLabel}
          </p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${getStatusBadgeClass(
            setup.status,
          )}`}
        >
          {getStatusLabel(setup.status)}
        </span>
      </div>

      <div className="mt-6">
        <WristbandPhotoUploader
          wristbandId={setup.id}
          wearerLabel={setup.wearerLabel}
          photoUrl={setup.photoUrl}
        />
      </div>

      <form id="setup-profile-form" action={formAction} className="mt-6 space-y-6">
        <input type="hidden" name="wristbandId" value={setup.id} />

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Identitas</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelBase} htmlFor="preferredName">
                Nama yang ditampilkan <span className="text-red-500">*</span>
              </label>
              <input
                id="preferredName"
                name="preferredName"
                defaultValue={setup.preferredName}
                placeholder="mis. Budi Santoso"
                className={fieldBase}
                required
              />
              {errors.preferredName && (
                <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                  {errors.preferredName}
                </p>
              )}
            </div>
            <div>
              <label className={labelBase} htmlFor="approximateAge">
                Perkiraan usia
              </label>
              <input
                id="approximateAge"
                name="approximateAge"
                type="number"
                min={0}
                max={150}
                defaultValue={setup.approximateAge ?? ""}
                placeholder="mis. 68"
                className={fieldBase}
              />
            </div>
            <div>
              <label className={labelBase} htmlFor="languageHint">
                Bahasa
              </label>
              <input
                id="languageHint"
                name="languageHint"
                defaultValue={setup.languageHint ?? ""}
                placeholder="mis. Indonesia, Jawa"
                className={fieldBase}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Informasi Medis
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Isi seperlunya — hanya bagian terisi yang tampil di halaman publik.
          </p>
          <div className="mt-4 grid gap-4">
            <div>
              <label className={labelBase} htmlFor="bloodType">
                Golongan darah
              </label>
              <select
                id="bloodType"
                name="bloodType"
                defaultValue={setup.bloodType ?? ""}
                className={fieldBase}
              >
                <option value="">Tidak diisi</option>
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelBase} htmlFor="criticalAllergies">
                Alergi kritis
              </label>
              <textarea
                id="criticalAllergies"
                name="criticalAllergies"
                rows={2}
                defaultValue={setup.criticalAllergies ?? ""}
                placeholder="mis. Penisilin, kacang"
                className={fieldBase}
              />
            </div>
            <div>
              <label className={labelBase} htmlFor="medicalConditions">
                Kondisi medis
              </label>
              <textarea
                id="medicalConditions"
                name="medicalConditions"
                rows={2}
                defaultValue={setup.medicalConditions ?? ""}
                placeholder="mis. Diabetes, jantung"
                className={fieldBase}
              />
            </div>
            <div>
              <label className={labelBase} htmlFor="importantMedications">
                Obat penting
              </label>
              <textarea
                id="importantMedications"
                name="importantMedications"
                rows={2}
                defaultValue={setup.importantMedications ?? ""}
                placeholder="mis. Insulin harian"
                className={fieldBase}
              />
            </div>
            <div>
              <label className={labelBase} htmlFor="emergencyNotes">
                Catatan darurat
              </label>
              <textarea
                id="emergencyNotes"
                name="emergencyNotes"
                rows={3}
                defaultValue={setup.emergencyNotes ?? ""}
                placeholder="Hal lain yang perlu diketahui penolong"
                className={fieldBase}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Publikasi
          </h2>

          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={setup.isActive}
              className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
            />
            <span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                Aktifkan tag
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Saat aktif, halaman darurat bisa diakses lewat scan NFC/QR. Nonaktifkan untuk menyembunyikannya.
              </span>
            </span>
          </label>

          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="isPublicEnabled"
              defaultChecked={setup.isPublicEnabled}
              className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
            />
            <span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <Globe className="h-4 w-4 text-brand-600" />
                Tampilkan profil di halaman publik
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Menampilkan nama, foto, dan info darurat kepada siapa pun yang memindai tag.
              </span>
            </span>
          </label>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            <Eye className="h-4 w-4 shrink-0" />
            <span className="break-all">{publicUrl}</span>
          </div>
        </section>

      </form>

      <div className="mt-6">
        <EmergencyContactsManager wristbandId={setup.id} contacts={setup.contacts} />
      </div>

      {state.error && (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/25"
        >
          {state.error}
        </p>
      )}

      <div className="mt-6 flex gap-2">
        <Link
          href="/dashboard"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Batal
        </Link>
        <button
          type="submit"
          form="setup-profile-form"
          disabled={pending}
          className="flex-1 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.75)] transition-all hover:bg-brand-500 disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? "Menyimpan…" : "Simpan"}
        </button>
      </div>
    </div>
  );
}
