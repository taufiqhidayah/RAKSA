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
        title: "Tag didaftarkan",
        description: `Emergency ID ${state.result.emergencyId} siap.`,
      });
    } else if (state.error) {
      toast({ tone: "error", title: "Gagal mendaftarkan", description: state.error });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const result = state.result ?? null;

  return (
    <Modal
      open
      blur={false}
      onClose={onClose}
      title={result ? "Tag berhasil didaftarkan" : "Daftarkan Tag NFC Baru"}
      description={
        result
          ? "Simpan Kode Aktivasi ini sekarang — cetak di paket/manual tag."
          : "Klik tombol dibawah untuk membuat tag baru."
      }
      footer={result ? <Button onClick={onClose}>Selesai</Button> : undefined}
    >
      {result ? (
        <RevealCodeContent result={result} />
      ) : (
        <form action={formAction}>
          <Button type="submit" size="md" disabled={pending} className="w-full">
            <Sparkles className="h-4 w-4" />
            {pending ? "Memproses..." : "Continue"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
