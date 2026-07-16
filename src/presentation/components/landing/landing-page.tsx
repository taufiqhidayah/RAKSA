import { LandingHeader } from "./landing-header";
import { LandingHero } from "./landing-hero";
import { LandingUseCases } from "./landing-use-cases";
import { LandingHowItWorks } from "./landing-how-it-works";
import { LandingCta } from "./landing-cta";
import { LandingFooter } from "./landing-footer";

export function LandingPage() {
  return (
    <div className="landing">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingUseCases />
        <LandingHowItWorks />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
