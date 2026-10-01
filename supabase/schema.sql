create table if not exists entradas (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  slug text not null,
  titulo text not null,
  fecha date not null,
  resumen text not null,
  contenido text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (categoria, slug)
);

alter table entradas enable row level security;

create policy "Lectura pública de entradas"
  on entradas for select
  using (true);