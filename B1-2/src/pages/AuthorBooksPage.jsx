import { isRemote } from '../lib/supabase.js'
import { Link, useParams } from 'react-router'
import BookList from '../components/BookList.jsx'
import PageHeading from '../components/PageHeading.jsx'
import { authors } from '../lib/authors.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function AuthorBooksPage({ books }) {
  const { authorId } = useParams()
  const author = authors.find((item) => item.id === authorId)
  if (!author) return <NotFoundPage />
  const authorBooks = books.filter((book) => book.authorId === authorId)

  return (
    <section>
      <Link to="/authors">← 작가별 책장</Link>
      <PageHeading title={author.name} description="한 작가의 작품과 그 곁에 모아둔 이야기." />
      <p className="sample-notice">{isRemote ? 'Supabase 책장' : '임시 책장'} · {authorBooks.length}권</p>
      <BookList books={authorBooks} authors={authors} />
    </section>
  )
}
