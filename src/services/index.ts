export { PatientService } from './PatientService';
export { ProviderService } from './ProviderService';
export { AppointmentService } from './AppointmentService';

// Common error handler
export function handleServiceError(error: any, operation: string) {
  console.error(`Error in ${operation}:`, error);
  // Add your error tracking here (e.g., Sentry)
}