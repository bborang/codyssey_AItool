import BookCard from './BookCard.jsx'
import EmptyState from './EmptyState.jsx'

export default function BookList({ books, authors }) {
  if (books.length === 0) {
    return <EmptyState title="아직 책이 없어요" description="이 책장에 담을 첫 책을 골라보세요." />
  }

  return (
    <ul className="book-grid">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} author={authors.find((author) => author.id === book.authorId)?.name ?? '작가 미상'} />
        </li>
      ))}
    </ul>
  )
}
