'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock HealthcareChatbot component
const HealthcareChatbot = ({ placeholder, systemPrompt }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 bg-black rounded-full"></div>
      <span className="text-gray-900 font-medium text-sm">ARIEMUM AI</span>
      <div className="ml-auto text-xs text-gray-500 font-mono">ONLINE</div>
    </div>
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full border-none outline-none text-gray-900 placeholder-gray-400 text-lg bg-transparent"
      />
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
          Ask AI
        </button>
      </div>
    </div>
  </div>
);

export default function PatientPortal() {
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
      title: "My Appointments",
      subtitle: "Schedule Management",
      description: "View and manage your upcoming appointments with healthcare providers",
      status: "3 upcoming",
      priority: true
    },
    {
      id: 2,
      title: "Medical Records",
      subtitle: "Health Information", 
      description: "Access your complete medical history, test results, and health data",
      status: "Updated today",
      priority: false
    },
    {
      id: 3,
      title: "Prescriptions",
      subtitle: "Medication Management",
      description: "Manage your medications, refills, and prescription history",
      status: "2 active",
      priority: true
    },
    {
      id: 4,
      title: "Test Results",
      subtitle: "Lab & Diagnostics",
      description: "View your latest laboratory and diagnostic test results",
      status: "1 pending",
      priority: false
    },
    {
      id: 5,
      title: "Schedule Appointment",
      subtitle: "Book New Visit",
      description: "Schedule new appointments with your healthcare providers",
      status: "Available",
      priority: false
    },
    {
      id: 6,
      title: "Messages",
      subtitle: "Provider Communication",
      description: "Secure messaging with your healthcare team and providers",
      status: "2 unread",
      priority: true
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Clean Header */}
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Status Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span className="text-gray-300 text-sm font-medium">Secure</span>
              </div>
              <div className="text-gray-500 text-sm font-mono">
                {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-white text-black text-xs font-semibold rounded-full">
                PLATINUM
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
                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Patient Portal</span>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 font-light max-w-2xl">
              Premium healthcare management platform designed for discerning patients who value excellence and discretion.
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
                    <div className="text-sm text-gray-400 font-medium">
                      {service.subtitle}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</div>
                    <div className="text-sm font-medium text-gray-200">
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

        {/* AI Assistant */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-100 mb-3">Healthcare Intelligence</h2>
            <p className="text-gray-300">Advanced AI consultation for premium members</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <HealthcareChatbot 
              placeholder="Describe your symptoms or health concerns..."
              systemPrompt="You are a premium healthcare AI assistant."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center">
          <div className="flex items-center justify-center gap-8 text-xs text-gray-500 uppercase tracking-wider">
            <span>ARIEMUM Healthcare</span>
            <div className="w-px h-3 bg-gray-600"></div>
            <span>Premium Access</span>
            <div className="w-px h-3 bg-gray-600"></div>
            <span>Confidential</span>
          </div>
        </div>
      </div>
    </div>
  );
};