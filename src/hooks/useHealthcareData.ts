
// src/hooks/useHealthcareData.ts
'use client';
import { useState, useEffect } from 'react';
import { PatientService, ProviderService } from '@/services';
import type { Patient, Provider, Appointment, Prescription, MedicalRecord } from '@/types/database';

// Hook for patient data
export function usePatientData(patientId: string) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPatientData() {
      if (!patientId) return;
      
      setLoading(true);
      try {
        const [patientData, appointmentsData, prescriptionsData, recordsData] = await Promise.all([
          PatientService.getPatient(patientId),
          PatientService.getPatientAppointments(patientId),
          PatientService.getPatientPrescriptions(patientId),
          PatientService.getPatientMedicalRecords(patientId)
        ]);

        setPatient(patientData);
        setAppointments(appointmentsData);
        setPrescriptions(prescriptionsData);
        setMedicalRecords(recordsData);
      } catch (error) {
        console.error('Error loading patient data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPatientData();
  }, [patientId]);

  return { patient, appointments, prescriptions, medicalRecords, loading };
}

// Hook for provider data
export function useProviderData(providerId: string) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProviderData() {
      if (!providerId) return;
      
      setLoading(true);
      try {
        const [providerData, appointmentsData, patientsData] = await Promise.all([
          ProviderService.getProvider(providerId),
          ProviderService.getTodayAppointments(providerId),
          ProviderService.getProviderPatients(providerId)
        ]);

        setProvider(providerData);
        setTodayAppointments(appointmentsData);
        setPatients(patientsData);
      } catch (error) {
        console.error('Error loading provider data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProviderData();
  }, [providerId]);

  return { provider, todayAppointments, patients, loading };
}
