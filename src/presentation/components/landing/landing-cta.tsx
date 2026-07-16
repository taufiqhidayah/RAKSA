import Link from "next/link";

export function LandingCta() {
  return (
    <section className="landing-cta">
      <div className="landing-container">
        <h2 className="landing-cta__title">Siap Melindungi Keluarga Anda?</h2>
        <p className="landing-cta__desc">
          Aktifkan gelang Anda hari ini, atau gunakan pencarian darurat jika Anda menemukan
          seseorang yang membutuhkan bantuan.
        </p>
        <div className="landing-cta__actions">
          <Link href="/login" className="landing-btn landing-btn--white landing-btn--lg">
            Aktivasi Gelang
          </Link>
          <Link href="/lookup" className="landing-btn landing-btn--outline-white landing-btn--lg">
            Pencarian Darurat
          </Link>
        </div>
      </div>
    </section>
  );
}
