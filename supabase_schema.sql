-- Supabase Database Schema for Cinematic Presets Shop

-- 1. Create presets table
CREATE TABLE presets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price_num NUMERIC NOT NULL,
  cover_image_url TEXT,
  video_sample_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create orders table for checking out
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  preset_id UUID REFERENCES presets(id),
  amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, verified, delivered
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Setup Row Level Security (RLS) policies

-- Enable RLS
ALTER TABLE presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Presets Policies:
-- Anyone can view active presets
CREATE POLICY "Public can view active presets" ON presets
  FOR SELECT USING (is_active = true);

-- Only authenticated admins can insert/update/delete presets
CREATE POLICY "Admins can manage presets" ON presets
  USING (auth.uid() IS NOT NULL);

-- Orders Policies:
-- Anyone can insert a new order (from the public checkout)
CREATE POLICY "Public can insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Only authenticated admins can view and manage orders
CREATE POLICY "Admins can manage orders" ON orders
  USING (auth.uid() IS NOT NULL);

-- 4. Setup Storage Bucket for Presets Media

-- Make sure to enable the Storage API if it isn't already.
-- Create a new bucket named 'presets'
insert into storage.buckets (id, name, public) 
values ('presets', 'presets', true);

-- Enable RLS on the storage.objects table for the new bucket
-- Only authenticated users (admins) can upload/delete
create policy "Admins can upload media"
  on storage.objects for insert
  with check ( bucket_id = 'presets' and auth.uid() is not null );

create policy "Admins can update media"
  on storage.objects for update
  using ( bucket_id = 'presets' and auth.uid() is not null );

create policy "Admins can delete media"
  on storage.objects for delete
  using ( bucket_id = 'presets' and auth.uid() is not null );

-- Public can read all objects in the bucket
create policy "Public can view media"
  on storage.objects for select
  using ( bucket_id = 'presets' );
