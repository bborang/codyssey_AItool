import { useId, useRef, useState } from 'react'
import BookCover from './BookCover.jsx'
import StatusBadge from './StatusBadge.jsx'
import { authors } from '../lib/authors.js'
import { readingStatuses } from '../lib/readingStatuses.js'
import { bookGenres, validateBook } from '../lib/bookForm.js'

export default function BookForm({ initialBook, submitLabel, onSave, onCancel }) {
  const formId = useId()
  const submitting = useRef(false)
  const [values, setValues] = useState({
    title: initialBook?.title ?? '', authorId: initialBook?.authorId ?? '',
    genre: initialBook?.genre ?? '소설', status: initialBook?.status ?? '읽기 전',
    note: initialBook?.note ?? '',
  })
  const [errors, setErrors] = useState({})
  const [saveError, setSaveError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const author = authors.find((item) => item.id === values.authorId)

  function changeField(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    setSaveError('')
  }

  function fieldProps(name) {
    return {
      id: `${formId}-${name}`, name, value: values[name], onChange: changeField,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined,
    }
  }

  function fieldError(name) {
    return errors[name] && <p className="field-error" id={`${formId}-${name}-error`}>{errors[name]}</p>
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting.current) return
    const nextErrors = validateBook(values)
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      event.currentTarget.elements.namedItem(firstInvalid)?.focus()
      return
    }
    submitting.current = true
    setIsSubmitting(true)
    setSaveError('')
    try {
      await onSave({ ...values, title: values.title.trim(), note: values.note.trim() })
    } catch {
      setSaveError('저장하지 못했어요. 입력 내용은 유지됩니다. 잠시 후 다시 시도해주세요.')
    } finally {
      submitting.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <div className="book-form-layout">
      <form className="book-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
        <p className="form-help">* 표시는 필수 입력입니다.</p>
        <fieldset disabled={isSubmitting}>
          <legend className="sr-only">책 정보 입력</legend>
          <div className="form-field">
            <label htmlFor={`${formId}-title`}>책 제목 *</label>
            <input {...fieldProps('title')} required maxLength={100} placeholder="책 제목을 입력해주세요" />
            {fieldError('title')}
          </div>
          <div className="form-field">
            <label htmlFor={`${formId}-authorId`}>작가 *</label>
            <select {...fieldProps('authorId')} required>
              <option value="">작가를 선택해주세요</option>
              {authors.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
            {fieldError('authorId')}
          </div>
          <div className="form-columns">
            <div className="form-field">
              <label htmlFor={`${formId}-genre`}>장르</label>
              <select {...fieldProps('genre')}>{bookGenres.map((item) => <option key={item}>{item}</option>)}</select>
              {fieldError('genre')}
            </div>
            <div className="form-field">
              <label htmlFor={`${formId}-status`}>독서 상태</label>
              <select {...fieldProps('status')}>{readingStatuses.map((item) => <option key={item}>{item}</option>)}</select>
              {fieldError('status')}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor={`${formId}-note`}>이 책과 나 · 선택</label>
            <textarea {...fieldProps('note')} maxLength={2000} rows={6} placeholder="읽게 된 계기나 읽고 난 뒤의 생각을 남겨보세요." />
            <p className="form-help">{values.note.length} / 2,000자</p>
            {fieldError('note')}
          </div>
          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={onCancel}>취소</button>
            <button type="submit" className="button-link">{isSubmitting ? '저장 중…' : submitLabel}</button>
          </div>
        </fieldset>
        {saveError && <p className="field-error" role="alert">{saveError}</p>}
        <p className="form-help" role="status">{isSubmitting ? '이 화면에 책 정보를 반영하고 있어요.' : ''}</p>
      </form>
      <aside className="form-preview" aria-label="입력 내용 미리보기">
        <h2>책장 미리보기</h2>
        <BookCover title={values.title.trim() || '책 제목'} author={author?.name || '작가 이름'} genre={values.genre} color={initialBook?.color || '#5d684f'} />
        <StatusBadge status={values.status} />
        <p className="form-help">제목·작가·장르·독서 상태가 입력에 따라 바뀝니다.</p>
      </aside>
    </div>
  )
}
