interface StatsCardProps {
  title: string;
  value: string | number;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  bgColor = 'bg-blue-50', 
  textColor = 'text-blue-900',
  className = '' 
}: StatsCardProps) {
  return (
    <div className={`p-4 ${bgColor} rounded-lg ${className}`}>
      <h3 className={`font-semibold ${textColor}`}>{title}</h3>
      <p className={`text-2xl font-bold ${textColor.replace('text-', 'text-').replace('-900', '-700')}`}>
        {value}
      </p>
    </div>
  );
}