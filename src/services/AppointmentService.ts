import { createClient } from '@/lib/supabase';
import type { Appointment } from '@/types/database';

// Utility function to get the correct table name with prefix
// This provides fallback support if template replacement fails
function getTableName(tableName: string): string {
  // First try to use the template variable (will be replaced during build)
  const templatePrefix = '{{projectPrefix}}';
  
  // If template wasn't replaced, fall back to environment variable
  if (templatePrefix === '{{projectPrefix}}') {
    const envPrefix = process.env.NEXT_PUBLIC_PROJECT_PREFIX || '';
    return `${envPrefix}${tableName}`;
  }
  
  // Template was replaced successfully
  return `${templatePrefix}${tableName}`;
}

export class AppointmentService {
  // Get single appointment
  static async getAppointment(id: string): Promise<Appointment | null> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from(getTableName('appointments'))  // Dynamic table name resolution
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching appointment:', error);
      return null;
    }

    return data;
  }

  // Get all appointments for a patient
  static async getPatientAppointments(patientId: string): Promise<Appointment[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from(getTableName('appointments'))
      .select('*')
      .eq('patientId', patientId)
      .order('appointmentDate', { ascending: true });

    if (error) {
      console.error('Error fetching patient appointments:', error);
      return [];
    }

    return data || [];
  }

  // Get all appointments for a provider
  static async getProviderAppointments(providerId: string): Promise<Appointment[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from(getTableName('appointments'))
      .select('*')
      .eq('providerId', providerId)
      .order('appointmentDate', { ascending: true });

    if (error) {
      console.error('Error fetching provider appointments:', error);
      return [];
    }

    return data || [];
  }

  // Create new appointment
  static async createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment | null> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from(getTableName('appointments'))  // Dynamic table name resolution
      .insert([appointment])
      .select()
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      return null;
    }

    return data;
  }

  // Update appointment status
  static async updateAppointmentStatus(id: string, status: Appointment['status']): Promise<boolean> {
    const supabase = createClient();
    
    const { error } = await supabase
      .from(getTableName('appointments'))  // Dynamic table name resolution
      .update({ status, updatedAt: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating appointment:', error);
      return false;
    }

    return true;
  }

  // Update appointment details
  static async updateAppointment(id: string, updates: Partial<Omit<Appointment, 'id' | 'createdAt'>>): Promise<boolean> {
    const supabase = createClient();
    
    const { error } = await supabase
      .from(getTableName('appointments'))
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error updating appointment:', error);
      return false;
    }

    return true;
  }

  // Delete appointment
  static async deleteAppointment(id: string): Promise<boolean> {
    const supabase = createClient();
    
    const { error } = await supabase
      .from(getTableName('appointments'))
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting appointment:', error);
      return false;
    }

    return true;
  }

  // Get appointments by date range
  static async getAppointmentsByDateRange(startDate: string, endDate: string): Promise<Appointment[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from(getTableName('appointments'))
      .select('*')
      .gte('appointmentDate', startDate)
      .lte('appointmentDate', endDate)
      .order('appointmentDate', { ascending: true });

    if (error) {
      console.error('Error fetching appointments by date range:', error);
      return [];
    }

    return data || [];
  }

  // Get appointments by status
  static async getAppointmentsByStatus(status: Appointment['status']): Promise<Appointment[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from(getTableName('appointments'))
      .select('*')
      .eq('status', status)
      .order('appointmentDate', { ascending: true });

    if (error) {
      console.error('Error fetching appointments by status:', error);
      return [];
    }

    return data || [];
  }
}