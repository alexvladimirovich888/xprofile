# Supabase Schema Setup

Execute the following SQL in your Supabase SQL Editor to create the necessary tables for X Manager Dashboard.

## 1. Create Tables

```sql
-- Accounts Table
CREATE TABLE accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  handle TEXT NOT NULL,
  display_name TEXT,
  followers INTEGER DEFAULT 0,
  category TEXT,
  status TEXT CHECK (status IN ('ACTIVE', 'BANNED')) DEFAULT 'ACTIVE',
  email TEXT,
  password TEXT,
  recovery_email TEXT,
  notes TEXT,
  badge TEXT CHECK (badge IN ('GOLD', 'BLUE', 'NONE')) DEFAULT 'NONE',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  profile_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for grouping accounts into projects (optional but recommended)
CREATE TABLE project_accounts (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, account_id)
);
```

## 2. Row Level Security (RLS)

By default, all tables are protected. You can enable RLS and add policies if you plan to use Supabase Auth. 
Since this dashboard uses a custom administrative login (`xmanage123`), you might want to restrict all access to a specific service role or set up proper RLS once you integrate Supabase Auth.

## 3. Environment Variables

Make sure to add these to your environment (Secrets in AI Studio):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
