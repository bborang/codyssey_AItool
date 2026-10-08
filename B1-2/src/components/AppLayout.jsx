import { Link, NavLink, Outlet } from 'react-router'

export default function AppLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/">책 사이, 러시아</Link>
          <nav className="site-nav" aria-label="주요 메뉴">
            <NavLink to="/" end>홈</NavLink>
            <NavLink to="/books" end>나의 책장</NavLink>
            <NavLink to="/authors">작가별 책장</NavLink>
            <NavLink to="/books/new">책 등록</NavLink>
          </nav>
        </div>
      </header>
      <main id="main-content" className="page-content">
        <Outlet />
      </main>
      <footer className="site-footer">책을 읽다 멈춘 자리, 궁금함을 기록하는 책장.</footer>
    </>
  )
}
