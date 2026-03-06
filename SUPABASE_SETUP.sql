-- ============================================
-- HIPAA-COMPLIANT SUPABASE DATABASE SETUP
-- ============================================
-- Run this SQL in Supabase SQL Editor
-- This creates tables with proper Row Level Security

-- 1. BOOKINGS TABLE
-- Stores patient booking information with PHI
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  last_name text,
  preferred_name text,
  date_of_birth text, -- encrypted at application layer
  phone text,         -- encrypted at application layer
  sex text,
  gender text,
  reason text,
  consent_phi boolean default false,
  consent_marketing boolean default false,
  address text,      -- encrypted at application layer
  city text,
  state text,
  zip text,
  appointment_date text,
  appointment_time text,
  payment_type text,
  insurance text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.bookings enable row level security;

-- Policy: Allow anonymous insert (for booking form submissions)
-- RLS ensures data can only be inserted, not read without authentication
create policy "Allow anonymous insert only"
  on public.bookings for insert
  to anon
  with check (true);

-- Policy: Only authenticated users can read (you in the dashboard)
create policy "Allow authenticated read only"
  on public.bookings for select
  to authenticated
  using (true);

-- Policy: Only authenticated users can update
create policy "Allow authenticated update only"
  on public.bookings for update
  to authenticated
  using (true)
  with check (true);

-- Add index for email lookups (for authentication)
create index if not exists bookings_email_idx on public.bookings(email);

-- Add index for created_at (for sorting)
create index if not exists bookings_created_at_idx on public.bookings(created_at desc);

-- ============================================
-- 2. AUDIT LOGS TABLE
-- Tracks all PHI access for HIPAA compliance
-- ============================================
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  event_type text not null, -- e.g., 'PHI_ACCESS', 'AUTH_SUCCESS', 'AUTH_FAILED'
  event_timestamp timestamptz default now(),
  user_ip text,
  user_identifier text, -- email or user ID
  action text not null, -- e.g., 'BOOKING_CREATED', 'LOGIN_ATTEMPT'
  resource text,        -- e.g., 'bookings', 'authentication'
  status text not null, -- e.g., 'SUCCESS', 'FAILED', 'BLOCKED'
  details text,         -- additional context
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.audit_logs enable row level security;

-- Policy: Allow service role to insert audit logs
create policy "Allow service role insert"
  on public.audit_logs for insert
  to service_role
  with check (true);

-- Policy: Only authenticated users can read audit logs
create policy "Allow authenticated read audit logs"
  on public.audit_logs for select
  to authenticated
  using (true);

-- Add indexes for audit log queries
create index if not exists audit_logs_timestamp_idx on public.audit_logs(event_timestamp desc);
create index if not exists audit_logs_user_identifier_idx on public.audit_logs(user_identifier);
create index if not exists audit_logs_event_type_idx on public.audit_logs(event_type);

-- ============================================
-- 3. SESSIONS TABLE (Optional - for patient portal)
-- ============================================
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  session_token text unique not null,
  user_id uuid references public.bookings(id) on delete cascade,
  user_email text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now(),
  last_accessed timestamptz default now(),
  ip_address text
);

-- Enable Row Level Security
alter table public.sessions enable row level security;

-- Policy: Service role can manage sessions
create policy "Service role manages sessions"
  on public.sessions for all
  to service_role
  using (true)
  with check (true);

-- Add index for session token lookups
create index if not exists sessions_token_idx on public.sessions(session_token);
create index if not exists sessions_expires_idx on public.sessions(expires_at);

-- ============================================
-- 4. AUTOMATIC UPDATED_AT TRIGGER
-- ============================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_bookings_updated_at
  before update on public.bookings
  for each row
  execute function update_updated_at_column();

-- ============================================
-- 5. CLEANUP OLD SESSIONS (Run periodically)
-- ============================================
-- Create a function to clean up expired sessions
create or replace function cleanup_expired_sessions()
returns void as $$
begin
  delete from public.sessions where expires_at < now();
end;
$$ language plpgsql security definer;

-- Optional: Create a cron job to run this daily
-- (Requires pg_cron extension - enable in Supabase Dashboard > Database > Extensions)
-- select cron.schedule('cleanup-sessions', '0 2 * * *', 'select cleanup_expired_sessions()');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify setup:

-- Check RLS is enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
and tablename in ('bookings', 'audit_logs', 'sessions');

-- Check policies exist
select tablename, policyname, cmd, qual
from pg_policies
where schemaname = 'public';

-- Test insert (should work)
-- insert into public.bookings (email, first_name, last_name, consent_phi)
-- values ('test@example.com', 'Test', 'User', true);

-- Test select (should fail for anon, work for authenticated)
-- select * from public.bookings;
