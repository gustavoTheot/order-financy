import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/hooks/useSessionStore"
import { Navbar } from "./Navbar"

export function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/sign" replace />
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
