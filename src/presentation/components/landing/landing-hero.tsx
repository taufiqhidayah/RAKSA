import Link from "next/link";

export function LandingHero() {
  return (
    <section className="landing-hero">
      <div className="landing-container">
        <div className="landing-hero__content">
          <span className="landing-hero__badge">RAKSA-TAG · Keselamatan Keluarga</span>
          <h1 className="landing-hero__title">
            Gelang keselamatan NFC/QR — bantu orang di sekitar menghubungi keluarga Anda
            dalam hitungan detik.
          </h1>
          <p className="landing-hero__subtitle">
            Ketika ponsel terkunci, anak terpisah, atau orang tua bingung di keramaian —
            gelang GelangSiaga memberi orang di sekitar jalur langsung untuk membantu tanpa
            login.
          </p>
          <div className="landing-hero__actions">
            <Link href="/login" className="landing-btn landing-btn--white landing-btn--lg">
              Aktivasi Gelang
            </Link>
            <Link
              href="/lookup"
              className="landing-btn landing-btn--outline-white landing-btn--lg"
            >
              Pencarian Darurat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
