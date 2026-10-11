'use client'

import { Bell, Search, ShieldCheck } from 'lucide-react'

export function Header() {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/60 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Pesquisar registros, categorias..."
            className="pl-9 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>RLS Ativo</span>
        </div>

        <button className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-2 right-2 ring-2 ring-slate-950"></span>
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
            U
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-semibold text-slate-200 leading-none">Usuário</p>
            <p className="text-[11px] text-slate-500 leading-tight">Plano Pessoal</p>
          </div>
        </div>
      </div>
    </header>
  )
}
