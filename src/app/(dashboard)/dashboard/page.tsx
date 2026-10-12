import { getTransactions } from '@/actions/transactions'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { CashFlowChart } from '@/components/dashboard/CashFlowChart'
import { CategoryDistribution } from '@/components/dashboard/CategoryDistribution'
import { RecentTransactions } from '@/components/dashboard/RecentTransactions'
import { PlusCircle, Wallet } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const transactions = await getTransactions()

  // Cálculos consolidados
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const netBalance = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

  // Dados para o Gráfico de Fluxo de Caixa (Resumo Mensal e Projeção)
  const cashFlowData = [
    { name: 'Sem 1', receitas: totalIncome * 0.35, despesas: totalExpense * 0.25 },
    { name: 'Sem 2', receitas: totalIncome * 0.45, despesas: totalExpense * 0.50 },
    { name: 'Sem 3', receitas: totalIncome * 0.70, despesas: totalExpense * 0.75 },
    { name: 'Sem 4', receitas: totalIncome, despesas: totalExpense },
  ]

  // Dados para Distribuição por Categoria
  const categoryMap: Record<string, { total: number; color: string }> = {}

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const catName = t.category?.name || 'Outros'
      const catColor = t.category?.color || '#64748b'
      if (!categoryMap[catName]) {
        categoryMap[catName] = { total: 0, color: catColor }
      }
      categoryMap[catName].total += Number(t.amount)
    })

  const categoryDistributionData = Object.entries(categoryMap).map(([name, data]) => ({
    name,
    value: data.total,
    color: data.color,
  }))

  return (
    <div className="space-y-6">
      {/* Top Banner de Boas-vindas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-slate-900/90 to-purple-950/60 border border-indigo-500/20 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
            <Wallet className="w-4 h-4" />
            <span>PAINEL DE CONTROLE FINANCEIRO</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Seu Orçamento Mensal sob Controle
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Acompanhe o saldo consolidado, distribuição de categorias e planeje suas metas financeiras com segurança.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/transactions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            Nova Transação
          </Link>
        </div>
      </div>

      {/* Cartões de Indicadores Chave (KPIs) */}
      <SummaryCards
        income={totalIncome}
        expenses={totalExpense}
        balance={netBalance}
        savingsRate={savingsRate}
      />

      {/* Grid de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CashFlowChart data={cashFlowData} />
        </div>
        <div className="lg:col-span-1">
          <CategoryDistribution data={categoryDistributionData} />
        </div>
      </div>

      {/* Seção de Transações Recentes */}
      <RecentTransactions transactions={transactions} />
    </div>
  )
}
