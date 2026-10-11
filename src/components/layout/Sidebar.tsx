'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Receipt,
  Tags,
  PiggyBank,
  LogOut,
  WalletCards,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/actions/auth'

const navigation = [
  { name: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transações', href: '/transactions', icon: Receipt },
  { name: 'Categorias', href: '/categories', icon: Tags },
  { name: 'Orçamentos & Metas', href: '/budgets', icon: PiggyBank },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl flex flex-col justify-between p-5 min-h-screen text-slate-200">
      <div className="space-y-8">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <WalletCards className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              FinFlow <span className="text-[10px] uppercase font-semibold bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/30">Pro</span>
            </h1>
            <p className="text-xs text-slate-400">Orçamento Inteligente</p>
          </div>
        </div>

        {/* Links de Navegação */}
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Seção Inferior / Logout */}
      <div className="space-y-4 pt-6 border-t border-slate-800/80">
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Supabase Sync</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Seus dados são protegidos por Row Level Security em tempo real.
          </p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair da Conta
          </button>
        </form>
      </div>
    </aside>
  )
}
