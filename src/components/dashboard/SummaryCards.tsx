import { ArrowDownRight, ArrowUpRight, DollarSign, PiggyBank } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface SummaryCardsProps {
  income: number
  expenses: number
  balance: number
  savingsRate: number
}

export function SummaryCards({ income, expenses, balance, savingsRate }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Saldo Líquido Atual',
      value: formatCurrency(balance),
      change: balance >= 0 ? '+ Positivo' : '- Atenção',
      changeType: balance >= 0 ? 'positive' : 'negative',
      icon: DollarSign,
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-400 bg-indigo-500/10',
    },
    {
      title: 'Receitas do Mês',
      value: formatCurrency(income),
      change: 'Entradas registradas',
      changeType: 'positive',
      icon: ArrowUpRight,
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      title: 'Despesas do Mês',
      value: formatCurrency(expenses),
      change: 'Saídas acumuladas',
      changeType: 'negative',
      icon: ArrowDownRight,
      gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-400 bg-rose-500/10',
    },
    {
      title: 'Taxa de Poupança',
      value: `${savingsRate.toFixed(1)}%`,
      change: savingsRate > 20 ? 'Meta saudável atingida' : 'Otimize seus gastos',
      changeType: savingsRate > 20 ? 'positive' : 'neutral',
      icon: PiggyBank,
      gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400 bg-purple-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className={`p-5 rounded-2xl bg-gradient-to-br ${card.gradient} bg-slate-900/60 border ${card.borderColor} backdrop-blur-xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{card.title}</span>
              <div className={`p-2 rounded-xl ${card.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-bold tracking-tight text-white">{card.value}</h3>
              <p
                className={`text-xs mt-1.5 font-medium ${
                  card.changeType === 'positive'
                    ? 'text-emerald-400'
                    : card.changeType === 'negative'
                    ? 'text-rose-400'
                    : 'text-slate-400'
                }`}
              >
                {card.change}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
