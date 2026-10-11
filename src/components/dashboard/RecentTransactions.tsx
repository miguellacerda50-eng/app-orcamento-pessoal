import { ArrowDownRight, ArrowUpRight, Clock } from 'lucide-react'
import { Transaction } from '@/types/database'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, 5)

  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Últimas Transações</h3>
          <p className="text-xs text-slate-400">Atividades financeiras recentes</p>
        </div>
        <Link
          href="/transactions"
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Ver todas &rarr;
        </Link>
      </div>

      <div className="divide-y divide-slate-800/60">
        {recent.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">Nenhuma movimentação registrada.</p>
        ) : (
          recent.map((item) => {
            const isIncome = item.type === 'income'
            return (
              <div key={item.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'rose-500/10 bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {isIncome ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{item.description}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{item.category?.name || 'Geral'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {formatDate(item.transaction_date)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-xs font-bold ${
                      isIncome ? 'text-emerald-400' : 'text-slate-100'
                    }`}
                  >
                    {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
                  </p>
                  <span
                    className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-0.5 ${
                      item.status === 'paid'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.status === 'paid' ? 'Efetivado' : 'Pendente'}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
