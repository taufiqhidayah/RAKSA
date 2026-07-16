import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="landing-header">
      <div className="landing-container landing-header__inner">
        <Link href="/" className="landing-logo">
          GelangSiaga
        </Link>
        <nav className="landing-nav">
          <Link href="/login" className="landing-nav__link">
            Masuk
          </Link>
          <Link href="/login" className="landing-btn landing-btn--primary">
            Aktivasi Gelang
          </Link>
        </nav>
      </div>
    </header>
  );
}
