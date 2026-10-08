-- 새 실습용 Supabase 프로젝트에서 실행합니다. 공개 예시 자료만 저장하세요.
-- 테이블이 이미 있으면 덮어쓰지 않고 중단됩니다.
begin;
create table public.books (
  id text primary key default gen_random_uuid()::text,
  title text not null check (char_length(trim(title)) between 1 and 100),
  author_id text not null check (author_id in ('turgenev','tolstoy','lermontov','gogol')),
  genre text not null default '소설' check (genre in ('소설','희곡','시','기타')),
  status text not null default '읽기 전' check (status in ('읽기 전','읽는 중','완독')),
  color text not null default '#5d684f',
  note text not null default '' check (char_length(note) <= 2000),
  is_sample boolean not null default false,
  created_at timestamptz not null default now()
);
create table public.book_resources (
  id text primary key default gen_random_uuid()::text,
  book_id text not null references public.books(id) on delete cascade,
  category text not null,
  title text not null check (length(trim(title)) > 0),
  description text not null default '',
  url text not null default '' check (url = '' or url ~ '^https?://'),
  source text not null default '',
  spoiler boolean not null default false,
  position integer not null default 0
);
create index book_resources_book_id_idx on public.book_resources(book_id);
alter table public.books enable row level security;
alter table public.book_resources enable row level security;
revoke all on public.books, public.book_resources from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.books, public.book_resources to anon, authenticated;
create policy "Public sample books are readable" on public.books for select to anon, authenticated using (true);
create policy "Public sample resources are readable" on public.book_resources for select to anon, authenticated using (true);
-- INSERT / UPDATE / DELETE는 아직 허용하지 않습니다. 스텝 7에서 범위를 결정합니다.
commit;
