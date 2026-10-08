import { createClient } from '@supabase/supabase-js'

export const dataSource = import.meta.env.VITE_DATA_SOURCE || 'demo'
export const isRemote = dataSource === 'supabase'
let client

export function getSupabase() {
  if (client) return client
  const url = import.meta.env.VITE_SUPABASE_URL?.trim()
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()
  if (!url || !key) throw new Error('Supabase URL과 공개용 키를 .env.local에 입력하고 개발 서버를 다시 시작해주세요.')
  if (!key.startsWith('sb_publishable_')) throw new Error('Publishable key를 사용해주세요. secret 또는 service_role 키는 사용할 수 없습니다.')
  try {
    client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
  } catch {
    throw new Error('Supabase 프로젝트 URL 형식을 확인해주세요.')
  }
  return client
}
