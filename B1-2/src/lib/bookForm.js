import { authors } from './authors.js'
import { readingStatuses } from './readingStatuses.js'

export const bookGenres = ['소설', '희곡', '시', '기타']

export function validateBook(values) {
  const errors = {}
  if (!values.title.trim()) errors.title = '책 제목을 입력해주세요.'
  else if (values.title.trim().length > 100) errors.title = '제목은 100자 이내로 입력해주세요.'
  if (!authors.some((author) => author.id === values.authorId)) errors.authorId = '작가를 선택해주세요.'
  if (!bookGenres.includes(values.genre)) errors.genre = '장르를 선택해주세요.'
  if (!readingStatuses.includes(values.status)) errors.status = '독서 상태를 선택해주세요.'
  if (values.note.length > 2000) errors.note = '독서 기록은 2,000자 이내로 입력해주세요.'
  return errors
}
