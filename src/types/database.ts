export type Plan = 'standard' | 'growth' | 'enterprise'
export type Gender = 'male' | 'female' | 'other'
export type Severity = 'mild' | 'moderate' | 'severe'
export type ReadingType = 'fasting' | 'postprandial' | 'random'
export type Diagnosis = 'HTN' | 'DM'

export interface Clinician {
  id: string
  email: string
  full_name: string
  plan: Plan | null
  plan_expires_at: string | null
  patient_limit: number | null
  created_at: string
}

export interface Patient {
  id: string
  clinician_id: string
  full_name: string
  age: number | null
  gender: Gender | null
  weight_kg: number | null
  height_cm: number | null
  diagnosis: Diagnosis[]
  portal_token: string
  portal_email: string | null
  created_at: string
}

export interface BPReading {
  id: string
  patient_id: string
  systolic: number
  diastolic: number
  pulse: number | null
  logged_at: string
  notes: string | null
}

export interface BGReading {
  id: string
  patient_id: string
  value_mgdl: number
  reading_type: ReadingType
  logged_at: string
  notes: string | null
}

export interface Medication {
  id: string
  patient_id: string
  drug_name: string
  dose: string
  frequency: string
  start_date: string
  end_date: string | null
  active: boolean
  created_at: string
}

export interface SideEffect {
  id: string
  patient_id: string
  medication_id: string | null
  description: string
  severity: Severity
  reported_at: string
}

export interface Database {
  public: {
    Tables: {
      clinicians: {
        Row: Clinician
        Insert: Omit<Clinician, 'created_at'>
        Update: Partial<Omit<Clinician, 'id' | 'created_at'>>
      }
      patients: {
        Row: Patient
        Insert: Omit<Patient, 'id' | 'token' | 'created_at'>
        Update: Partial<Omit<Patient, 'id' | 'created_at'>>
      }
      bp_readings: {
        Row: BPReading
        Insert: Omit<BPReading, 'id'>
        Update: Partial<Omit<BPReading, 'id'>>
      }
      bg_readings: {
        Row: BGReading
        Insert: Omit<BGReading, 'id'>
        Update: Partial<Omit<BGReading, 'id'>>
      }
      medications: {
        Row: Medication
        Insert: Omit<Medication, 'id' | 'created_at'>
        Update: Partial<Omit<Medication, 'id' | 'created_at'>>
      }
      side_effects: {
        Row: SideEffect
        Insert: Omit<SideEffect, 'id'>
        Update: Partial<Omit<SideEffect, 'id'>>
      }
    }
  }
}
