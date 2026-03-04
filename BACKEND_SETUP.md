# Backend setup (Supabase)

Your booking form sends submissions to **Supabase** so you can view real data (emails, names, appointment details) in one place. No Netlify required; the site can be hosted anywhere (Vercel, GitHub Pages, Cloudflare Pages, etc.).

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up or log in.
2. Click **New project** → pick an organization → set name, database password, region → **Create project**.
3. Wait for the project to be ready.

---

## 2. Create the `bookings` table

In the Supabase dashboard:

1. Open **SQL Editor**.
2. Run this SQL (creates the table and enables Row Level Security so only you can read data):

```sql
-- Table for booking form submissions
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  last_name text,
  preferred_name text,
  date_of_birth text,
  phone text,
  sex text,
  gender text,
  reason text,
  consent_phi boolean default false,
  consent_marketing boolean default false,
  address text,
  city text,
  state text,
  zip text,
  appointment_date text,
  appointment_time text,
  payment_type text,
  insurance text,
  created_at timestamptz default now()
);

-- Allow anyone to INSERT (so the form can submit from your site)
-- Only authenticated users (you in the dashboard) can SELECT
alter table public.bookings enable row level security;

create policy "Allow anonymous insert"
  on public.bookings for insert
  to anon
  with check (true);

create policy "Allow authenticated read"
  on public.bookings for select
  to authenticated
  using (true);
```

3. Click **Run**.

---

## 3. Get your URL and anon key

1. In Supabase, go to **Project settings** (gear icon) → **API**.
2. Copy:
   - **Project URL** (e.g. `https://xxxxxxxx.supabase.co`)
   - **anon public** key (under "Project API keys").

---

## 4. Add them to your site

Open **book.html** and near the top of the `<script>` block set:

```javascript
const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key-here";
```

Replace with your real URL and anon key. Save and redeploy your site.

---

## 5. View submissions

- In Supabase: **Table Editor** → open the **bookings** table.
- You’ll see every submission with email, name, phone, appointment date/time, payment type, insurance, etc.
- You can filter, sort, export to CSV, or use the **SQL Editor** to run custom queries.

---

## Hosting (no Netlify)

Deploy the same static files (including `book.html` with Supabase keys) to any host:

- **Vercel:** Drag the folder or connect a Git repo.
- **GitHub Pages:** Push to a repo and enable Pages (branch `main`, root or `/docs`).
- **Cloudflare Pages:** Connect Git or upload the project folder.

The form will POST to Supabase from any of these; no server or Netlify required.
