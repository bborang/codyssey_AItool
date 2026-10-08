import { Link } from 'react-router'

export default function LinkButton({ to, children }) {
  return <Link className="button-link" to={to}>{children}</Link>
}
