export default function PageHeading({ eyebrow, title, description }) {
  return (
    <div className="page-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p className="introduction">{description}</p>}
    </div>
  )
}
