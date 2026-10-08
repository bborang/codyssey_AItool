import { getSupabase } from './supabase.js'

const columns = 'id,title,author_id,genre,status,color,note,is_sample,book_resources(id,category,title,description,url,source,spoiler,position)'

export function toBook(row) {
  return {
    id: row.id, title: row.title, authorId: row.author_id, genre: row.genre,
    status: row.status, color: row.color, note: row.note, isUserEdited: !row.is_sample,
    resources: [...(row.book_resources || [])].sort((a, b) => a.position - b.position),
  }
}

function queryError() {
  return new Error('책을 불러오지 못했어요. 네트워크 연결과 Supabase 테이블·조회 권한·키 설정을 확인한 뒤 다시 시도해주세요.')
}

export async function fetchBooks(signal) {
  const { data, error } = await getSupabase().from('books').select(columns).order('created_at').order('id').abortSignal(signal)
  if (error) throw queryError()
  return data.map(toBook)
}

export async function fetchBook(id, signal) {
  const { data, error } = await getSupabase().from('books').select(columns).eq('id', id).abortSignal(signal).maybeSingle()
  if (error) throw queryError()
  return data ? toBook(data) : null
}
