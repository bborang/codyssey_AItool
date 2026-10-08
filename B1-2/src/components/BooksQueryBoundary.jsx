import { Outlet } from 'react-router'
import Loading from './Loading.jsx'
import ErrorState from './ErrorState.jsx'

export default function BooksQueryBoundary({ loading, error, onRetry }) {
  if (loading) return <Loading />
  if (error) return <ErrorState message={error} onRetry={onRetry} />
  return <Outlet />
}
