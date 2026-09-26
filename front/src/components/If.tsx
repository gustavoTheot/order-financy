import type { ReactNode } from "react"

interface IfProps {
  condition: boolean | any
  children: ReactNode
  fallback?: ReactNode
}

export function If({ condition, children, fallback = null }: IfProps) {
  return condition ? <>{children}</> : <>{fallback}</>
}
