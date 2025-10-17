import { Link, NavLink } from 'react-router-dom'
import Container from './ui/Container'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext.jsx'

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
  }`

export default function Navbar() {
  const { token, role, logout } = useAuth()
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/60 backdrop-blur sticky top-0 z-40">
      <Container className="h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-xl tracking-tight">JobGhor</Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/jobs" className={navLinkClass}>
            Jobs
          </NavLink>
          {token && (
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
          )}
          {role === 'admin' && (
            <>
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
              <NavLink to="/admin/post-job" className={navLinkClass}>
                Post Job
              </NavLink>
            </>
          )}
          {token ? (
            <button onClick={logout} className={navLinkClass({ isActive: false })}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
