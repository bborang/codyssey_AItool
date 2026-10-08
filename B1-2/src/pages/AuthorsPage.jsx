import { Link } from 'react-router'
import { authors } from '../lib/authors.js'

export default function AuthorsPage() {
  return (
    <section>
      <p className="eyebrow">작가별 책장</p>
      <h1>한 작가를 따라 읽기</h1>
      <p className="introduction">궁금한 작가의 책장으로 들어가보세요.</p>
      <ul className="author-list">
        {authors.map((author) => (
          <li key={author.id}><Link to={`/authors/${author.id}`}>{author.name} <span aria-hidden="true">↗</span></Link></li>
        ))}
      </ul>
    </section>
  )
}
