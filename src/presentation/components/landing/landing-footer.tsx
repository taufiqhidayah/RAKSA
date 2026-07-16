export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer__inner">
        <div>
          <p className="landing-footer__brand">GelangSiaga</p>
          <p className="landing-footer__tagline">
            RAKSA-TAG — Sistem identifikasi darurat berbasis gelang NFC/QR
          </p>
        </div>
        <div>
          <p className="landing-footer__disclaimer">
            GelangSiaga adalah alat identifikasi darurat dan reunifikasi keluarga — bukan
            perangkat medis. Informasi yang ditampilkan dilaporkan sendiri oleh pemilik dan
            tidak diverifikasi oleh profesional medis. Data pribadi dilindungi; halaman publik
            hanya menampilkan informasi minimum yang dibutuhkan untuk skenario darurat.
          </p>
          <p className="landing-footer__copy">
            &copy; {new Date().getFullYear()} GelangSiaga / RAKSA-TAG. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
