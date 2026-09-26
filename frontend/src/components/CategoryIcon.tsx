import {
  Briefcase,
  Car,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  Package,
  Utensils,
  PawPrint,
  Home,
  Gift,
  Dumbbell,
  BookOpen,
  ShoppingBag,
  CreditCard,
  Receipt,
  Tag,
  type LucideIcon,
} from "lucide-react"

export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  car: Car,
  heart: HeartPulse,
  "piggy-bank": PiggyBank,
  "trending-up": PiggyBank,
  "shopping-cart": ShoppingCart,
  ticket: Ticket,
  film: Ticket,
  package: Package,
  utensils: Utensils,
  "paw-print": PawPrint,
  home: Home,
  gift: Gift,
  dumbbell: Dumbbell,
  "book-open": BookOpen,
  "shopping-bag": ShoppingBag,
  "credit-card": CreditCard,
  receipt: Receipt,
  tag: Tag,
}

export const CATEGORY_ICON_OPTIONS = [
  { value: "briefcase", icon: Briefcase, label: "Salário" },
  { value: "car", icon: Car, label: "Transporte" },
  { value: "heart", icon: HeartPulse, label: "Saúde" },
  { value: "piggy-bank", icon: PiggyBank, label: "Investimento" },
  { value: "shopping-cart", icon: ShoppingCart, label: "Mercado" },
  { value: "ticket", icon: Ticket, label: "Entretenimento" },
  { value: "package", icon: Package, label: "Entregas" },
  { value: "utensils", icon: Utensils, label: "Alimentação" },
  { value: "paw-print", icon: PawPrint, label: "Pets" },
  { value: "home", icon: Home, label: "Casa" },
  { value: "gift", icon: Gift, label: "Presentes" },
  { value: "dumbbell", icon: Dumbbell, label: "Academia" },
  { value: "book-open", icon: BookOpen, label: "Educação" },
  { value: "shopping-bag", icon: ShoppingBag, label: "Compras" },
  { value: "credit-card", icon: CreditCard, label: "Cartão" },
  { value: "receipt", icon: Receipt, label: "Contas" },
]

export const CATEGORY_COLOR_OPTIONS = [
  { name: "Verde", hex: "#16A34A" },
  { name: "Azul", hex: "#2563EB" },
  { name: "Roxo", hex: "#9333EA" },
  { name: "Rosa", hex: "#E11D48" },
  { name: "Vermelho", hex: "#DC2626" },
  { name: "Laranja", hex: "#EA580C" },
  { name: "Dourado", hex: "#D97706" },
]

interface CategoryIconProps {
  icon?: string
  color?: string
  size?: number
  className?: string
}

export function CategoryIcon({ icon, size = 18, className = "" }: CategoryIconProps) {
  const IconComponent = (icon && CATEGORY_ICON_MAP[icon]) || Tag
  return <IconComponent size={size} className={className} />
}

export function getCategoryColors(color?: string) {
  const fallback = "#16A34A"
  const c = color || fallback

  return {
    hex: c,
    bgSoft: `${c}1F`,
    bgBadge: `${c}1F`,
    textColor: c,
  }
}
