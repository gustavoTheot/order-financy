import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/hooks/useSessionStore"
import { Button } from "@/components/ui/button"

import logoFinancy from "../assets/logo_full.svg"

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate("/sign")
  }

  const getInitials = (name?: string) => {
    if (!name) return "CT"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Transações", path: "/transactions" },
    { label: "Categorias", path: "/categories" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-10">
          <Link to="/dashboard" className="flex items-center hover:opacity-90 transition-opacity">
            <img src={logoFinancy} alt="Financy" />
          </Link>
        </div>

        <div>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#1F6F43] font-bold"
                      : "text-[#718096] hover:text-[#1A202C]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/settings" title="Editar perfil">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm select-none cursor-pointer transition-all ${
                location.pathname === "/settings"
                  ? "bg-[#1F6F43] text-white ring-2 ring-[#1F6F43] ring-offset-1"
                  : "bg-[#CBD5E1] text-[#475569] hover:bg-[#94A3B8] hover:text-white"
              }`}
            >
              {getInitials(user?.name)}
            </div>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-[#718096] hover:text-red-600 hover:bg-red-50 text-xs h-8 px-2 rounded-md"
            title="Sair da conta"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
