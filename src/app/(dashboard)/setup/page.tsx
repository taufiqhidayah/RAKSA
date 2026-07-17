import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { SetupView } from "@/presentation/components/dashboard/setup-view";
import type { WristbandSetupDto } from "@/core/application/dto";

interface SetupPageProps {
  searchParams: Promise<{ wristband?: string }>;
}

export default async function SetupPage({ searchParams }: SetupPageProps) {
  const supabase = await createSupabaseServerClient();
  const { authService, useCases } = createAppContainer(supabase);

  const user = await authService.getCurrentUser();
  if (!user) {
    redirect("/login?redirect=/setup");
  }

  const params = await searchParams;
  let wristbandId = params.wristband?.trim();

  if (!wristbandId) {
    const tags = await useCases.listFamilyWristbands.execute(user.id);
    if (tags.length !== 1) {
      redirect("/dashboard");
    }
    wristbandId = tags[0].id;
  }

  let setup: WristbandSetupDto;
  try {
    setup = await useCases.getWristbandSetup.execute({
      ownerId: user.id,
      wristbandId,
    });
  } catch {
    redirect("/dashboard");
  }

  return <SetupView setup={setup} />;
}
