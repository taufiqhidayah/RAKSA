-- GelangSiaga (RAKSA-TAG) — initial schema skeleton
-- Run via Supabase CLI: supabase db push

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  display_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Wristbands
CREATE TABLE IF NOT EXISTS wristbands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  emergency_id TEXT NOT NULL UNIQUE,
  public_token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'unclaimed'
    CHECK (status IN ('unclaimed', 'claimed', 'active', 'disabled', 'revoked')),
  profile_mode TEXT NOT NULL DEFAULT 'adult_emergency'
    CHECK (profile_mode IN ('adult_emergency', 'child_guardian', 'elderly_dependent')),
  wearer_role TEXT NOT NULL DEFAULT 'self'
    CHECK (wearer_role IN ('self', 'child', 'elderly_parent')),
  wearer_label TEXT NOT NULL DEFAULT 'My band',
  notify_on_scan BOOLEAN NOT NULL DEFAULT true,
  nfc_url TEXT NOT NULL,
  qr_url TEXT NOT NULL,
  claimed_at TIMESTAMPTZ,
  activated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wristbands_owner_id ON wristbands(owner_id);
CREATE INDEX IF NOT EXISTS idx_wristbands_public_token ON wristbands(public_token);
CREATE INDEX IF NOT EXISTS idx_wristbands_emergency_id ON wristbands(emergency_id);

-- Activation codes (plain 6-char code — manual entry, stored uppercase)
CREATE TABLE IF NOT EXISTS activation_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wristband_id UUID NOT NULL REFERENCES wristbands(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE
    CHECK (char_length(code) = 6 AND code ~ '^[A-Z0-9]{6}$'),
  status TEXT NOT NULL DEFAULT 'unused'
    CHECK (status IN ('unused', 'used', 'revoked')),
  used_by UUID REFERENCES profiles(id),
  used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activation_codes_code ON activation_codes(code);

-- Emergency profiles
CREATE TABLE IF NOT EXISTS emergency_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wristband_id UUID NOT NULL UNIQUE REFERENCES wristbands(id) ON DELETE CASCADE,
  preferred_name TEXT NOT NULL,
  approximate_age INTEGER,
  blood_type TEXT,
  critical_allergies TEXT,
  medical_conditions TEXT,
  important_medications TEXT,
  emergency_notes TEXT,
  reunification_note TEXT,
  disorientation_notes TEXT,
  cognitive_condition_flag BOOLEAN NOT NULL DEFAULT false,
  language_hint TEXT,
  is_public_enabled BOOLEAN NOT NULL DEFAULT false,
  last_confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Emergency contacts
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wristband_id UUID NOT NULL REFERENCES wristbands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  show_name_on_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Scan logs
CREATE TABLE IF NOT EXISTS scan_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wristband_id UUID NOT NULL REFERENCES wristbands(id) ON DELETE CASCADE,
  access_method TEXT NOT NULL DEFAULT 'unknown'
    CHECK (access_method IN ('nfc', 'qr', 'manual_lookup', 'unknown')),
  location_shared BOOLEAN NOT NULL DEFAULT false,
  shared_latitude DECIMAL,
  shared_longitude DECIMAL,
  location_accuracy_m INTEGER,
  location_shared_at TIMESTAMPTZ,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_hash TEXT,
  approximate_location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Scan notifications
CREATE TABLE IF NOT EXISTS scan_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_holder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  wristband_id UUID NOT NULL REFERENCES wristbands(id) ON DELETE CASCADE,
  scan_log_id UUID NOT NULL REFERENCES scan_logs(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS enabled — policies to be added in follow-up migration
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wristbands ENABLE ROW LEVEL SECURITY;
ALTER TABLE activation_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_notifications ENABLE ROW LEVEL SECURITY;
