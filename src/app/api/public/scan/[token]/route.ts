import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/infrastructure/persistence/supabase/client/server-client";
import { createAppContainer } from "@/shared/di/container";
import { mapDomainErrorToHttp } from "@/presentation/http/error-mapper";
import { AccessMethod } from "@/core/domain/enums";

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;

  try {
    const supabase = await createSupabaseServerClient();
    const { useCases } = createAppContainer(supabase);

    const result = await useCases.recordPublicScan.execute({
      publicToken: token,
      accessMethod: AccessMethod.UNKNOWN,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    const { status, body } = mapDomainErrorToHttp(error);
    return NextResponse.json(body, { status });
  }
}
