"use client";

import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { RevealCodeContent } from "./reveal-code-content";
import type { RegisterWristbandOutput } from "@/core/application/dto";

interface RevealCodeModalProps {
  open: boolean;
  onClose: () => void;
  result: RegisterWristbandOutput | null;
}

export function RevealCodeModal({ open, onClose, result }: RevealCodeModalProps) {
  if (!result) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Tag berhasil didaftarkan"
      description="Simpan Kode Aktivasi ini sekarang — cetak di paket/manual tag. Kode diberikan sekali ke pelanggan untuk klaim."
      footer={<Button onClick={onClose}>Selesai</Button>}
    >
      <RevealCodeContent result={result} />
    </Modal>
  );
}
