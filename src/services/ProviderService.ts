import { createClient } from '@/lib/supabase';
import type { Provider, Appointment, Patient } from '@/types/database';

export class ProviderService {
  // Get single provider
  static async getProvider(id: string): Promise<Provider | null> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('{{projectPrefix}}providers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching provider:', error);
      return null;
    }

    return data;
  }

  // Get provider's appointments for today
  static async getTodayAppointments(providerId: string): Promise<Appointment[]> {
    const supabase = createClient();
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('{{projectPrefix}}appointments')
      .select('*')
      .eq('providerId', providerId)
      .gte('appointmentDate', today)
      .lt('appointmentDate', today + 'T23:59:59')
      .order('appointmentDate', { ascending: true });

    if (error) {
      console.error('Error fetching today appointments:', error);
      return [];
    }

    return data || [];
  }

  // Get provider's patients - FIXED VERSION
  static async getProviderPatients(providerId: string): Promise<Patient[]> {
    const supabase = createClient();
    
    // Get unique patient IDs from appointments
    const { data: appointments, error: apptError } = await supabase
      .from('{{projectPrefix}}appointments')
      .select('patientId')
      .eq('providerId', providerId);

    if (apptError) {
      console.error('Error fetching provider appointments:', apptError);
      return [];
    }

    // Fix: Use Array.from() instead of spread operator with Set
    const allPatientIds = appointments?.map(a => a.patientId) || [];
    const uniquePatientIds = Array.from(new Set(allPatientIds));
    
    if (uniquePatientIds.length === 0) return [];

    const { data, error } = await supabase
      .from('{{projectPrefix}}patients')
      .select('*')
      .in('id', uniquePatientIds);

    if (error) {
      console.error('Error fetching provider patients:', error);
      return [];
    }

    return data || [];
  }
}