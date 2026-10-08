import { Link, useNavigate, useParams } from 'react-router'
import BookForm from '../components/BookForm.jsx'
import PageHeading from '../components/PageHeading.jsx'
import NotFoundPage from './NotFoundPage.jsx'

export default function EditBookPage({ books, onUpdateBook }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = books.find((item) => item.id === id)
  if (!book) return <NotFoundPage />
  async function saveBook(values) {
    await onUpdateBook(id, values)
    navigate(`/books/${id}`)
  }
  return (
    <section>
      <Link to={`/books/${id}`}>← 책 상세로</Link>
      <PageHeading title="책 정보 수정" description="책의 정보와 나의 독서 기록을 다듬어보세요." />
      <p className="sample-notice">임시 저장 단계 · 수정 내용은 새로고침하면 초기화됩니다.</p>
      {/* URL의 책이 바뀌면 폼의 초기 입력값도 새로 준비합니다. */}
      <BookForm key={book.id} initialBook={book} submitLabel="변경 저장" onSave={saveBook} onCancel={() => navigate(`/books/${id}`)} />
    </section>
  )
}
