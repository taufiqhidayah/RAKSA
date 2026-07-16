import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { mapDomainErrorToHttp } from "@/presentation/http/error-mapper";
import { EmergencyPageView } from "@/presentation/components/emergency/emergency-page-view";

interface EmergencyIdPageProps {
  params: Promise<{ emergencyId: string }>;
}

export default async function EmergencyIdPage({ params }: EmergencyIdPageProps) {
  const { emergencyId: identifier } = await params;

  try {
    const supabase = await createSupabaseServerClient();
    const { useCases } = createAppContainer(supabase);
    const page = /^GS-/i.test(identifier)
      ? await useCases.getPublicEmergencyPage.executeByEmergencyId(identifier)
      : await useCases.getPublicEmergencyPage.execute(identifier);
    return <EmergencyPageView data={page} />;
  } catch (error) {
    const { status } = mapDomainErrorToHttp(error);
    if (status === 400 || status === 404 || status === 410) notFound();
    throw error;
  }
}
