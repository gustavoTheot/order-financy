import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { If } from "@/components/If"

interface CategoryItem {
  id: string
  title: string
  color: string
}

interface TransactionFiltersProps {
  search: string
  type: string
  categoryId: string
  categories: CategoryItem[]
  onSearchChange: (value: string) => void
  onTypeChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onClear: () => void
}

export function TransactionFilters({
  search,
  type,
  categoryId,
  categories,
  onSearchChange,
  onTypeChange,
  onCategoryChange,
  onClear,
}: TransactionFiltersProps) {
  const hasFilters = search || type || categoryId

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#4A5568]">Buscar</label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
          />
          <Input
            placeholder="Buscar por descrição"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10 border-[#CBD5E0] rounded-lg text-sm bg-white focus-visible:ring-1 focus-visible:ring-[#1F6F43] focus-visible:border-[#1F6F43]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#4A5568]">Tipo</label>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="h-10 border border-[#CBD5E0] rounded-lg text-sm px-3 text-[#2D3748] bg-white focus:outline-none focus:ring-1 focus:ring-[#1F6F43] focus:border-[#1F6F43]"
        >
          <option value="">Todos</option>
          <option value="INBOUND">Entrada</option>
          <option value="OUTBOUND">Saída</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#4A5568]">Categoria</label>
        <select
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-10 border border-[#CBD5E0] rounded-lg text-sm px-3 text-[#2D3748] bg-white focus:outline-none focus:ring-1 focus:ring-[#1F6F43] focus:border-[#1F6F43]"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#4A5568]">Período</label>
          <If condition={!!hasFilters}>
            <button
              onClick={onClear}
              className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
            >
              <X size={12} /> Limpar
            </button>
          </If>
        </div>
        <select
          defaultValue="ALL"
          className="h-10 border border-[#CBD5E0] rounded-lg text-sm px-3 text-[#2D3748] bg-white focus:outline-none focus:ring-1 focus:ring-[#1F6F43] focus:border-[#1F6F43]"
        >
          <option value="ALL">Todos os períodos</option>
          <option value="NOV2025">Novembro / 2025</option>
          <option value="DEZ2025">Dezembro / 2025</option>
        </select>
      </div>
    </div>
  )
}
