# 💼 YourJobs Hub - Full-Stack Job Portal Platform

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk&logoColor=white)](https://clerk.com/)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

**YourJobs** is a modern, production-grade, full-stack recruitment and job search platform. Built with a decoupled **React 19 + Vite** frontend and an **Express 5 + MongoDB** backend, the platform bridges the gap between ambitious job seekers and forward-thinking recruiters through an intuitive, high-performance interface.

---

## 🌐 Live Deployments

- 🚀 **Live Frontend Application**: [https://your-jobs-hub.vercel.app/](https://your-jobs-hub.vercel.app/)
- ⚙️ **Production Backend API**: [https://yourjobshub-new-server.vercel.app](https://yourjobshub-new-server.vercel.app)
- 📦 **GitHub Repository**: [https://github.com/Pratick-Script/YourJobs-Fullstack](https://github.com/Pratick-Script/YourJobs-Fullstack)

---

## 📑 Table of Contents

- [Core Value Proposition](#-core-value-proposition)
- [Key Features](#-key-features)
  - [Job Seeker Experience](#-job-seeker-experience)
  - [Recruiter & Employer Dashboard](#-recruiter--employer-dashboard)
  - [Security, Auth & Storage Architecture](#-security-auth--storage-architecture)
- [Tech Stack](#-tech-stack)
- [Monorepo Directory Structure](#-monorepo-directory-structure)
- [Application Flow & Routes](#-application-flow--routes)
- [RESTful API Reference](#-restful-api-reference)
- [Environment Variables](#-environment-variables)
- [Local Development & Quick Start](#-local-development--quick-start)
- [Deployment Guide](#-deployment-guide)
- [Author & License](#-author--license)

---

## 💡 Core Value Proposition

- **Frictionless Candidate Journey**: Instant search across keywords, locations, and categories with real-time status tracking for applied jobs.
- **Enterprise-Grade Recruiter Tools**: Self-service company onboarding, interactive job posting with rich-text editor (Quill.js), applicant pipeline tracking, and one-click status updates.
- **Modern Cloud Ecosystem**: Authenticated sessions via Clerk, media storage (PDF resumes & company logos) powered by Cloudinary, and production monitoring via Sentry.

---

## ✨ Key Features

### 👤 Job Seeker Experience
- **Smart Dual-Bar Search**: Search concurrently by job role/keyword and city/location.
- **Dynamic Multi-Filters**: Filter postings by Category (Engineering, Design, Marketing, etc.) and Location with active search tag pills for quick resets.
- **Rich Job Profiles**: Detailed job view with formatted job descriptions, responsibilities, salary ranges (CTC), and required experience level.
- **1-Click Application Flow**: Fast job application submission tied to the authenticated user's profile and uploaded resume.
- **Resume Management & In-App Preview**:
  - Secure PDF resume uploads hosted on Cloudinary CDN.
  - Interactive in-app PDF preview modal allowing candidates to verify their active resume anytime without leaving the page.
- **Application Tracking Dashboard (`/applications`)**:
  - Real-time tabular dashboard displaying applied company, job title, application date, and color-coded status badges (**Pending**, **Accepted**, **Rejected**).

### 🏢 Recruiter & Employer Dashboard
- **Company Authentication & Branding**:
  - Secure company registration and JWT-based login.
  - Custom company logo upload during signup, automatically optimized and served via Cloudinary.
- **Job Creation Suite (`/dashboard/add-job`)**:
  - Integrated **Quill.js WYSIWYG editor** allowing recruiters to format rich job specifications with headings, bullet points, and emphasis.
  - Dropdown selectors for Category, Location, Experience Level, and Salary (CTC).
- **Postings Manager (`/dashboard/manage-job`)**:
  - Live data table showing all company postings, publication dates, and total candidate counts.
  - Real-time **Visibility Checkbox Toggle** allowing recruiters to activate or pause listings instantly.
- **Applicant Pipeline Review (`/dashboard/view-application`)**:
  - Candidate cards showing candidate photo, name, applied position, and direct PDF resume links.
  - Quick action menu to mark candidate applications as **Accepted** or **Rejected**.

### 🔒 Security, Auth & Storage Architecture
- **Clerk Authentication**: Passwordless, Google OAuth, and secure session management for job candidates.
- **Bcrypt & JWT Auth**: Salted password hashing and signed JSON Web Tokens for recruiter portal protection.
- **Cloudinary CDN Integration**: Direct, secure binary storage and fast global delivery of candidate PDF resumes and company logos.
- **Clerk Webhooks with Svix**: Real-time event synchronization to maintain MongoDB user records upon Clerk sign-up or profile update.
- **Sentry Error Telemetry**: Automatic exception capture and performance tracing configured on the backend.

---

## 🛠 Tech Stack

### Frontend (`client/`)
| Technology | Description |
| :--- | :--- |
| **React 19** | Component-driven UI library with modern hooks |
| **Vite 8** | Next-generation frontend tooling and lightning-fast HMR |
| **Tailwind CSS v4** | Modern utility-first styling with `@tailwindcss/vite` |
| **React Router v7** | Client-side declarative routing and nested layouts |
| **@clerk/react** | User authentication, identity sessions, and user button modal |
| **Quill.js** | WYSIWYG rich text editor for formatted job postings |
| **Axios** | Promise-based HTTP client for API communication |
| **Moment.js** | Human-readable relative date formatting |
| **React Toastify** | Interactive notification banners and alerts |
| **k-convert** | Smart salary number conversion (e.g., `85000` ➔ `85k`) |

### Backend (`server/`)
| Technology | Description |
| :--- | :--- |
| **Node.js** | Scalable JavaScript server-side runtime |
| **Express 5** | High-performance REST API web framework |
| **MongoDB & Mongoose** | Document database with strongly typed schemas |
| **@clerk/express** | Express middleware verifying Clerk session JWTs |
| **JSONWebToken & Bcrypt** | Recruiter authentication, password hashing, and token verification |
| **Cloudinary SDK & Multer** | Multipart form handling and cloud file storage |
| **Svix** | Cryptographic webhook signature verification |
| **Sentry** | Full-stack application monitoring and error logging |
| **CORS & Dotenv** | Cross-Origin Resource Sharing and environment configuration |

---

## 📂 Monorepo Directory Structure

```text
Job-Portal/
├── client/                          # Frontend Application (React 19 + Vite)
│   ├── public/                      # Static assets & favicons
│   ├── src/
│   │   ├── assets/                  # Brand logos, category icons, and mock assets
│   │   ├── components/              # Reusable UI components
│   │   │   ├── AppDownload.jsx      # Mobile app call-to-action banner
│   │   │   ├── Footer.jsx           # Site footer & social links
│   │   │   ├── Hero.jsx             # Dual-input search hero section
│   │   │   ├── JobCard.jsx          # Individual job card preview
│   │   │   ├── JobListing.jsx       # Filter sidebar, search chips, and paginated grid
│   │   │   ├── Loading.jsx          # Full-page / component loading spinner
│   │   │   ├── Navbar.jsx           # Sticky header with Clerk auth & recruiter trigger
│   │   │   └── RecruiterLogin.jsx   # Modal for recruiter login & company onboarding
│   │   ├── context/
│   │   │   └── AppContext.jsx       # Global application state (auth, jobs, user data)
│   │   ├── pages/
│   │   │   ├── Addjobs.jsx          # Recruiter: Job creation form with Quill editor
│   │   │   ├── Applications.jsx     # Candidate: Applied jobs & PDF resume manager
│   │   │   ├── ApplyJob.jsx         # Candidate: Detailed job view & 1-click apply
│   │   │   ├── Dashboard.jsx        # Recruiter: Admin shell with sticky navigation
│   │   │   ├── Home.jsx             # Public landing page
│   │   │   ├── ManageJob.jsx        # Recruiter: Job list with visibility toggles
│   │   │   └── ViewApplication.jsx  # Recruiter: Applicant review and status actions
│   │   ├── App.jsx                  # Main route tree configuration
│   │   ├── index.css                # Design tokens, fonts, and Quill styles
│   │   └── main.jsx                 # Client entry point with ClerkProvider
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend API (Express 5 + MongoDB)
│   ├── config/
│   │   ├── cloudnary.js             # Cloudinary configuration
│   │   ├── db.js                    # MongoDB Mongoose connection
│   │   ├── instrument.js            # Sentry initialization
│   │   └── multer.js                # Memory/file upload middleware
│   ├── controllers/
│   │   ├── companyController.js     # Recruiter onboarding, job posting & status controls
│   │   ├── jobController.js         # Public job listings & detail retrieval
│   │   ├── userController.js        # User profile, resume upload & job applications
│   │   └── webhooks.js              # Clerk Svix webhook event handler
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT protection middleware for recruiter endpoints
│   ├── models/
│   │   ├── Company.js               # Company profile schema (name, email, logo)
│   │   ├── Job.js                   # Job posting schema (title, desc, CTC, status)
│   │   ├── jobApplications.js       # Applications schema (jobId, userId, status)
│   │   └── user.js                  # Candidate user schema (name, email, resume)
│   ├── routes/
│   │   ├── companyRoutes.js         # Endpoints for recruiter operations
│   │   ├── jobRoutes.js             # Endpoints for public job listings
│   │   └── userRoutes.js            # Endpoints for candidate actions
│   ├── package.json
│   ├── server.js                    # Express app entry & HTTP listener
│   └── vercel.json                  # Serverless deployment configuration for Vercel
│
└── README.md                        # Master repository documentation
```

---

## 🗺 Application Flow & Routes

### Candidate Routes
| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Landing page with Hero search, category filters, and job feed |
| `/apply-job/:id` | `ApplyJob.jsx` | Full job breakdown, requirements, company info & apply trigger |
| `/applications` | `Applications.jsx` | Candidate portal: PDF resume upload, in-app viewer, and application tracker |

### Recruiter Routes
| Route | Component | Description |
| :--- | :--- | :--- |
| `/dashboard` | `Dashboard.jsx` | Protected recruiter layout with sticky header & sidebar |
| `/dashboard/add-job` | `Addjobs.jsx` | Rich-text job creation form powered by Quill |
| `/dashboard/manage-job` | `ManageJob.jsx` | Table of posted jobs, applicant counters, and live visibility toggles |
| `/dashboard/view-application` | `ViewApplication.jsx` | Candidate submission list with resume review and Accept/Reject buttons |

---

## 📡 RESTful API Reference

### 1. Job Endpoints (`/api/jobs`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs` | Public | Fetch all active and visible job listings |
| `GET` | `/api/jobs/:id` | Public | Fetch single job details by ID |

### 2. Candidate Endpoints (`/api/users`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/user` | User (Clerk Auth) | Retrieve authenticated candidate profile data |
| `POST` | `/api/users/apply` | User (Clerk Auth) | Submit job application for a specific posting |
| `GET` | `/api/users/applications` | User (Clerk Auth) | Retrieve list of jobs applied to by current user |
| `POST` | `/api/users/update-resume` | User (Clerk Auth) | Upload candidate PDF resume (stored on Cloudinary) |

### 3. Recruiter Endpoints (`/api/company`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/company/register` | Public (Multer) | Register new recruiter account with company logo |
| `POST` | `/api/company/login` | Public | Authenticate recruiter and return JWT token |
| `GET` | `/api/company/company` | Recruiter (JWT) | Get logged-in recruiter company profile |
| `POST` | `/api/company/post-job` | Recruiter (JWT) | Create and publish a new job opening |
| `GET` | `/api/company/posted-jobs`| Recruiter (JWT) | List all jobs created by authenticated company |
| `GET` | `/api/company/applicants` | Recruiter (JWT) | List all applicants across company's job postings |
| `POST` | `/api/company/change-status` | Recruiter (JWT) | Update application status (`Accepted` / `Rejected`) |
| `POST` | `/api/company/change-visibility` | Recruiter (JWT) | Toggle job posting visibility (active / paused) |

### 4. Webhook & System Endpoints
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Health-check endpoint (`API WORKING`) |
| `POST` | `/webhooks` | Svix Signature | Clerk authentication webhook for user sync |

---

## 🔐 Environment Variables

### Client (`client/.env`)
Create a `.env` file inside the `client/` folder:

```env
# Clerk Authentication Publishable Key (from Clerk Dashboard)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Backend Base URL (Local or Production)
VITE_BACKEND_URL=http://localhost:5000
```

### Server (`server/.env`)
Create a `.env` file inside the `server/` folder:

```env
# Server Port & Secrets
PORT=5000
JWT_SECRET=your_super_secret_jwt_key

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net

# Cloudinary Configuration (Media Storage)
CLOUDNARY_NAME=your_cloudinary_cloud_name
CLOUDNARY_API_KEY=your_cloudinary_api_key
CLOUDNARY_SECRET_KEY=your_cloudinary_secret_key

# Clerk Backend Configuration
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Sentry Monitoring (Optional)
SENTRY_DSN=your_sentry_dsn_url
```

> ⚠️ **Important**: Ensure `VITE_CLERK_PUBLISHABLE_KEY` on the client and `CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` on the backend belong to the **same Clerk project instance** to prevent authentication mismatches.

---

## 🚀 Local Development & Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)
- [Clerk Account](https://clerk.com/)
- [Cloudinary Account](https://cloudinary.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Pratick-Script/YourJobs-Fullstack.git
cd YourJobs-Fullstack
```

### 2. Setup & Start Backend Server
```bash
cd server
npm install
# Configure your server/.env file
npm run server
```
*The backend API will start at `http://localhost:5000`.*

### 3. Setup & Start Frontend Client
In a new terminal window:
```bash
cd client
npm install
# Configure your client/.env file
npm run dev
```
*The frontend application will start at `http://localhost:5173`.*

---

## 🚢 Deployment Guide

### Deploying Backend to Vercel
1. In the Vercel Dashboard, import the repository and set the **Root Directory** to `server`.
2. Add all environment variables from `server/.env` into the Vercel Project Settings.
3. Deploy! The included `server/vercel.json` configures the serverless rewrites automatically.

### Deploying Frontend to Vercel
1. In the Vercel Dashboard, import the repository and set the **Root Directory** to `client`.
2. Framework preset: **Vite**.
3. Add the frontend environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_BACKEND_URL` (pointing to your deployed backend URL, e.g., `https://yourjobshub-new-server.vercel.app`)
4. Deploy!

---

## 👨‍💻 Author & Contributions

Created with ❤️ by **[Pratick Majhi](https://github.com/Pratick-Script)**.

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Pratick-Script/YourJobs-Fullstack/issues).

---

## 📄 License

This project is licensed under the **ISC License**. Feel free to use and adapt it for your own recruitment and career portal solutions.
