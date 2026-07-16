"use client";

import { useState } from "react";

type UseCaseId = "adult" | "child" | "elderly";

interface UseCase {
  id: UseCaseId;
  label: string;
  title: string;
  description: string;
  features: string[];
}

const USE_CASES: UseCase[] = [
  {
    id: "adult",
    label: "Darurat Medis",
    title: "Darurat Medis Dewasa",
    description:
      "Ketika seseorang tidak sadar atau tidak mampu berkomunikasi, orang di sekitar dapat mengetuk atau memindai gelang untuk melihat informasi medis kritis dan menghubungi kontak darurat.",
    features: [
      "Alergi dan kondisi medis kritis langsung terlihat",
      "Tombol hubungi kontak darurat dan layanan 112",
      "Tanpa perlu membuka kunci ponsel korban",
      "Label gelang: TAP / SCAN IN EMERGENCY",
    ],
  },
  {
    id: "child",
    label: "Anak Hilang",
    title: "Anak Hilang & Reunifikasi",
    description:
      "Ketika anak terpisah dari orang tua di tempat ramai, staf atau orang baik hati dapat memindai gelang untuk segera menghubungi wali — bahkan jika anak tidak ingat nomor telepon.",
    features: [
      "Tombol Call Parent / Guardian sebagai aksi utama",
      "Kirim Lokasi ke Keluarga dari ponsel pembantu",
      "Notifikasi instan ke orang tua saat gelang dipindai",
      "Label gelang: SCAN IF LOST",
    ],
  },
  {
    id: "elderly",
    label: "Lansia",
    title: "Keselamatan Orang Tua",
    description:
      "Untuk lansia yang bingung, lupa jalan pulang, atau hidup dengan Alzheimer — gelang membantu orang di sekitar menghubungi keluarga dan memberikan konteks medis yang dibutuhkan.",
    features: [
      "Catatan disorientasi dan kondisi kognitif",
      "Telepon keluarga / pengasuh sebagai aksi utama",
      "Info medis kritis jika terjadi pingsan",
      "Dikelola anak dewasa dari satu akun keluarga",
    ],
  },
];

function UseCaseIcon({ id }: { id: UseCaseId }) {
  if (id === "adult") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (id === "child") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function LandingUseCases() {
  const [active, setActive] = useState<UseCaseId>("adult");
  const current = USE_CASES.find((uc) => uc.id === active) ?? USE_CASES[0];

  return (
    <section className="landing-section landing-section--alt">
      <div className="landing-container">
        <div className="landing-section__header">
          <h2 className="landing-section__title">Satu Gelang, Tiga Skenario Keselamatan</h2>
          <p className="landing-section__desc">
            Satu akun keluarga dapat mengelola beberapa gelang — untuk diri sendiri, anak,
            dan orang tua lanjut usia.
          </p>
        </div>

        <div className="landing-tabs" role="tablist">
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              type="button"
              role="tab"
              aria-selected={active === uc.id}
              className={`landing-tab landing-tab--${uc.id}${active === uc.id ? ` landing-tab--active landing-tab--${uc.id}` : ""}`}
              onClick={() => setActive(uc.id)}
            >
              {uc.label}
            </button>
          ))}
        </div>

        <div
          className={`landing-tab-panel landing-tab-panel--${current.id}`}
          role="tabpanel"
        >
          <div className={`landing-tab-panel__icon landing-tab-panel__icon--${current.id}`}>
            <UseCaseIcon id={current.id} />
          </div>
          <h3 className="landing-tab-panel__title">{current.title}</h3>
          <p className="landing-tab-panel__text">{current.description}</p>
          <ul className="landing-tab-panel__list">
            {current.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
