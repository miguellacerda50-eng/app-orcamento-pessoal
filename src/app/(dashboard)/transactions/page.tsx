import { getTransactions } from '@/actions/transactions'
import { getCategories } from '@/actions/categories'
import { TransactionModal } from '@/components/transactions/TransactionModal'
import { deleteTransaction } from '@/actions/transactions'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react'

export default async function TransactionsPage() {
  const [transactions, categories] = await Promise.all([
    getTransactions(),
    getCategories(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Histórico de Transações</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize, filtre e gerencie todas as suas entradas e saídas
          </p>
        </div>

        <div className="flex items-center gap-3">
          <TransactionModal categories={categories} />
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Tipo & Descrição</th>
                <th className="py-3.5 px-4">Categoria</th>
                <th className="py-3.5 px-4">Data</th>
                <th className="py-3.5 px-4">Método</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Valor</th>
                <th className="py-3.5 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-500">
                    Nenhuma transação cadastrada ainda. Clique em &quot;Nova Transação&quot; para começar!
                  </td>
                </tr>
              ) : (
                transactions.map((t) => {
                  const isIncome = t.type === 'income'
                  return (
                    <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isIncome
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {isIncome ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <span className="font-medium text-white">{t.description}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 text-[11px] text-slate-300">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: t.category?.color || '#94a3b8' }}
                          />
                          {t.category?.name || 'Geral'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">{formatDate(t.transaction_date)}</td>

                      <td className="py-3.5 px-4 capitalize text-slate-400">
                        {t.payment_method.replace('_', ' ')}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            t.status === 'paid'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {t.status === 'paid' ? 'Efetivado' : 'Pendente'}
                        </span>
                      </td>

                      <td
                        className={`py-3.5 px-4 text-right font-bold ${
                          isIncome ? 'text-emerald-400' : 'text-slate-100'
                        }`}
                      >
                        {isIncome ? '+' : '-'} {formatCurrency(t.amount)}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <form action={deleteTransaction.bind(null, t.id)}>
                          <button
                            type="submit"
                            title="Excluir"
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
