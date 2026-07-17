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
      title="Tag registered successfully"
      description="Save this Activation Code now — print it on the packaging/tag manual. The code is given once to the customer for claiming."
      footer={<Button onClick={onClose}>Done</Button>}
    >
      <RevealCodeContent result={result} />
    </Modal>
  );
}
