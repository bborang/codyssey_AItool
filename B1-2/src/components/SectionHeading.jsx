export default function SectionHeading({ title, count, description }) {
  return (
    <div className="section-heading">
      <h2>{title}{count !== undefined && <span className="section-count"> {count}</span>}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
