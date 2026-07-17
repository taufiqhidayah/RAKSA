import type { SupabaseClient } from "@supabase/supabase-js";

export const EMERGENCY_PHOTO_BUCKET = "emergency-photos";

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Uploads a wearer photo to the public storage bucket and returns its public
 * URL. Runs server-side with the persistence client (service role), so it
 * bypasses storage RLS. A random object name avoids stale CDN caching.
 */
export async function uploadEmergencyPhoto(
  client: SupabaseClient,
  wristbandId: string,
  file: File,
): Promise<string> {
  const ext = EXT_BY_TYPE[file.type] ?? "jpg";
  const objectPath = `${wristbandId}/${crypto.randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await client.storage
    .from(EMERGENCY_PHOTO_BUCKET)
    .upload(objectPath, bytes, {
      contentType: file.type || "image/jpeg",
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  const { data } = client.storage
    .from(EMERGENCY_PHOTO_BUCKET)
    .getPublicUrl(objectPath);

  return data.publicUrl;
}
