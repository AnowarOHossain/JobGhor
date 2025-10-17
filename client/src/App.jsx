import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Container from './components/ui/Container.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminPostJob from './pages/AdminPostJob.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import MyApplications from './pages/MyApplications.jsx'
import Home from './pages/Home.jsx'
import Jobs from './pages/Jobs.jsx'
import JobDetails from './pages/JobDetails.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/post-job" element={<ProtectedRoute role="admin"><AdminPostJob /></ProtectedRoute>} />
          <Route path="/apply" element={<ProtectedRoute><ApplyJob /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
        </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
