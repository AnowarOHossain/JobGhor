# JobGhor
Simple solutions for job search

---

JobGhor is a modern MERN job portal that connects job seekers and employers. It provides job postings, search, applications, profile management, and AI-powered recommendations in a fast, responsive UI.

> Stack: MongoDB • Express.js • React • Node.js

---

## Features

- Authentication with JWT (login/register)
- Job posting & management (employers)
- Job search & applications (seekers)
- User profiles (resume, experience, preferences)
- Application tracking
- AI-powered job recommendations (Gemini API)
- Admin dashboard & moderation
- Responsive design with Tailwind CSS, dark mode, and consistent design system

---

## Tech Stack

### Backend (`/server`)
- Node.js & Express.js (REST API)
- MongoDB with Mongoose
- JWT & bcrypt for authentication/security
- Gemini API integration (recommendations)

### Frontend (`/client`)
- React + Vite (fast dev and build)
- Tailwind CSS (utility-first styling, dark mode: class)
- React Router (routing)
- Axios (API client)
- Reusable UI components (Button, Card, Input, Container, ThemeToggle)

---

## Project Structure

```
JobGhor/
├── client/                     # React frontend (Vite)
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       │   ├── Footer.jsx
│       │   ├── Navbar.jsx
│       │   ├── ThemeToggle.jsx
│       │   └── ui/
│       │       ├── Button.jsx
│       │       ├── Card.jsx
│       │       ├── Container.jsx
│       │       └── Input.jsx
│       ├── pages/
│       │   ├── AdminDashboard.jsx
│       │   ├── Home.jsx
│       │   ├── JobDetails.jsx
│       │   ├── Jobs.jsx
│       │   ├── Login.jsx
│       │   ├── Profile.jsx
│       │   └── Register.jsx
│       └── services/
│           └── api.js
├── server/                     # Node.js/Express backend
│   ├── package.json
│   ├── server.js               # entry (loads env, starts app)
│   └── src/
│       ├── app.js              # Express app, middleware, routes
│       ├── env.js              # env loading/defaults
│       ├── routes/
│       │   └── recommendations.js
│       └── services/
│           └── gemini.js       # Gemini integration
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
	- Implemented as `POST /api/recommendations` (accepts simple profile payload)
	- `GET /api/health` — health-check

---

## Getting Started

<!-- MongoDB setup guide removed as per request -->

### 1) Clone the repository
```powershell
git clone https://github.com/AnowarOHossain/JobGhor.git
cd JobGhor
```

### 2) Backend (server)
```powershell
cd server
npm install

# Create .env if missing (edit values as needed)
if (!(Test-Path .env)) { New-Item -Path .env -ItemType File | Out-Null }
"PORT=5000`nJWT_SECRET=dev-secret`nDEFAULT_AI_MODEL=claude-sonnet-4.5`n# MONGODB_URI=mongodb://127.0.0.1:27017/jobghor`n# GEMINI_API_KEY=your-key" | Out-File -FilePath .env -Encoding utf8

npm run dev
```

### 3) Frontend (client)
```powershell
cd ../client
npm install
npm run dev
```

Environment (optional) — `client/.env` (an `.env.example` is included):

```
VITE_API_BASE=http://localhost:5000
# If set, the frontend will send x-ai-model on API requests
# VITE_AI_MODEL=gpt-4o | gemini-1.5-pro | etc.
``` 
### 4) Build & preview frontend (optional)
```powershell
cd client
npm run build
npm run preview
```

---

## Run URLs

- Frontend (Vite): http://localhost:5173
- Backend API base: http://localhost:5000
	- Health check: http://localhost:5000/api/health
	- Jobs: http://localhost:5000/api/jobs

If you see a preview error, first run `npm run build` before `npm run preview`. For development, use `npm run dev`.

---

## Frontend Design System

- Theme: brand blues (brand-500 = #1d74ff), neutral grays, dark mode support
- Typography: Inter (Google Fonts)
- Components: Button, Card, Input, Container
- Layout: Navbar + Footer, centered content container
- Dark Mode: toggle via ThemeToggle (stores preference in localStorage)

---

## Contribution

Contributions are welcome! Please open issues or pull requests for features, fixes, or discussions.

---

## License

Specify your license here (e.g., MIT, Apache 2.0).

---

## Contact

For questions or support, open a GitHub issue or contact the maintainers.
