# JobGhor
**Simple solutions for job search**

---

JobGhor is a modern, full-stack job portal designed to connect job seekers and employers. It offers a streamlined platform for job postings, applications, profile management, and AI-powered job recommendations—all wrapped in a responsive, user-friendly interface.

> **This is a MERN stack project:**  
> - **M**ongoDB  
> - **E**xpress.js  
> - **R**eact  
> - **N**ode.js  

---

## Features

- **User Authentication**: Secure registration, login, and JWT-based session management
- **Job Posting & Management**: Employers can create, edit, and delete job listings
- **Job Search & Application**: Job seekers can browse, search, and apply for jobs
- **User Profiles**: Manage resumes, experiences, and profile details
- **Application Tracking**: Track and manage job applications
- **AI-powered Recommendations**: Personalized job suggestions via Gemini API
- **Admin Dashboard**: Manage users, jobs, and moderate content
- **Responsive Design**: Modern UI with Tailwind CSS, mobile-friendly

---

## Tech Stack

### Backend (`/server`)
- **Node.js** & **Express.js**: RESTful API
- **MongoDB** with **Mongoose**: NoSQL database and modeling
- **JWT** & **bcrypt**: Authentication & password security
- **Gemini API**: AI-powered job recommendations

### Frontend (`/client`)
- **React**: Component-based SPA
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: API requests
- **React Router**: Routing & navigation
- **Context API** or **Redux**: State management (as needed)

---

## Project Structure

```
JobGhor/
├── client/   # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── App.js
│       └── index.js
│   └── tailwind.config.js
├── server/   # Node.js/Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── .env
└── README.md
```

---

## API Endpoints (Sample)

- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login
- `GET /api/jobs` — List jobs
- `POST /api/jobs` — Create job
- `GET /api/jobs/:id` — Job details
- `POST /api/applications` — Apply to job
- `GET /api/profile` — Get user profile
- `PUT /api/profile` — Update user profile
- `GET /api/recommendations` — AI-powered recommendations

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/AnowarOHossain/JobGhor.git
cd JobGhor
```

### 2. Setup Backend (`/server`)
```bash
cd server
npm install
# Configure MongoDB URI and JWT secret in .env
npm run dev
```

### 3. Setup Frontend (`/client`)
```bash
cd ../client
npm install
npm run dev
```

Create a `.env` in `client/` (optional):

```
VITE_API_BASE=http://localhost:5000
# Enables model header for backend AI features
VITE_AI_MODEL=claude-sonnet-4.5
```

The frontend automatically sends `x-ai-model: claude-sonnet-4.5` on all API requests (override with `VITE_AI_MODEL`).

### 4. (Optional) Configure Gemini API
- Set up Gemini API credentials in the backend to enable AI-powered job recommendations.

---

## Contribution

We welcome contributions!  
Please open issues or pull requests for new features, bug fixes, or suggestions.

---

## License

Specify your license here (e.g., MIT, Apache 2.0).

---

## Contact

For questions or support, open a GitHub issue or contact the maintainers.
