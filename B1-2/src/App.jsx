import useBooks from './hooks/useBooks.js'
import { isRemote, dataSource } from './lib/supabase.js'
import BooksQueryBoundary from './components/BooksQueryBoundary.jsx'
import RemoteReadOnly from './components/RemoteReadOnly.jsx'
import { useState } from 'react'
import { books as initialBooks } from './lib/books.js'
import { readingStatuses } from './lib/readingStatuses.js'
import { Route, Routes } from 'react-router'
import AppLayout from './components/AppLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import BooksPage from './pages/BooksPage.jsx'
import AuthorsPage from './pages/AuthorsPage.jsx'
import AuthorBooksPage from './pages/AuthorBooksPage.jsx'
import BookDetailPage from './pages/BookDetailPage.jsx'
import NewBookPage from './pages/NewBookPage.jsx'
import EditBookPage from './pages/EditBookPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  // 여러 페이지가 함께 사용하는 책 상태는 공통 부모인 App에 둡니다.
  const [demoBooks, setBooks] = useState(initialBooks)
  const remote = useBooks(isRemote)
  const books = isRemote ? (remote.data || []) : demoBooks

  function changeReadingStatus(id, status) {
    if (!readingStatuses.includes(status)) return
    // 이전 배열을 직접 바꾸지 않고, 해당 책만 새 객체로 교체합니다.
    setBooks((previousBooks) => previousBooks.map((book) => (
      book.id === id ? { ...book, status } : book
    )))
  }

  // 원격 저장 전, 제출 중 UI를 체험하기 위한 350ms의 모의 대기입니다.
  async function createBook(values) {
    const id = crypto.randomUUID()
    await new Promise((resolve) => setTimeout(resolve, 350))
    setBooks((previous) => [...previous, { ...values, id, color: '#5d684f', resources: [], isUserEdited: true }])
    return id
  }

  async function updateBook(id, values) {
    if (!books.some((book) => book.id === id)) throw new Error('Book not found')
    await new Promise((resolve) => setTimeout(resolve, 350))
    setBooks((previous) => previous.map((book) => book.id === id ? { ...book, ...values, isUserEdited: true } : book))
  }

  return (
    <Routes>
      {/* 공통 레이아웃의 Outlet 자리에 URL과 일치하는 페이지가 표시됩니다. */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route element={<BooksQueryBoundary loading={remote.loading} error={['demo', 'supabase'].includes(dataSource) ? remote.error : 'VITE_DATA_SOURCE는 demo 또는 supabase로 설정해주세요.'} onRetry={remote.retry} />}>
          <Route path="books" element={<BooksPage books={books} />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="authors/:authorId" element={<AuthorBooksPage books={books} />} />
          <Route path="books/new" element={isRemote ? <RemoteReadOnly title="책 등록" /> : <NewBookPage onCreateBook={createBook} />} />
          <Route path="books/:id" element={<BookDetailPage books={books} onStatusChange={changeReadingStatus} />} />
          <Route path="books/:id/edit" element={isRemote ? <RemoteReadOnly title="책 수정" /> : <EditBookPage books={books} onUpdateBook={updateBook} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
