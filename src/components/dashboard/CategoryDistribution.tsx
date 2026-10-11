'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '@/lib/utils'

interface CategoryDistributionProps {
  data: {
    name: string
    value: number
    color: string
  }[]
}

export function CategoryDistribution({ data }: CategoryDistributionProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-semibold text-white">Despesas por Categoria</h3>
        <p className="text-xs text-slate-400">Distribuição percentual do consumo mensal</p>
      </div>

      <div className="h-52 w-full my-3 relative flex items-center justify-center">
        {data.length === 0 ? (
          <p className="text-xs text-slate-500">Nenhuma despesa registrada</p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload
                      return (
                        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl shadow-xl text-xs space-y-0.5">
                          <p className="font-semibold text-white">{item.name}</p>
                          <p style={{ color: item.color }}>{formatCurrency(item.value)}</p>
                          <p className="text-[10px] text-slate-400">
                            {((item.value / total) * 100).toFixed(1)}% do total
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#090d16" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</span>
              <span className="text-xs font-bold text-white">{formatCurrency(total)}</span>
            </div>
          </>
        )}
      </div>

      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
        {data.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-slate-300 truncate max-w-[120px]">{cat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{formatCurrency(cat.value)}</span>
              <span className="text-[10px] text-slate-500 w-8 text-right">
                {total > 0 ? `${((cat.value / total) * 100).toFixed(0)}%` : '0%'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
