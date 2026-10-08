-- 공개 예시 책과 자료. 기존 id의 데이터는 덮어쓰지 않습니다.
begin;
insert into public.books (id,title,author_id,genre,status,color,note,is_sample) values ('masquerade','가면무도회','lermontov','희곡','완독','#643f49','음악을 듣다가 원작이 궁금해졌다. 책을 읽고 같은 음악을 다시 들어보고 싶다.',true) on conflict (id) do nothing;
insert into public.book_resources (id,book_id,category,title,description,url,source,spoiler,position) values ('masquerade-music','masquerade','음악·예술','책에서 무대로, 하차투리안의 왈츠','1941년 바흐탄고프 극장의 『가면무도회』 공연을 위해 하차투리안이 음악을 썼다. 공연 기록에서 책과 음악의 연결을 살펴볼 수 있다.','https://vakhtangov.ru/en/show/maskarad/','바흐탄고프 극장 공연 기록',false,0) on conflict (id) do nothing;
insert into public.book_resources (id,book_id,category,title,description,url,source,spoiler,position) values ('masquerade-names','masquerade','이름·호칭','이름과 부칭은 어떻게 구분할까?','같은 인물이 다른 호칭으로 등장할 때 다시 확인할 자료를 찾아두고 싶다. 아직 해설과 출처를 추가하지 않은 질문 메모다.','','',false,1) on conflict (id) do nothing;
insert into public.book_resources (id,book_id,category,title,description,url,source,spoiler,position) values ('masquerade-ending','masquerade','독서 메모','마지막 장면을 읽고 다시 듣기','마지막 장면을 읽은 뒤 음악의 인상이 어떻게 달라졌는지 여기에 기록해보기. 스포일러 접기 기능을 보여주는 예시 메모다.','','',true,2) on conflict (id) do nothing;
insert into public.books (id,title,author_id,genre,status,color,note,is_sample) values ('first-love','첫사랑','turgenev','소설','완독','#5d684f','',true) on conflict (id) do nothing;
insert into public.books (id,title,author_id,genre,status,color,note,is_sample) values ('forged-coupon','위조 쿠폰','tolstoy','소설','완독','#8a6648','',true) on conflict (id) do nothing;
insert into public.books (id,title,author_id,genre,status,color,note,is_sample) values ('overcoat-nose','외투 · 코','gogol','소설','완독','#475e68','',true) on conflict (id) do nothing;
commit;
