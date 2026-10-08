export default function Loading({ message = '책을 불러오고 있어요.' }) {
  return <div className="empty-state" role="status" aria-live="polite"><p>{message}</p></div>
}
