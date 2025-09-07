'use client';
import Link from 'next/link';

interface PortalCardProps {
  title: string;
  description: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
  href: string;
}

export function PortalCard({ 
  title, 
  description, 
  buttonText, 
  bgColor, 
  textColor, 
  buttonColor,
  href
}: PortalCardProps) {
  return (
    <div className={`rounded-lg p-8 hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-gray-200 ${bgColor}`}>
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      <p className="mb-6 text-gray-700 leading-relaxed">{description}</p>
      <Link href={href}>
        <button 
          className={`text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity font-medium w-full ${buttonColor}`}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
}