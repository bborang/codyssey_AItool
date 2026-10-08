import useRemoteQuery from './useRemoteQuery.js'
import { fetchBooks } from '../lib/booksApi.js'

export default function useBooks(enabled) {
  return useRemoteQuery('books', fetchBooks, enabled)
}
