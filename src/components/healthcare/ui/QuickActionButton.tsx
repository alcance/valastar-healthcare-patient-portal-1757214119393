interface QuickActionButtonProps {
  title: string;
  description?: string;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function QuickActionButton({ 
  title, 
  description, 
  onClick, 
  icon: Icon,
  className = '' 
}: QuickActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors ${className}`}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-gray-600" />}
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}