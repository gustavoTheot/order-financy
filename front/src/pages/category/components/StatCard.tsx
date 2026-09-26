import type { ReactNode } from "react"

interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
  iconColor?: string
}

export function StatCard({ icon, value, label, iconColor = "#6366F1" }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col items-start gap-1 flex-1">
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="text-[#A0AEC0]" style={{ color: iconColor }}>
          {icon}
        </div>
        <span className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
          {label}
        </span>
      </div>
      <div>
        <span className="text-gray-900 text-xl font-bold tracking-wide uppercase">{value}</span>
      </div>
    </div>
  )
}
