import { isRemote } from '../lib/supabase.js'
import { useState } from 'react'
import BookList from '../components/BookList.jsx'
import BookFilters from '../components/BookFilters.jsx'
import EmptyState from '../components/EmptyState.jsx'
import LinkButton from '../components/LinkButton.jsx'
import PageHeading from '../components/PageHeading.jsx'
import { authors } from '../lib/authors.js'

export default function BooksPage({ books }) {
  // 검색 조건은 이 화면에서만 필요하므로 페이지 안에서 관리합니다.
  const [query, setQuery] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [status, setStatus] = useState('')

  // 결과 목록과 개수는 원본과 검색 조건에서 계산합니다. 별도 state가 아닙니다.
  const searchTerm = query.trim().toLocaleLowerCase()
  const filteredBooks = books.filter((book) => {
    const authorName = authors.find((author) => author.id === book.authorId)?.name ?? ''
    const matchesQuery = `${book.title} ${authorName}`.toLocaleLowerCase().includes(searchTerm)
    return matchesQuery && (!authorId || book.authorId === authorId) && (!status || book.status === status)
  })

  function resetFilters() {
    setQuery('')
    setAuthorId('')
    setStatus('')
  }

  return (
    <section>
      <div className="heading-with-action">
        <PageHeading eyebrow="나의 책장" title="책과 함께 모은 이야기" description="읽은 책과 읽고 싶은 책을 한곳에 모아보세요." />
        <LinkButton to="/books/new">＋ 책 등록</LinkButton>
      </div>
      <p className="sample-notice">{isRemote ? 'Supabase 책장 · 원격 조회 연결' : '임시 책장 · 등록·수정한 내용은 새로고침하면 초기화됩니다.'}</p>
      <BookFilters query={query} authorId={authorId} status={status} authors={authors}
        onQueryChange={setQuery} onAuthorChange={setAuthorId} onStatusChange={setStatus} onReset={resetFilters} />
      <p className="result-count" role="status">전체 {books.length}권 중 {filteredBooks.length}권</p>
      {books.length > 0 && filteredBooks.length === 0 ? (
        <EmptyState title="조건에 맞는 책이 없어요" description="검색어나 필터를 바꾸거나, 위의 초기화 버튼을 눌러보세요." />
      ) : <BookList books={filteredBooks} authors={authors} />}
    </section>
  )
}
