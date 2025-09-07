import { createClient } from '@/lib/supabase';
import type { Patient, Appointment, Prescription, MedicalRecord } from '@/types/database';

export class PatientService {
  // Get single patient
  static async getPatient(id: string): Promise<Patient | null> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('{{projectPrefix}}patients')  // Template variable
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching patient:', error);
      return null;
    }

    return data;
  }

  // Get patient appointments
  static async getPatientAppointments(patientId: string): Promise<Appointment[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('{{projectPrefix}}appointments')  // Template variable
      .select('*')
      .eq('patientId', patientId)
      .order('appointmentDate', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }

    return data || [];
  }

  // Get patient prescriptions
  static async getPatientPrescriptions(patientId: string): Promise<Prescription[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('{{projectPrefix}}prescriptions')  // Template variable
      .select('*')
      .eq('patientId', patientId)
      .eq('status', 'active')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching prescriptions:', error);
      return [];
    }

    return data || [];
  }

  // Get patient medical records
  static async getPatientMedicalRecords(patientId: string): Promise<MedicalRecord[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('{{projectPrefix}}medical_records')  // Template variable
      .select('*')
      .eq('patientId', patientId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching medical records:', error);
      return [];
    }

    return data || [];
  }
}