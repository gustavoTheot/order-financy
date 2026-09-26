import { Tag, ArrowUpDown, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CategoryCard } from "./components/CategoryCard"
import { CategoryModal } from "./components/CategoryModal"
import { StatCard } from "./components/StatCard"
import { CategoryIcon } from "@/components/CategoryIcon"
import { useCategoryPage } from "@/hooks/useCategoryPage"
import { If } from "@/components/If"

export function CategoryPage() {
  const {
    categories,
    loading,
    totalCategories,
    totalTransactions,
    mostUsed,
    modalOpen,
    editingCategory,
    handleEdit,
    handleDelete,
    handleOpenCreate,
    handleCloseModal,
  } = useCategoryPage()

  return (
    <div className="flex flex-col gap-8 p-6 sm:p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#1A202C] text-2xl font-bold tracking-tight">Categorias</h1>
          <p className="text-[#718096] text-sm">Organize suas transações por categorias</p>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-[#1F6F43] hover:bg-[#185C37] text-white font-semibold gap-2 px-4 h-10 rounded-lg shadow-xs"
        >
          <Plus size={16} />
          Nova categoria
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Tag size={24} />}
          value={totalCategories}
          label="Total de categorias"
          iconColor="#475569"
        />
        <StatCard
          icon={<ArrowUpDown size={24} />}
          value={totalTransactions}
          label="Total de transações"
          iconColor="#9333EA"
        />
        <StatCard
          icon={<CategoryIcon icon={mostUsed?.icon} size={24} />}
          value={mostUsed?.title ?? "—"}
          label="Categoria mais utilizada"
          iconColor={mostUsed?.color || "#3B82F6"}
        />
      </div>

      <If
        condition={loading}
        fallback={
          <If
            condition={categories.length === 0}
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            }
          >
            <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-2xl border border-[#E2E8F0]">
              <Tag size={40} className="text-[#CBD5E0]" />
              <p className="text-[#A0AEC0] text-sm font-medium">Nenhuma categoria encontrada</p>
              <Button
                onClick={handleOpenCreate}
                className="bg-[#1F6F43] hover:bg-[#185C37] text-white gap-2 mt-2 font-semibold"
              >
                <Plus size={16} />
                Criar primeira categoria
              </Button>
            </div>
          </If>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E2E8F0] h-40 animate-pulse"
            />
          ))}
        </div>
      </If>

      <CategoryModal
        open={modalOpen}
        onClose={handleCloseModal}
        editingCategory={editingCategory}
      />
    </div>
  )
}
