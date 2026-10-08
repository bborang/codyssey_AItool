import { useId } from 'react'
import { readingStatuses } from '../lib/readingStatuses.js'

export default function ReadingStatusSelect({ value, onChange }) {
  const id = useId()
  return (
    <div className="reading-status-control">
      <label htmlFor={id}>독서 상태 변경</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {readingStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
      <p className="control-feedback" role="status">현재 상태: {value}</p>
    </div>
  )
}
