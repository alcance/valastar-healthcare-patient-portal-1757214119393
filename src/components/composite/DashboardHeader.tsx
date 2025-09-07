import { StethoscopeIcon, UserIcon } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userType: 'patient' | 'provider';
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant: 'primary' | 'secondary';
  }>;
}

export function DashboardHeader({ 
  title, 
  subtitle, 
  userType, 
  actions = [] 
}: DashboardHeaderProps) {
  const colorScheme = userType === 'patient' 
    ? { bg: 'bg-blue-100', text: 'text-blue-600', button: 'bg-blue-600' }
    : { bg: 'bg-green-100', text: 'text-green-600', button: 'bg-green-600' }

  return (
    <div className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`${colorScheme.bg} p-2 rounded-lg`}>
              {userType === 'patient' ? (
                <UserIcon className={`w-6 h-6 ${colorScheme.text}`} />
              ) : (
                <StethoscopeIcon className={`w-6 h-6 ${colorScheme.text}`} />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`px-4 py-2 rounded hover:opacity-90 transition-colors ${
                  action.variant === 'primary'
                    ? `${colorScheme.button} text-white`
                    : 'text-gray-600 hover:text-gray-700'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}