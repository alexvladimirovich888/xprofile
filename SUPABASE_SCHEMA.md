# Supabase Schema Setup

Execute the following SQL in your Supabase SQL Editor to create or **repair** the necessary tables for X Manager Dashboard.

## 0. Sync / Repair Existing Table
If you already have a `projects` table but see errors about "missing columns", run this script to ensure all columns exist:

```sql
-- Safely add missing columns to projects table
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='ticker') THEN
    ALTER TABLE projects ADD COLUMN ticker TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='description') THEN
    ALTER TABLE projects ADD COLUMN description TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='type') THEN
    ALTER TABLE projects ADD COLUMN type TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='pnl') THEN
    ALTER TABLE projects ADD COLUMN pnl TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='avatar_url') THEN
    ALTER TABLE projects ADD COLUMN avatar_url TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='projects' AND column_name='banner_url') THEN
    ALTER TABLE projects ADD COLUMN banner_url TEXT;
  END IF;
END $$;
```

## 1. Create Tables (New Setup)

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
  profile_url TEXT,
  notes TEXT,
  badge TEXT CHECK (badge IN ('GOLD', 'BLUE', 'NONE')) DEFAULT 'NONE',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ticker TEXT,
  description TEXT,
  type TEXT CHECK (type IN ('COMMUNITY', 'PERSONAL_PAGE', 'PROJECT_WITH_WEBSITE')),
  pnl TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for grouping accounts into projects (optional but recommended)
CREATE TABLE project_accounts (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, account_id)
);

-- Enable RLS and add basic policies (Modify as needed for your auth system)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all" ON "public"."projects" FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all" ON "public"."projects" FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all" ON "public"."projects" FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all" ON "public"."projects" FOR DELETE USING (true);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all" ON "public"."accounts" FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all" ON "public"."accounts" FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all" ON "public"."accounts" FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all" ON "public"."accounts" FOR DELETE USING (true);
```

## 2. Storage Setup

You need to create a storage bucket to store project images (avatars and banners).

1. Go to **Storage** in your Supabase Dashboard.
2. Click **New Bucket**.
3. Name it `project-assets`.
4. Make sure it is set to **Public** (so anyone with the link can view the images).

### Add Storage Policies (REQUIRED)
Even if a bucket is public, Supabase usually requires policies to allow browsers to upload:

1. Go to **Storage** -> **Policies**.
2. Find the `project-assets` bucket.
3. Click "Insert" policy -> Choose "Provide access to all users".
4. Repeat for "Select", "Update", and "Delete".

Alternatively, run this in the SQL Editor:
```sql
CREATE POLICY "Public Read" ON storage.objects FOR SELECT USING (bucket_id = 'project-assets');
CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-assets');
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'project-assets');
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'project-assets');
```

## 3. Row Level Security (RLS)

By default, all tables are protected. You can enable RLS and add policies if you plan to use Supabase Auth. 
Since this dashboard uses a custom administrative login (`xmanage123`), you might want to restrict all access to a specific service role or set up proper RLS once you integrate Supabase Auth.

## 3. Environment Variables

Make sure to add these to your environment (Secrets in AI Studio):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
