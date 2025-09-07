import { PortalCard } from '@/components/ui/PortalCard';

const portals = [
  {
    title: "Patient Portal",
    description: "Access your medical records, schedule appointments, and manage prescriptions.",
    buttonText: "Enter Patient Portal",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    buttonColor: "bg-blue-600",
    href: "/patient"
  },
  {
    title: "Provider Portal", 
    description: "Healthcare professionals can access patient data and manage schedules.",
    buttonText: "Enter Provider Portal",
    bgColor: "bg-green-50",
    textColor: "text-green-700", 
    buttonColor: "bg-green-600",
    href: "/provider"
  }
];

export function PortalSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mb-16">
      {portals.map((portal, index) => (
        <PortalCard key={index} {...portal} />
      ))}
    </div>
  );
}