import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { mapDomainErrorToHttp } from "@/presentation/http/error-mapper";

interface EmergencyIdPageProps {
  params: Promise<{ emergencyId: string }>;
}

/**
 * Short QR link: {APP_URL}/{emergencyId}. Resolves the human-readable
 * Emergency ID (GS-XXXX-XXXX) to its public token and redirects to the
 * canonical /e/{token} emergency page. Invalid formats or unknown IDs 404,
 * so this root dynamic route never shadows other paths.
 */
export default async function EmergencyIdRedirectPage({ params }: EmergencyIdPageProps) {
  const { emergencyId } = await params;

  let publicToken: string;
  try {
    const supabase = await createSupabaseServerClient();
    const { useCases } = createAppContainer(supabase);
    publicToken = await useCases.resolveEmergencyId.execute(emergencyId);
  } catch (error) {
    const { status } = mapDomainErrorToHttp(error);
    if (status === 400 || status === 404 || status === 410) notFound();
    throw error;
  }

  redirect(`/e/${publicToken}`);
}
