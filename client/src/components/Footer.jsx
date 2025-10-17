import Container from './ui/Container'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 py-10 text-sm text-gray-600 dark:text-gray-400">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">About Us</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/" className="hover:underline">About JobGhor</Link></li>
              <li><Link to="/" className="hover:underline">Contact</Link></li>
              <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Job Seekers</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/jobs" className="hover:underline">Browse Jobs</Link></li>
              <li><Link to="/profile" className="hover:underline">Build Profile</Link></li>
              <li><Link to="/applications" className="hover:underline">My Applications</Link></li>
              <li><Link to="/login" className="hover:underline">Sign In</Link></li>
              <li><Link to="/register" className="hover:underline">Create Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Recruiter</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/admin" className="hover:underline">Admin Dashboard</Link></li>
              <li><Link to="/admin/post-job" className="hover:underline">Post a Job</Link></li>
              <li><Link to="/login" className="hover:underline">Employer Sign In</Link></li>
              <li><Link to="/register" className="hover:underline">Create Employer Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Social Media</h4>
            <ul className="mt-3 space-y-2">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter / X</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} JobGhor. All rights reserved.</p>
          <p>
            Built with <span className="text-brand-600">React</span> & Tailwind.
          </p>
        </div>
      </Container>
    </footer>
  )
}
