-- SCRIPT SQL PARA O SUPABASE (Cole no SQL Editor do Supabase)
-- Criação das tabelas para o Aplicativo de Orçamento Pessoal

create extension if not exists "uuid-ossp";

-- 1. Tabela de Perfis
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  currency text default 'BRL',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger para criar perfil automaticamente no cadastro
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Tabela de Categorias
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  type text check (type in ('income', 'expense')) not null,
  icon text default 'tag',
  color text default '#6366f1',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Tabela de Transações
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  description text not null,
  amount numeric(12, 2) not null check (amount > 0),
  type text check (type in ('income', 'expense')) not null,
  transaction_date date not null default current_date,
  payment_method text default 'pix',
  status text check (status in ('paid', 'pending')) default 'paid',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Tabela de Orçamentos (Metas Mensais)
create table if not exists public.budgets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete cascade not null,
  monthly_limit numeric(12, 2) not null check (monthly_limit > 0),
  month_year text not null, -- Ex: '2026-10'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, category_id, month_year)
);

-- Ativar RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;

-- Políticas de Segurança (RLS)
create policy "Usuários podem ver seu próprio perfil" on public.profiles for select using (auth.uid() = id);
create policy "Usuários podem atualizar seu próprio perfil" on public.profiles for update using (auth.uid() = id);

create policy "Usuários gerenciam suas próprias categorias" on public.categories for all using (auth.uid() = user_id);
create policy "Usuários gerenciam suas próprias transações" on public.transactions for all using (auth.uid() = user_id);
create policy "Usuários gerenciam seus próprios orçamentos" on public.budgets for all using (auth.uid() = user_id);
