import { Link } from 'react-router'
import BookCover from './BookCover.jsx'
import StatusBadge from './StatusBadge.jsx'

export default function BookCard({ book, author }) {
  return (
    <article className="book-card">
      <Link className="book-card-link" to={`/books/${book.id}`} aria-label={`${book.title} 상세 보기`}>
        <BookCover title={book.title} author={author} genre={book.genre} color={book.color} />
        <h2>{book.title}</h2>
      </Link>
      <p className="book-author">{author}</p>
      <div className="book-meta"><StatusBadge status={book.status} /><span>자료 {book.resources.length}개</span></div>
    </article>
  )
}
