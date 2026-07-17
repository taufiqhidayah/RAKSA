-- Wearer photo shown on the public emergency page. Stored as the public URL of
-- an object in the `emergency-photos` storage bucket.
ALTER TABLE emergency_profiles
  ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Public bucket for wearer photos. The emergency page itself is public, so the
-- photo is served via a public URL. Uploads are performed server-side with the
-- service role, so no INSERT/UPDATE policy is needed for end users.
-- 5 MB limit matches the upload validation in the app.
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('emergency-photos', 'emergency-photos', true, 5242880)
ON CONFLICT (id) DO UPDATE
  SET public = true,
      file_size_limit = 5242880;

-- Allow anyone to read objects in this bucket (needed for the public page).
DROP POLICY IF EXISTS "Public read emergency photos" ON storage.objects;
CREATE POLICY "Public read emergency photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'emergency-photos');
