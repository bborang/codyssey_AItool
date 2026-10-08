import { useCallback } from 'react'
import useRemoteQuery from './useRemoteQuery.js'
import { fetchBook } from '../lib/booksApi.js'

export default function useBookDetail(id, enabled) {
  // Effect의 요청 함수가 렌더링마다 새 참조가 되어 재요청되는 것을 방지합니다.
  const load = useCallback((signal) => fetchBook(id, signal), [id])
  return useRemoteQuery(`book:${id}`, load, enabled)
}
