-- ══════════════════════════════════════════════════════════════════════════════
-- THE TRIAD 2 — ROW LEVEL SECURITY POLICIES
-- Run this entire file in your Supabase SQL Editor.
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ══════════════════════════════════════════════════════════════════════════════

-- ── Enable RLS on all tables ──────────────────────────────────────────────────
ALTER TABLE clinicians    ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients      ENABLE ROW LEVEL SECURITY;
ALTER TABLE bp_readings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE bg_readings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE side_effects  ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_briefs  ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts        ENABLE ROW LEVEL SECURITY;

-- ── Drop existing policies (run clean) ───────────────────────────────────────
DROP POLICY IF EXISTS "clinician_own_row"         ON clinicians;
DROP POLICY IF EXISTS "clinician_owns_patients"   ON patients;
DROP POLICY IF EXISTS "clinician_owns_bp"         ON bp_readings;
DROP POLICY IF EXISTS "clinician_owns_bg"         ON bg_readings;
DROP POLICY IF EXISTS "clinician_owns_meds"       ON medications;
DROP POLICY IF EXISTS "clinician_owns_se"         ON side_effects;
DROP POLICY IF EXISTS "clinician_owns_briefs"     ON daily_briefs;
DROP POLICY IF EXISTS "clinician_owns_alerts"     ON alerts;
DROP POLICY IF EXISTS "service_role_bypass"       ON patients;
DROP POLICY IF EXISTS "service_role_bp_bypass"    ON bp_readings;
DROP POLICY IF EXISTS "service_role_bg_bypass"    ON bg_readings;
DROP POLICY IF EXISTS "service_role_meds_bypass"  ON medications;
DROP POLICY IF EXISTS "service_role_se_bypass"    ON side_effects;
DROP POLICY IF EXISTS "service_role_alerts_bypass" ON alerts;

-- ── CLINICIANS ────────────────────────────────────────────────────────────────
-- A clinician can only read and update their own row
CREATE POLICY "clinician_own_row" ON clinicians
  FOR ALL
  USING (id = auth.uid());

-- ── PATIENTS ──────────────────────────────────────────────────────────────────
-- Clinician can only see their own patients
CREATE POLICY "clinician_owns_patients" ON patients
  FOR ALL
  USING (clinician_id = auth.uid());

-- Service role (used by API routes with SUPABASE_SERVICE_ROLE_KEY) bypasses RLS
CREATE POLICY "service_role_bypass" ON patients
  FOR ALL
  USING (auth.role() = 'service_role');

-- ── BP READINGS ───────────────────────────────────────────────────────────────
CREATE POLICY "clinician_owns_bp" ON bp_readings
  FOR ALL
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE clinician_id = auth.uid()
    )
  );

CREATE POLICY "service_role_bp_bypass" ON bp_readings
  FOR ALL
  USING (auth.role() = 'service_role');

-- ── BG READINGS ───────────────────────────────────────────────────────────────
CREATE POLICY "clinician_owns_bg" ON bg_readings
  FOR ALL
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE clinician_id = auth.uid()
    )
  );

CREATE POLICY "service_role_bg_bypass" ON bg_readings
  FOR ALL
  USING (auth.role() = 'service_role');

-- ── MEDICATIONS ───────────────────────────────────────────────────────────────
CREATE POLICY "clinician_owns_meds" ON medications
  FOR ALL
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE clinician_id = auth.uid()
    )
  );

CREATE POLICY "service_role_meds_bypass" ON medications
  FOR ALL
  USING (auth.role() = 'service_role');

-- ── SIDE EFFECTS ──────────────────────────────────────────────────────────────
CREATE POLICY "clinician_owns_se" ON side_effects
  FOR ALL
  USING (
    patient_id IN (
      SELECT id FROM patients WHERE clinician_id = auth.uid()
    )
  );

CREATE POLICY "service_role_se_bypass" ON side_effects
  FOR ALL
  USING (auth.role() = 'service_role');

-- ── DAILY BRIEFS ──────────────────────────────────────────────────────────────
CREATE POLICY "clinician_owns_briefs" ON daily_briefs
  FOR ALL
  USING (clinician_id = auth.uid());

-- ── ALERTS ────────────────────────────────────────────────────────────────────
CREATE POLICY "clinician_owns_alerts" ON alerts
  FOR ALL
  USING (clinician_id = auth.uid());

CREATE POLICY "service_role_alerts_bypass" ON alerts
  FOR ALL
  USING (auth.role() = 'service_role');

-- ══════════════════════════════════════════════════════════════════════════════
-- VERIFICATION — run this after to confirm policies are active
-- ══════════════════════════════════════════════════════════════════════════════
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
