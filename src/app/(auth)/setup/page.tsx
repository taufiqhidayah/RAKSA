import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { AuthMedia } from "@/presentation/components/auth/auth-media";
import { RaksaLogo } from "@/presentation/components/brand/raksa-logo";

interface SetupPageProps {
  searchParams: Promise<{ wristband?: string }>;
}

export default async function SetupPage({ searchParams }: SetupPageProps) {
  const supabase = await createSupabaseServerClient();
  const { authService } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    redirect("/login?redirect=/setup");
  }

  const params = await searchParams;

  return (
    <div className="auth-shell">
      <main className="auth-panel">
        <div className="auth-panel__inner">
          <div className="auth-brand-row">
            <Link href="/" className="auth-brand" aria-label="raksa">
              <RaksaLogo variant="color" height={46} />
            </Link>
          </div>

          <div className="auth-panel__body">
            <div className="auth-intro">
              <h1 className="auth-intro__title">Emergency profile setup</h1>
              <p className="auth-intro__desc">
                Tag claimed successfully. The profile setup wizard will be available here
                — choose a profile mode, fill in emergency info, and activate your tag.
              </p>
            </div>

            {params.wristband && (
              <p className="auth-setup__id">
                Tag ID: <code>{params.wristband}</code>
              </p>
            )}

            <Link href="/dashboard" className="auth-btn auth-btn--primary auth-btn--full">
              Go to dashboard
            </Link>
          </div>
        </div>
      </main>

      <AuthMedia />
    </div>
  );
}
