"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, Trash2, UserRound } from "lucide-react";
import {
  removeFamilyPhotoAction,
  uploadFamilyPhotoAction,
  type FamilyActionState,
} from "@/app/(dashboard)/actions";

const initialState: FamilyActionState = {};

export function WristbandPhotoUploader({
  wristbandId,
  wearerLabel,
  photoUrl,
}: {
  wristbandId: string;
  wearerLabel: string;
  photoUrl?: string;
}) {
  const router = useRouter();
  const uploadFormRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | undefined>(photoUrl);
  const [uploadState, uploadAction, uploading] = useActionState(
    uploadFamilyPhotoAction,
    initialState,
  );
  const [removeState, removeAction, removing] = useActionState(
    removeFamilyPhotoAction,
    initialState,
  );

  useEffect(() => {
    setPreview(photoUrl);
  }, [photoUrl]);

  useEffect(() => {
    if (uploadState.success || removeState.success) {
      router.refresh();
    }
  }, [uploadState.success, removeState.success, router]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    uploadFormRef.current?.requestSubmit();
  }

  const busy = uploading || removing;
  const error = uploadState.error ?? removeState.error;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={`Photo of ${wearerLabel}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center">
              <UserRound className="h-9 w-9" strokeWidth={1.5} />
            </span>
          )}
          {busy && (
            <span className="absolute inset-0 grid place-items-center bg-white/60 dark:bg-slate-900/60">
              <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Profile photo
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Shown on the public emergency page. JPG, PNG, or WEBP · max 5 MB.
          </p>

          <div className="mt-2.5 flex items-center gap-2">
            <form ref={uploadFormRef} action={uploadAction}>
              <input type="hidden" name="wristbandId" value={wristbandId} />
              <label
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ${
                  busy ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <Camera className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                {preview ? "Change photo" : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  onChange={handleFileChange}
                  disabled={busy}
                />
              </label>
            </form>

            {preview && (
              <form action={removeAction}>
                <input type="hidden" name="wristbandId" value={wristbandId} />
                <button
                  type="submit"
                  disabled={busy}
                  aria-label="Remove photo"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:pointer-events-none disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/25"
        >
          {error}
        </p>
      )}
    </div>
  );
}
