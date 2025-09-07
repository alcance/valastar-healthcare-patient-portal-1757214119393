'use client';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, FileText, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PatientService } from '@/services';
import type { Appointment } from '@/types/database';

// Mock patient ID - in a real app, this would come from auth/session
const PATIENT_ID = 'patient-001';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAppointments() {
      try {
        setLoading(true);
        const data = await PatientService.getPatientAppointments(PATIENT_ID);
        setAppointments(data);
      } catch (err) {
        console.error('Error loading appointments:', err);
        setError('Failed to load appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) > new Date() && apt.status === 'scheduled'
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) < new Date() || apt.status === 'completed'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/patient" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Patient Portal</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Navigation Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/patient" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Patient Portal</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">My Appointments</h1>
          <p className="text-blue-700">View and manage your upcoming and past appointments.</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No upcoming appointments scheduled.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(appointment.appointmentDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(appointment.appointmentDate)} ({appointment.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Provider ID: {appointment.providerId}</span>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                          <FileText className="w-4 h-4 mt-0.5" />
                          <span>{appointment.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Appointments */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Appointments</h2>
          {pastAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No past appointments found.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow p-6 opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(appointment.appointmentDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(appointment.appointmentDate)} ({appointment.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Provider ID: {appointment.providerId}</span>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                          <FileText className="w-4 h-4 mt-0.5" />
                          <span>{appointment.notes}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm">
                        View Summary
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}