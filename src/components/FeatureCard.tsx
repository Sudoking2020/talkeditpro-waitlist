import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: string
}

export default function FeatureCard({ icon: Icon, title, description, delay = '0' }: FeatureCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl bg-white border border-gray-200 shadow-sm
                 hover:shadow-md hover:border-tep-blue-200 
                 transition-all duration-300 opacity-0 animate-fade-in-up`}
      style={{ animationDelay: delay }}
    >
      <div className="w-12 h-12 rounded-xl bg-tep-blue-100 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-tep-blue-600" />
      </div>
      <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-xl leading-relaxed">{description}</p>
    </div>
  )
}
