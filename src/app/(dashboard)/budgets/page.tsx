import { getBudgets, upsertBudget } from '@/actions/budgets'
import { getCategories } from '@/actions/categories'
import { getTransactions } from '@/actions/transactions'
import { formatCurrency, getCurrentMonthYear } from '@/lib/utils'
import { PiggyBank, Plus, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default async function BudgetsPage() {
  const currentMonth = getCurrentMonthYear()
  const [budgets, categories, transactions] = await Promise.all([
    getBudgets(currentMonth),
    getCategories(),
    getTransactions(),
  ])

  const expenseCategories = categories.filter((c) => c.type === 'expense')

  // Mapear gastos do mês por categoria
  const expensesByCategory: Record<string, number> = {}
  transactions
    .filter((t) => t.type === 'expense' && t.category_id)
    .forEach((t) => {
      const catId = t.category_id!
      expensesByCategory[catId] = (expensesByCategory[catId] || 0) + Number(t.amount)
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Metas de Orçamento Mensal</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Defina limites máximos de gastos para cada categoria no mês atual ({currentMonth})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Definição de Meta */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl h-fit">
          <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
            <PiggyBank className="w-4 h-4 text-indigo-400" />
            Definir Teto de Gastos
          </h3>
          <p className="text-xs text-slate-400 mb-4">Escolha a categoria e o teto máximo permitido</p>

          <form action={upsertBudget} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Categoria de Despesa</label>
              <select
                name="categoryId"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Selecione uma categoria</option>
                {expenseCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Limite Máximo Mensal (R$)</label>
              <input
                name="monthlyLimit"
                type="number"
                step="0.01"
                required
                placeholder="Ex: 1500,00"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <input type="hidden" name="monthYear" value={currentMonth} />

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Salvar Orçamento
            </button>
          </form>
        </div>

        {/* Lista de Metas e Barras de Progresso */}
        <div className="lg:col-span-2 space-y-4">
          {budgets.length === 0 ? (
            <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center text-xs text-slate-500">
              Nenhuma meta definida para este mês ainda. Comece definindo seu primeiro limite ao lado!
            </div>
          ) : (
            budgets.map((budget) => {
              const spent = expensesByCategory[budget.category_id] || 0
              const limit = Number(budget.monthly_limit)
              const percent = Math.min(Math.round((spent / limit) * 100), 100)
              const isOver = spent > limit
              const isWarning = percent >= 80 && !isOver

              return (
                <div
                  key={budget.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: budget.category?.color || '#6366f1' }}
                      />
                      <span className="text-sm font-semibold text-white">
                        {budget.category?.name || 'Categoria'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {isOver ? (
                        <span className="flex items-center gap-1 text-rose-400 font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Estourou o limite!
                        </span>
                      ) : isWarning ? (
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Atenção aos gastos
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Dentro da meta
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOver
                          ? 'bg-rose-500'
                          : isWarning
                          ? 'bg-amber-500'
                          : 'bg-gradient-to-r from-indigo-500 to-emerald-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>
                      Gasto: <strong className="text-white">{formatCurrency(spent)}</strong>
                    </span>
                    <span>
                      Limite: <strong className="text-white">{formatCurrency(limit)}</strong> (
                      {percent}%)
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
