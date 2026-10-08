import { useId } from 'react'
import { readingStatuses } from '../lib/readingStatuses.js'

export default function BookFilters({ query, authorId, status, authors, onQueryChange, onAuthorChange, onStatusChange, onReset }) {
  const id = useId()
  const hasFilters = query !== '' || authorId !== '' || status !== ''
  return (
    <div className="book-filters">
      <div className="filter-fields">
        <div>
          <label htmlFor={`${id}-query`}>책 제목·작가 검색</label>
          <input id={`${id}-query`} type="search" value={query} placeholder="예: 첫사랑, 고골" onChange={(event) => onQueryChange(event.target.value)} />
        </div>
        <div>
          <label htmlFor={`${id}-author`}>작가</label>
          <select id={`${id}-author`} value={authorId} onChange={(event) => onAuthorChange(event.target.value)}>
            <option value="">전체 작가</option>
            {authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
          </select>
        </div>
      </div>
      <div className="filter-bottom">
        <div className="status-filters" role="group" aria-label="독서 상태 필터">
          {['', ...readingStatuses].map((item) => (
            <button key={item} type="button" aria-pressed={status === item} onClick={() => onStatusChange(item)}>{item || '전체'}</button>
          ))}
        </div>
        <button className="filter-reset" type="button" onClick={onReset} disabled={!hasFilters}>검색·필터 초기화</button>
      </div>
    </div>
  )
}
