export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  currency: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  user_id: string
  name: string
  type: 'income' | 'expense'
  icon: string
  color: string
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  category_id: string | null
  description: string
  amount: number
  type: 'income' | 'expense'
  transaction_date: string
  payment_method: string
  status: 'paid' | 'pending'
  created_at: string
  category?: Category | null
}

export interface Budget {
  id: string
  user_id: string
  category_id: string
  monthly_limit: number
  month_year: string
  created_at: string
  category?: Category | null
}
