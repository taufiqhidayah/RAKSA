DROP POLICY IF EXISTS "Public read emergency photos" ON storage.objects;

-- Remove objects first so the bucket can be dropped.
DELETE FROM storage.objects WHERE bucket_id = 'emergency-photos';
DELETE FROM storage.buckets WHERE id = 'emergency-photos';

ALTER TABLE emergency_profiles
  DROP COLUMN IF EXISTS photo_url;
