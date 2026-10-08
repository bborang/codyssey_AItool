import { Link } from 'react-router'

export default function HomePage() {
  return (
    <section className="home-page">
      <p className="eyebrow">러시아 문학 책장</p>
      <h1>책 사이, 러시아</h1>
      <p className="introduction">
        낯선 이름부터 한 곡의 음악까지.
        <br />
        읽다가 찾은 것들을 그 책 곁에 놓아두세요.
      </p>
      <div className="page-actions"><Link className="button-link" to="/books">나의 책장 둘러보기</Link></div>
      <section className="shelf-introduction" aria-labelledby="shelf-title">
        <h2 id="shelf-title">책과 함께 넓어지는 독서</h2>
        <p>
          읽은 책과 읽고 싶은 책을 모으고, 이름·문화·역사·음악에 관한
          궁금함을 기록하는 공간입니다.
        </p>
      </section>
    </section>
  )
}
