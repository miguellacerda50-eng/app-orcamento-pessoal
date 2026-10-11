import { getCategories, createCategory, deleteCategory } from '@/actions/categories'
import { Tags, Plus, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default async function CategoriesPage() {
  const categories = await getCategories()

  const incomeCategories = categories.filter((c) => c.type === 'income')
  const expenseCategories = categories.filter((c) => c.type === 'expense')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Categorias Personalizadas</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Organize seus lançamentos por centros de custo e fontes de renda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Criação */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl h-fit">
          <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
            <Tags className="w-4 h-4 text-indigo-400" />
            Nova Categoria
          </h3>
          <p className="text-xs text-slate-400 mb-4">Adicione uma classificação customizada</p>

          <form action={createCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Nome</label>
              <input
                name="name"
                required
                placeholder="Ex: Assinaturas, Cursos, Bônus..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Tipo</label>
              <select
                name="type"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="expense">Despesa (Saída)</option>
                <option value="income">Receita (Entrada)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Cor de Destaque</label>
              <input
                name="color"
                type="color"
                defaultValue="#6366f1"
                className="w-full h-10 rounded-xl bg-slate-950 border border-slate-800 p-1 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Criar Categoria
            </button>
          </form>
        </div>

        {/* Listagens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Despesas */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <ArrowDownRight className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Categorias de Despesas</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {expenseCategories.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-xs font-medium text-slate-200">{c.name}</span>
                  </div>
                  <form action={deleteCategory.bind(null, c.id)}>
                    <button
                      type="submit"
                      title="Excluir"
                      className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>

          {/* Receitas */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Categorias de Receitas</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {incomeCategories.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-xs font-medium text-slate-200">{c.name}</span>
                  </div>
                  <form action={deleteCategory.bind(null, c.id)}>
                    <button
                      type="submit"
                      title="Excluir"
                      className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
