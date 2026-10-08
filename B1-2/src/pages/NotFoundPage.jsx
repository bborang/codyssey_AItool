import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section>
      <p className="eyebrow">404 · 페이지를 찾을 수 없어요</p>
      <h1>찾으시는 책장이 없어요</h1>
      <p className="introduction">주소가 올바른지 확인하거나 나의 책장으로 돌아가주세요.</p>
      <div className="page-actions"><Link className="button-link" to="/books">나의 책장으로</Link></div>
    </section>
  )
}
