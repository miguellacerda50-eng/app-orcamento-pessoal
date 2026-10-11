'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Transaction } from '@/types/database'

export async function getTransactions(): Promise<Transaction[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // Dados de demonstração inicial caso ainda não esteja conectado a uma conta real
    return [
      {
        id: 'mock-1',
        user_id: 'guest',
        category_id: 'default-0',
        description: 'Salário Mensal',
        amount: 6500.0,
        type: 'income',
        transaction_date: new Date().toISOString().slice(0, 10),
        payment_method: 'ted',
        status: 'paid',
        created_at: new Date().toISOString(),
        category: { id: 'default-0', user_id: 'guest', name: 'Salário & Renda', type: 'income', icon: 'wallet', color: '#10b981', created_at: '' },
      },
      {
        id: 'mock-2',
        user_id: 'guest',
        category_id: 'default-2',
        description: 'Supermercado Mensal',
        amount: 850.4,
        type: 'expense',
        transaction_date: new Date().toISOString().slice(0, 10),
        payment_method: 'credit_card',
        status: 'paid',
        created_at: new Date().toISOString(),
        category: { id: 'default-2', user_id: 'guest', name: 'Alimentação & Mercado', type: 'expense', icon: 'utensils', color: '#f59e0b', created_at: '' },
      },
      {
        id: 'mock-3',
        user_id: 'guest',
        category_id: 'default-3',
        description: 'Aluguel & Condomínio',
        amount: 1900.0,
        type: 'expense',
        transaction_date: new Date().toISOString().slice(0, 10),
        payment_method: 'pix',
        status: 'paid',
        created_at: new Date().toISOString(),
        category: { id: 'default-3', user_id: 'guest', name: 'Moradia & Contas', type: 'expense', icon: 'home', color: '#ef4444', created_at: '' },
      },
      {
        id: 'mock-4',
        user_id: 'guest',
        category_id: 'default-4',
        description: 'Combustível',
        amount: 220.0,
        type: 'expense',
        transaction_date: new Date().toISOString().slice(0, 10),
        payment_method: 'debit_card',
        status: 'paid',
        created_at: new Date().toISOString(),
        category: { id: 'default-4', user_id: 'guest', name: 'Transporte', type: 'expense', icon: 'car', color: '#8b5cf6', created_at: '' },
      },
    ]
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*, category:categories(*)')
    .order('transaction_date', { ascending: false })

  if (error || !data) {
    return []
  }

  return data as Transaction[]
}

export async function createTransaction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Usuário não autenticado' }

  const description = formData.get('description') as string
  const amount = parseFloat(formData.get('amount') as string)
  const type = formData.get('type') as 'income' | 'expense'
  const categoryId = formData.get('categoryId') as string
  const transactionDate = (formData.get('transactionDate') as string) || new Date().toISOString().slice(0, 10)
  const paymentMethod = (formData.get('paymentMethod') as string) || 'pix'
  const status = (formData.get('status') as 'paid' | 'pending') || 'paid'

  if (isNaN(amount) || amount <= 0) {
    return { error: 'O valor da transação deve ser positivo e válido.' }
  }

  const { error } = await supabase.from('transactions').insert({
    user_id: user.id,
    description,
    amount,
    type,
    category_id: categoryId || null,
    transaction_date: transactionDate,
    payment_method: paymentMethod,
    status,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/transactions')
  return { success: true }
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  await supabase.from('transactions').delete().eq('id', id)
  revalidatePath('/dashboard')
  revalidatePath('/transactions')
}
