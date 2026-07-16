const STEPS = [
  {
    number: 1,
    title: "Pakai Gelang",
    text: "Kenakan gelang dengan tag NFC, kode QR, dan Emergency ID yang terlihat di pergelangan tangan.",
  },
  {
    number: 2,
    title: "Setup Profil",
    text: "Daftar akun, masukkan Kode Aktivasi dari paket, lalu isi profil darurat dan kontak keluarga.",
  },
  {
    number: 3,
    title: "Pindai untuk Bantu",
    text: "Saat darurat, orang di sekitar ketuk NFC, pindai QR, atau masukkan Emergency ID — tanpa login.",
  },
];

export function LandingHowItWorks() {
  return (
    <section className="landing-section">
      <div className="landing-container">
        <div className="landing-section__header">
          <h2 className="landing-section__title">Cara Kerja</h2>
          <p className="landing-section__desc">
            Tiga langkah sederhana dari gelang fisik hingga bantuan darurat yang dapat diakses
            siapa saja.
          </p>
        </div>

        <div className="landing-steps">
          {STEPS.map((step) => (
            <article key={step.number} className="landing-step">
              <span className="landing-step__number">{step.number}</span>
              <h3 className="landing-step__title">{step.title}</h3>
              <p className="landing-step__text">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
