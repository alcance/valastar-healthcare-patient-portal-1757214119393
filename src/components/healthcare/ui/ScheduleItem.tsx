interface ScheduleItemProps {
  patient?: string;
  provider?: string;
  time: string;
  type: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'pending';
  onAction?: (action: string) => void;
}

export function ScheduleItem({ 
  patient, 
  provider, 
  time, 
  type, 
  status, 
  onAction 
}: ScheduleItemProps) {
  const statusConfig = {
    'completed': { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
    'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Progress' },
    'scheduled': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Scheduled' },
    'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' }
  };

  const config = statusConfig[status];

  return (
    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div>
        <p className="font-semibold">{patient || provider}</p>
        <p className="text-sm text-gray-600">{type}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{time}</p>
        <span className={`text-xs ${config.bg} ${config.text} px-2 py-1 rounded`}>
          {config.label}
        </span>
      </div>
    </div>
  );
}