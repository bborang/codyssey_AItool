export default function ResourceCard({ resource }) {
  const content = (
    <>
      <p className="resource-description">{resource.description}</p>
      {resource.url ? (
        <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.source || '참고 자료'} ↗ <span className="sr-only">(새 탭)</span></a>
      ) : <p className="resource-source">아직 연결된 출처가 없습니다.</p>}
    </>
  )

  return (
    <article className="resource-card">
      <span className="resource-category">{resource.category}</span>
      <h3>{resource.title}</h3>
      {resource.spoiler ? (
        <details><summary>스포일러 포함 · 내용 펼치기</summary>{content}</details>
      ) : content}
    </article>
  )
}
