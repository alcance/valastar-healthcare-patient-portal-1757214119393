'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProviderPortal() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      id: 1,
      title: "Patient Management",
      subtitle: "Oversee your complete patient roster and care plans",
      description: "Manage patient information, track treatment progress, and coordinate comprehensive care plans",
      status: "247 patients",
      priority: true
    },
    {
      id: 2,
      title: "Schedule Appointments",
      subtitle: "Manage your daily calendar and patient bookings",
      description: "View your appointment schedule, manage availability, and optimize your clinical time",
      status: "Updated today",
      priority: true
    },
    {
      id: 3,
      title: "Clinical Notes",
      subtitle: "Document patient encounters and treatment plans",
      description: "Create comprehensive clinical documentation with integrated templates and voice notes",
      status: "12 pending",
      priority: false
    },
    {
      id: 4,
      title: "Prescriptions",
      subtitle: "Write and manage patient medications safely",
      description: "Prescribe medications with drug interaction checking and automated pharmacy communication",
      status: "156 active",
      priority: true
    },
    {
      id: 5,
      title: "Medical Records",
      subtitle: "Access comprehensive patient health histories",
      description: "Review complete medical histories, lab results, and imaging studies in one place",
      status: "Synced",
      priority: false
    },
    {
      id: 6,
      title: "Reports & Analytics",
      subtitle: "Generate insights from your clinical practice data",
      description: "Create detailed reports on patient outcomes, practice metrics, and quality measures",
      status: "7 reports",
      priority: false
    }
  ];

  const getStatusColor = (status) => {
    if (status.includes("Updated today")) {
      return "text-yellow-400";
    }
    if (status.includes("pending") || status.includes("patients") || status.includes("active")) {
      return "text-gray-200";
    }
    if (status.includes("reports") || status.includes("Synced")) {
      return "text-gray-300";
    }
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Clean Header */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Status Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-all duration-300 hover:gap-3"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Return to Hub</span>
              </Link>
              <div className="h-4 w-px bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span className="text-gray-300 text-sm font-medium">Clinical Online</span>
              </div>
              <div className="text-gray-500 text-sm">
                {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-white text-black text-xs font-semibold rounded-full">
                PROVIDER
              </div>
            </div>
          </div>
          
          {/* Minimalist Title */}
          <div className="space-y-6">
            <div>
              <h1 className="text-6xl md:text-7xl font-light text-gray-100 tracking-tight">
                ARIEMUM
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="w-16 h-px bg-white"></div>
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Provider Portal</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 font-light max-w-2xl">
              Advanced clinical workflow platform designed for healthcare professionals who demand precision and efficiency in patient care.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={
                "group relative bg-gray-900 border transition-all duration-300 cursor-pointer " +
                (hoveredCard === service.id ? "border-white shadow-lg" : "border-gray-700 hover:border-gray-600")
              }
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedService(service.id)}
            >
              {/* Priority Indicator */}
              {service.priority && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-white"></div>
              )}
              
              {/* Content */}
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-1">
                      {service.title}
                    </h3>
                    <div className="text-sm text-gray-400 font-medium leading-relaxed">
                      {service.subtitle}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</div>
                    <div className={
                      "text-sm font-medium " + getStatusColor(service.status)
                    }>
                      {service.status}
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-300 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Action */}
                <div className="flex items-center justify-between">
                  <button className={
                    "px-6 py-2 text-sm font-medium transition-all duration-200 " +
                    (hoveredCard === service.id 
                      ? "bg-white text-black" 
                      : "bg-gray-800 text-gray-200 hover:bg-gray-700")
                  }>
                    Access
                  </button>
                  
                  <div className={
                    "transition-transform duration-200 " +
                    (hoveredCard === service.id ? "transform translate-x-1" : "")
                  }>
                    <div className="w-6 h-6 border border-gray-600 rounded flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 text-center">
          <div className="flex items-center justify-center gap-8 text-xs text-gray-500 uppercase tracking-wider">
            <span>ARIEMUM Healthcare</span>
            <div className="w-px h-3 bg-gray-600"></div>
            <span>Clinical Platform</span>
            <div className="w-px h-3 bg-gray-600"></div>
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};