import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { mapDomainErrorToHttp } from "@/presentation/http/error-mapper";
import { EmergencyPageView } from "@/presentation/components/emergency/emergency-page-view";

interface EmergencyPageProps {
  params: Promise<{ token: string }>;
}

export default async function EmergencyPage({ params }: EmergencyPageProps) {
  const { token } = await params;
  const supabase = await createSupabaseServerClient();
  const { useCases } = createAppContainer(supabase);

  try {
    const page = await useCases.getPublicEmergencyPage.execute(token);
    return <EmergencyPageView data={page} />;
  } catch (error) {
    const { status } = mapDomainErrorToHttp(error);
    if (status === 404 || status === 410) notFound();
    throw error;
  }
}
