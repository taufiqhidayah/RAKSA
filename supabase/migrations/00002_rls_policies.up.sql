-- RLS policies for authenticated app users

-- Profiles: users manage their own row
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Wristbands: owners read and update their tags
CREATE POLICY "wristbands_select_own"
  ON wristbands FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "wristbands_update_own"
  ON wristbands FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Scan notifications: account holder reads own alerts
CREATE POLICY "scan_notifications_select_own"
  ON scan_notifications FOR SELECT
  USING (auth.uid() = account_holder_id);

CREATE POLICY "scan_notifications_update_own"
  ON scan_notifications FOR UPDATE
  USING (auth.uid() = account_holder_id)
  WITH CHECK (auth.uid() = account_holder_id);
