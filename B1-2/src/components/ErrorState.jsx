export default function ErrorState({ message, onRetry }) {
  return (
    <div className="empty-state">
      <p className="field-error" role="alert">{message}</p>
      {onRetry && <button className="secondary-button" type="button" onClick={onRetry}>다시 시도</button>}
    </div>
  )
}
