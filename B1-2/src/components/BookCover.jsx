export default function BookCover({ title, author, genre, color }) {
  // 실제 출판물 표지 대신 제목으로 구성한 책 정보 패널입니다.
  return (
    <div className="book-cover" style={{ backgroundColor: color }}>
      <span className="cover-genre">{genre}</span>
      <span className="cover-title">{title}</span>
      <span className="cover-author">{author}</span>
    </div>
  )
}
