'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Category } from '@/types/database'

const DEFAULT_CATEGORIES = [
  { name: 'Salário & Renda', type: 'income', icon: 'wallet', color: '#10b981' },
  { name: 'Investimentos', type: 'income', icon: 'trending-up', color: '#06b6d4' },
  { name: 'Alimentação & Mercado', type: 'expense', icon: 'utensils', color: '#f59e0b' },
  { name: 'Moradia & Contas', type: 'expense', icon: 'home', color: '#ef4444' },
  { name: 'Transporte', type: 'expense', icon: 'car', color: '#8b5cf6' },
  { name: 'Lazer & Entretenimento', type: 'expense', icon: 'film', color: '#ec4899' },
  { name: 'Saúde & Farmácia', type: 'expense', icon: 'activity', color: '#14b8a6' },
]

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Retorna categorias padrão demonstrativas caso não haja sessão configurada
    return DEFAULT_CATEGORIES.map((c, i) => ({
      id: `default-${i}`,
      user_id: 'guest',
      name: c.name,
      type: c.type as 'income' | 'expense',
      icon: c.icon,
      color: c.color,
      created_at: new Date().toISOString(),
    }))
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error || !data || data.length === 0) {
    // Insere as categorias padrão caso a lista esteja vazia
    if (user && (!data || data.length === 0)) {
      const toInsert = DEFAULT_CATEGORIES.map(c => ({
        user_id: user.id,
        name: c.name,
        type: c.type,
        icon: c.icon,
        color: c.color,
      }))
      await supabase.from('categories').insert(toInsert)
      const { data: reloaded } = await supabase.from('categories').select('*').order('name')
      if (reloaded) return reloaded
    }
    return []
  }

  return data
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const name = formData.get('name') as string
  const type = formData.get('type') as 'income' | 'expense'
  const color = (formData.get('color') as string) || '#6366f1'
  const icon = (formData.get('icon') as string) || 'tag'

  await supabase.from('categories').insert({
    user_id: user.id,
    name,
    type,
    color,
    icon,
  })

  revalidatePath('/categories')
  revalidatePath('/transactions')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  await supabase.from('categories').delete().eq('id', id)
  revalidatePath('/categories')
}
