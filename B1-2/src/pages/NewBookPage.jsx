import { Link, useNavigate } from 'react-router'
import BookForm from '../components/BookForm.jsx'
import PageHeading from '../components/PageHeading.jsx'

export default function NewBookPage({ onCreateBook }) {
  const navigate = useNavigate()
  async function saveBook(values) {
    const id = await onCreateBook(values)
    navigate(`/books/${id}`)
  }
  return (
    <section>
      <Link to="/books">← 나의 책장</Link>
      <PageHeading title="책장에 한 권 더" description="기본 정보부터 가볍게. 자료와 감상은 나중에 더해도 좋아요." />
      <p className="sample-notice">임시 저장 단계 · 등록한 책은 화면 이동 중 유지되며 새로고침하면 사라집니다.</p>
      <BookForm submitLabel="책 등록" onSave={saveBook} onCancel={() => navigate('/books')} />
    </section>
  )
}
