# Job Portal - Frontend Application

A modern, responsive, and feature-rich Job Portal frontend built with **React 19**, **Vite**, and **Tailwind CSS v4**. This application provides an intuitive experience for both **job seekers** (browsing, searching, filtering, and tracking applications) and **recruiters** (posting jobs, managing postings, and reviewing candidate submissions).

---

## 📑 Table of Contents

- [Features](#-features)
  - [Job Seeker Experience](#job-seeker-experience)
  - [Recruiter & Employer Dashboard](#recruiter--employer-dashboard)
  - [Authentication & User Management](#authentication--user-management)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Structure](#-project-architecture--structure)
- [Routes & Navigation](#-routes--navigation)
- [State Management](#-state-management)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Linting](#linting)
- [Design & Styling System](#-design--styling-system)

---

## 🚀 Features

### Job Seeker Experience
- **Dynamic Hero Section**: Interactive multi-criteria search bar for finding openings by **Job Title** and **Location**.
- **Advanced Job Filtering**:
  - Filter jobs simultaneously by **Category** (e.g., Programming, Data Science, Designing, Marketing, Management) and **Location** (e.g., Bangalore, Hyderabad, Mumbai, Delhi, etc.).
  - Search query chips and one-click clear filters.
  - Client-side pagination with active page indicators.
- **Job Details & Application View (`/apply-job/:id`)**:
  - Detailed company overview, location badges, CTC representation (formatted with `k-convert`), and seniority level.
  - Richly formatted job descriptions rendering HTML content.
  - Related jobs suggestions from the same/similar category.
- **Applications Tracking (`/applications`)**:
  - Review submitted applications with company logo, position, location, date applied, and status tags (*Pending*, *Accepted*, *Rejected*).
  - Resume management with PDF upload and edit capabilities.
- **Mobile App Download Section**: Informational banner promoting mobile downloads for iOS and Android.

### Recruiter & Employer Dashboard
- **Recruiter Authentication Modal**:
  - Toggle between Login and Sign-Up.
  - Supports company branding with logo image upload during registration.
- **Sidebar-Powered Dashboard Layout (`/dashboard`)**:
  - **Add Job (`/dashboard/add-job`)**:
    - Integrated **Quill.js Snow Rich Text Editor** for comprehensive job descriptions.
    - Category, location, seniority level dropdown selectors, and CTC input.
  - **Manage Jobs (`/dashboard/manage-job`)**:
    - Data table showing job title, posting date, location, applicant count, and visibility toggle switches.
    - Quick shortcut to add a new job.
  - **View Applications (`/dashboard/view-application`)**:
    - Candidate list with profile avatars, applied job title, location, direct resume download link, and action menu (Accept / Reject).

### Authentication & User Management
- **Clerk Authentication**:
  - Seamless authentication via `@clerk/react`.
  - User profile menu (`<UserButton />`), custom sign-in modal triggers, and automatic state detection.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI library for components and reactive state |
| **[Vite 8](https://vite.dev/)** | High-performance build tool and local development server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Next-generation utility-first styling with `@tailwindcss/vite` |
| **[React Router v7](https://reactrouter.com/)** | Declarative client-side routing and nested dashboard routes |
| **[@clerk/react](https://clerk.com/)** | User authentication, identity management, and session handling |
| **[Quill.js](https://quilljs.com/)** | Rich text WYSIWYG editor for drafting detailed job descriptions |
| **[Moment.js](https://momentjs.com/)** | Date parsing, formatting, and human-friendly time display |
| **[k-convert](https://www.npmjs.com/package/k-convert)** | Numeric value formatting (e.g., converting CTC salary numbers) |
| **[React Toastify](https://fkhadra.github.io/react-toastify/)** | Elegant toast alerts and notifications |
| **[Oxlint](https://oxc.rs/)** | Ultra-fast linter for code health and clean syntax |

---

## 📂 Project Architecture & Structure

```text
client/
├── public/
│   └── Logo2.png              # Favicon / site logo asset
├── src/
│   ├── assets/
│   │   ├── assets.js          # Icons, partner logos, mock data (jobsData, jobsApplied, etc.)
│   │   └── ...                # SVG/PNG icon & banner image assets
│   ├── components/
│   │   ├── AppDownload.jsx    # Mobile app promotion banner
│   │   ├── Footer.jsx         # Site footer with brand socials and copyright
│   │   ├── Hero.jsx           # Hero banner with primary job & location search
│   │   ├── JobCard.jsx        # Reusable individual job posting summary card
│   │   ├── JobListing.jsx     # Job search filters, listings grid, and pagination
│   │   ├── Loading.jsx        # Animated spinner / loading indicator
│   │   ├── Navbar.jsx         # Header navigation bar with Clerk user controls
│   │   └── RecruiterLogin.jsx # Modal dialog for recruiter login and registration
│   ├── context/
│   │   └── AppContext.jsx     # Global Context API (jobs state, search filters, recruiter modal state)
│   ├── pages/
│   │   ├── Addjobs.jsx        # Recruiter page: Create new job posting with Quill.js
│   │   ├── Applications.jsx   # Candidate page: Resume upload & applied jobs status table
│   │   ├── ApplyJob.jsx       # Job details view & apply action page
│   │   ├── Dashboard.jsx      # Recruiter portal shell with sidebar & nested outlet
│   │   ├── Home.jsx           # Landing page assembling Navbar, Hero, JobListings, Footer
│   │   ├── ManageJob.jsx      # Recruiter page: Table of posted jobs & visibility toggles
│   │   └── ViewApplication.jsx# Recruiter page: Table of applicants with resume links & actions
│   ├── App.jsx                # Application root with client route configurations
│   ├── index.css              # Global styles, Tailwind imports, typography, and Quill rich-text styling
│   └── main.jsx               # React DOM entry point wrapped with Clerk & BrowserRouter
├── .env                       # Environment variables (local)
├── .env.example               # Template for environment configuration
├── .oxlintrc.json             # Oxlint configuration
├── index.html                 # HTML entry template
├── package.json               # Dependencies and npm scripts
└── vite.config.js             # Vite configuration with React & Tailwind plugins
```

---

## 🗺 Routes & Navigation

| Route Path | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Landing page featuring search hero, company badges, job listings, and app download banner |
| `/apply-job/:id` | `ApplyJob.jsx` | Detailed job specification page with CTC, role requirements, and application trigger |
| `/applications` | `Applications.jsx` | User dashboard to view applied jobs history and update resume |
| `/dashboard` | `Dashboard.jsx` | Recruiter administration shell with navigation sidebar |
| `/dashboard/add-job` | `Addjobs.jsx` | Nested view: Form to publish new jobs with rich-text editor |
| `/dashboard/manage-job` | `ManageJob.jsx` | Nested view: Manage active postings and monitor applicant counts |
| `/dashboard/view-application` | `ViewApplication.jsx` | Nested view: Candidate applications table with resume inspection and status actions |

---

## ⚡ State Management

The frontend utilizes React's **Context API** via `AppContext` (`src/context/AppContext.jsx`) to manage shared state across components:

- **`searchFilter`**: Holds the current search criteria (`title`, `location`).
- **`isSearched`**: Boolean indicating whether an active search query has been submitted from the Hero section.
- **`jobs`**: Array of all available job openings.
- **`showRecruiterLogin`**: Boolean controlling the visibility of the Recruiter Login / Sign Up modal.

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the `client` directory (refer to `.env.example`):

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

> **Note**: Obtain your publishable key from your [Clerk Dashboard](https://dashboard.clerk.com/).

### Running the Development Server

Start the local development server with Vite Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173` (or the port specified by Vite).

### Building for Production

Compile and bundle the production-ready assets into the `dist/` directory:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Linting

Execute Oxlint to check code quality and detect lint errors:

```bash
npm run lint
```

---

## 🎨 Design & Styling System

- **Tailwind CSS v4**: Utilizes the modern `@tailwindcss/vite` plugin without legacy configuration boilerplate.
- **Typography**: Configured with Google Fonts:
  - Primary font family: **Outfit**
  - Complementary font families: **Montserrat**, **Mulish**
- **Rich-Text Styling**: Custom CSS class `.rich-text` defined in `src/index.css` ensuring Quill HTML content (headings, blockquotes, unordered/ordered lists, and links) matches the violet/purple theme.
- **Responsive Layout**: Designed mobile-first, supporting seamless viewing on smartphones, tablets, and wide desktop displays (including `2xl` container constraints).
