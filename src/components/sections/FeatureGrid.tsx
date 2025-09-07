import { FeatureCard } from '../ui/FeatureCard';

const features = [
  {
    title: "Appointment Scheduling",
    description: "Book and manage appointments online with ease"
  },
  {
    title: "Medical Records", 
    description: "Secure access to your complete health information"
  },
  {
    title: "Prescription Management",
    description: "Request refills and view medication history"
  },
  {
    title: "Telehealth",
    description: "Connect with healthcare providers remotely"
  },
  {
    title: "Lab Results",
    description: "View test results and reports instantly"
  },
  {
    title: "Insurance",
    description: "Manage coverage and submit claims easily"
  }
];

export function FeatureGrid() {
  return (
    <div className="mt-12 w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Healthcare Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}