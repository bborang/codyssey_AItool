import { useEffect, useState } from 'react'

// 요청 대상이 바뀌거나 화면을 떠나면 이전 응답이 새 화면을 덮지 않게 합니다.
export default function useRemoteQuery(queryKey, load, enabled = true) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({ key: null, data: null, error: null, loading: true })
  const key = `${queryKey}:${attempt}`

  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    let active = true
    Promise.resolve().then(() => load(controller.signal)).then(
      (data) => { if (active) setResult({ key, data, error: null, loading: false }) },
      (error) => { if (active) setResult({ key, data: null, error: error.message || '데이터를 불러오지 못했어요.', loading: false }) },
    )
    return () => { active = false; controller.abort() }
  }, [key, load, enabled])

  return {
    data: enabled && result.key === key ? result.data : null,
    error: enabled && result.key === key ? result.error : null,
    loading: enabled && (result.key !== key || result.loading),
    retry: () => setAttempt((value) => value + 1),
  }
}
