"use client";

import { useActionState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { registerWristbandAction, type RegisterActionState } from "@/app/(admin)/actions";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { RevealCodeContent } from "./reveal-code-content";
import { useToast } from "./ui/toast";

const initialState: RegisterActionState = {};

interface NewTagModalProps {
  /** Called to close the modal. The parent should refresh the list here. */
  onClose: () => void;
}

/**
 * "New tag" modal for the Registered Tags page. Generates a tag in one click,
 * then shows the QR code + identifiers inline (no separate page/route).
 * Mount only while open so each open starts from a clean form state.
 */
export function NewTagModal({ onClose }: NewTagModalProps) {
  const [state, formAction, pending] = useActionState(registerWristbandAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.result) {
      toast({
        tone: "success",
        title: "Tag registered",
        description: `Emergency ID ${state.result.emergencyId} is ready.`,
      });
    } else if (state.error) {
      toast({ tone: "error", title: "Registration failed", description: state.error });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const result = state.result ?? null;

  return (
    <Modal
      open
      blur={false}
      onClose={onClose}
      title={result ? "Tag registered successfully" : "Register new NFC tag"}
      description={
        result
          ? "Save this Activation Code now — print it on the packaging/tag manual."
          : "Click the button below to create a new tag."
      }
      footer={result ? <Button onClick={onClose}>Done</Button> : undefined}
    >
      {result ? (
        <RevealCodeContent result={result} />
      ) : (
        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="deviceType"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Tag type
            </label>
            <select
              id="deviceType"
              name="deviceType"
              defaultValue="bracelet"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 transition-all focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="bracelet">Band</option>
              <option value="necklace">Necklace</option>
              <option value="keychain">Keychain</option>
            </select>
          </div>
          <Button type="submit" size="md" disabled={pending} className="w-full">
            <Sparkles className="h-4 w-4" />
            {pending ? "Processing..." : "Continue"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
