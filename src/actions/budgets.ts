'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Budget } from '@/types/database'
import { getCurrentMonthYear } from '@/lib/utils'

export async function getBudgets(monthYear?: string): Promise<Budget[]> {
  const currentMonth = monthYear || getCurrentMonthYear()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return [
      {
        id: 'budget-mock-1',
        user_id: 'guest',
        category_id: 'default-2',
        monthly_limit: 1200.0,
        month_year: currentMonth,
        created_at: new Date().toISOString(),
        category: { id: 'default-2', user_id: 'guest', name: 'Alimentação & Mercado', type: 'expense', icon: 'utensils', color: '#f59e0b', created_at: '' },
      },
      {
        id: 'budget-mock-2',
        user_id: 'guest',
        category_id: 'default-3',
        monthly_limit: 2000.0,
        month_year: currentMonth,
        created_at: new Date().toISOString(),
        category: { id: 'default-3', user_id: 'guest', name: 'Moradia & Contas', type: 'expense', icon: 'home', color: '#ef4444', created_at: '' },
      },
      {
        id: 'budget-mock-3',
        user_id: 'guest',
        category_id: 'default-4',
        monthly_limit: 400.0,
        month_year: currentMonth,
        created_at: new Date().toISOString(),
        category: { id: 'default-4', user_id: 'guest', name: 'Transporte', type: 'expense', icon: 'car', color: '#8b5cf6', created_at: '' },
      },
    ]
  }

  const { data, error } = await supabase
    .from('budgets')
    .select('*, category:categories(*)')
    .eq('month_year', currentMonth)

  if (error || !data) {
    return []
  }

  return data as Budget[]
}

export async function upsertBudget(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const categoryId = formData.get('categoryId') as string
  const monthlyLimit = parseFloat(formData.get('monthlyLimit') as string)
  const monthYear = (formData.get('monthYear') as string) || getCurrentMonthYear()

  if (isNaN(monthlyLimit) || monthlyLimit <= 0) {
    return
  }

  await supabase.from('budgets').upsert(
    {
      user_id: user.id,
      category_id: categoryId,
      monthly_limit: monthlyLimit,
      month_year: monthYear,
    },
    { onConflict: 'user_id,category_id,month_year' }
  )

  revalidatePath('/dashboard')
  revalidatePath('/budgets')
}
