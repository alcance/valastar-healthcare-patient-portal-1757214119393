interface HeroSectionProps {
  title: string;
  description: string;
}

export function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">{title}</h1>
      <p className="text-lg mb-8 max-w-2xl text-center mx-auto text-gray-600">{description}</p>
    </div>
  );
}