"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Phone, Plus, Star, Trash2, Users } from "lucide-react";
import {
  addContactAction,
  removeContactAction,
  type FamilyActionState,
} from "@/app/(dashboard)/actions";
import type { EmergencyContactDto } from "@/core/application/dto";

const initialState: FamilyActionState = {};

const fieldBase =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-500/20";
const labelBase =
  "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

const MAX_CONTACTS = 5;

function ContactRow({
  wristbandId,
  contact,
}: {
  wristbandId: string;
  contact: EmergencyContactDto;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    removeContactAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) router.refresh();
  }, [state.success, router]);

  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 dark:border-slate-800 dark:bg-slate-900">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">
        <Phone className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
          {contact.name}
          {contact.isPrimary && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
              <Star className="h-2.5 w-2.5 fill-current" />
              Primary
            </span>
          )}
        </p>
        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
          {contact.relationship} · {contact.phone}
        </p>
      </div>
      <form action={action}>
        <input type="hidden" name="wristbandId" value={wristbandId} />
        <input type="hidden" name="contactId" value={contact.id} />
        <button
          type="submit"
          disabled={pending}
          aria-label={`Delete contact ${contact.name}`}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:pointer-events-none disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </form>
    </li>
  );
}

export function EmergencyContactsManager({
  wristbandId,
  contacts,
}: {
  wristbandId: string;
  contacts: EmergencyContactDto[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(addContactAction, initialState);
  const errors = state.fieldErrors ?? {};
  const atLimit = contacts.length >= MAX_CONTACTS;

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-brand-600" />
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Emergency contacts
        </h2>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Phone numbers rescuers can call from the emergency page. Maximum {MAX_CONTACTS} contacts.
      </p>

      {contacts.length > 0 && (
        <ul className="mt-4 space-y-2">
          {contacts.map((c) => (
            <ContactRow key={c.id} wristbandId={wristbandId} contact={c} />
          ))}
        </ul>
      )}

      {atLimit ? (
        <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
          Maximum contact limit reached. Remove one to add another.
        </p>
      ) : (
        <form ref={formRef} action={action} className="mt-4 space-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          <input type="hidden" name="wristbandId" value={wristbandId} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelBase} htmlFor="contactName">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contactName"
                name="name"
                placeholder="e.g. Jane"
                className={fieldBase}
                required
              />
              {errors.name && (
                <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className={labelBase} htmlFor="contactRelationship">
                Relationship <span className="text-red-500">*</span>
              </label>
              <input
                id="contactRelationship"
                name="relationship"
                placeholder="e.g. Child, Spouse"
                className={fieldBase}
                required
              />
              {errors.relationship && (
                <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                  {errors.relationship}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className={labelBase} htmlFor="contactPhone">
                Phone number <span className="text-red-500">*</span>
              </label>
              <input
                id="contactPhone"
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="e.g. 0812xxxxxxx"
                className={fieldBase}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              name="isPrimary"
              className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Make primary contact
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              name="showNameOnPublic"
              defaultChecked
              className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Show name on public page
            </span>
          </label>

          {state.error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/25"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.75)] transition-all hover:bg-brand-500 disabled:pointer-events-none disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {pending ? "Adding…" : "Add contact"}
          </button>
        </form>
      )}
    </section>
  );
}
