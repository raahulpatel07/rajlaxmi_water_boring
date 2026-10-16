-- RAJLAXMI WATER BORING
-- DATABASE AND STORAGE SETUP

-- 1. Authorized admin accounts

create table if not exists public.admin_users (
    user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.admin_users enable row level security;


-- 2. Gallery table

create table if not exists public.gallery_photos (
    id uuid primary key default gen_random_uuid(),

    title text not null
        check (char_length(title) between 1 and 100),

    location text not null default ''
        check (char_length(location) <= 120),

    image_path text not null unique,

    uploaded_by uuid not null
        references auth.users(id),

    created_at timestamptz not null default now()
);

alter table public.gallery_photos enable row level security;


-- 3. Public can read gallery records

create policy "Public can view gallery"
on public.gallery_photos
for select
to anon, authenticated
using (true);


-- 4. Admin can read own authorization record

create policy "Admin can read own authorization"
on public.admin_users
for select
to authenticated
using (
    user_id = (select auth.uid())
);


-- 5. Only authorized admin can insert gallery records

create policy "Admin can insert gallery"
on public.gallery_photos
for insert
to authenticated
with check (
    uploaded_by = (select auth.uid())

    and exists (
        select 1
        from public.admin_users
        where user_id = (select auth.uid())
    )

    and image_path like
        ((select auth.uid())::text || '/%')
);


-- 6. Only authorized admin can delete gallery records

create policy "Admin can delete gallery"
on public.gallery_photos
for delete
to authenticated
using (
    exists (
        select 1
        from public.admin_users
        where user_id = (select auth.uid())
    )
);


-- 7. Create gallery storage bucket

insert into storage.buckets (
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
)
values (
    'gallery',
    'gallery',
    true,
    5242880,
    array['image/webp']
)
on conflict (id) do update set
    public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;


-- 8. Only authorized admin can upload images

create policy "Admin can upload gallery images"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'gallery'

    and (storage.foldername(name))[1] =
        (select auth.uid())::text

    and exists (
        select 1
        from public.admin_users
        where user_id = (select auth.uid())
    )
);


-- 9. Only authorized admin can delete images

create policy "Admin can delete gallery images"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'gallery'

    and exists (
        select 1
        from public.admin_users
        where user_id = (select auth.uid())
    )
);