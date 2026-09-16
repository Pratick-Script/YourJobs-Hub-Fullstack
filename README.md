# 💼 Job Portal - Frontend Web Application

A modern, responsive, and feature-rich Job Portal frontend interface designed for seamless job discovery, application management, and recruiter workflows. Built using **React 19**, **Vite**, and **Tailwind CSS v4**, the application delivers a polished, intuitive user experience with dedicated portals for both job seekers and recruiters.

---

## 📑 Table of Contents

- [Key UI Features](#-key-ui-features)
  - [🔐 Clerk Authentication](#-clerk-authentication)
  - [🔍 Smart Search System](#-smart-search-system)
  - [🎯 Multi-Criteria Filtering & Categorization](#-multi-criteria-filtering--categorization)
  - [📋 Job Listings & Pagination](#-job-listings--pagination)
  - [📄 Job Details & Rich-Text Experience](#-job-details--rich-text-experience)
  - [📑 Application Tracking & Resume Management](#-application-tracking--resume-management)
  - [🏢 Recruiter Management Dashboard](#-recruiter-management-dashboard)
- [🎨 Design System & UI/UX Aesthetics](#-design-system--uiux-aesthetics)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Directory Structure](#-directory-structure)
- [🗺 Application Routes](#-application-routes)
- [⚡ Global State Management](#-global-state-management)
- [🚀 Quick Start & Setup](#-quick-start--setup)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation & Running](#installation--running)
  - [Available Scripts](#available-scripts)

---

## ✨ Key UI Features

### 🔐 Clerk Authentication
- **User Authentication**: Integrated with `@clerk/react` for frictionless sign-in and sign-up flows.
- **Header Profile Controls**:
  - Unauthenticated users see quick-action buttons (`Login` and `Recruiter Login`).
  - Authenticated users receive an interactive `<UserButton />` menu showing profile details, user greeting (`Hi, {name}`), and a direct navigation shortcut to `/applications`.
- **Recruiter Login Modal**:
  - Dedicated popover dialog with backdrop blur (`backdrop-blur-sm bg-black/30`).
  - Seamless toggle between **Login** and **Sign Up**.
  - Includes company branding controls with interactive company logo image upload during recruiter onboarding.

### 🔍 Smart Search System
- **Hero Search Bar**:
  - Dual-input search interface allowing candidates to search simultaneously by **Job Title / Keyword** and **Location**.
  - Powered by React `useRef` for instant capture and synchronization with global search state.
- **Dynamic Search Feedback**:
  - If a search query is active, the job listings section displays active search chips for quick removal (`cross_icon`).
  - Instant "Clear All" action to reset back to all available openings.

### 📑 Application Tracking & Resume Management (`/applications`)
- **Interactive Resume Uploader**:
  - Toggle between viewing the current attached resume and uploading a new PDF resume.
  - File picker restricted to `.pdf` format with preview badge.
- **Applications Status Table**:
  - Tabular layout displaying company logo & name, job role, location, application date (formatted with `moment(date).format('ll')`), and status badge (*Pending*, *Accepted*, *Rejected*).
  - Responsive table design hiding non-essential columns on mobile devices.

### 🏢 Recruiter Management Dashboard (`/dashboard`)
A dedicated recruiter management portal with a left-hand navigation sidebar:
- **Add Job (`/dashboard/add-job`)**:
  - Full-featured job publishing form.
  - **Quill.js Rich Text Editor** (`quill.snow.css`) allowing recruiters to author styled job specifications with lists, bold/italic text, and formatting.
  - Dropdown selectors for Job Category, Job Location, Seniority Level, and salary CTC input.
- **Manage Jobs (`/dashboard/manage-job`)**:
  - Overview table of all posted jobs with publication date, location, total applicant counter, and live **Visibility Toggle Checkboxes**.
  - Direct call-to-action button to navigate to Add Job.
- **View Applications (`/dashboard/view-application`)**:
  - Applicant review interface displaying applicant avatar, full name, applied position, location, and a direct download button for the candidate's PDF resume.
  - Floating action menu (`...`) enabling recruiters to mark applications as **Accept** or **Reject**.

---

## 🎨 Design System & UI/UX Aesthetics

- **Tailwind CSS v4**: Fast, streamlined styling using the latest `@tailwindcss/vite` engine.
- **Modern Typography**:
  - Primary Font: **Outfit** for clean headings and readable interfaces.
  - Secondary Fonts: **Montserrat** and **Mulish** for badges and numbers.
- **Rich-Text Styling**: Custom CSS class `.rich-text` ensuring rich descriptions match the modern violet/purple theme.
- **Responsive Layout**: Designed mobile-first, ensuring smooth navigation across mobile screens, tablets, laptops, and ultra-wide displays (`2xl:px-20`).

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI library for modern, component-driven development |
| **[Vite 8](https://vite.dev/)** | Lightning-fast development server with Hot Module Replacement (HMR) |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first styling with `@tailwindcss/vite` |
| **[React Router v7](https://reactrouter.com/)** | Client-side routing, nested routes, and URL parameter handling |
| **[@clerk/react](https://clerk.com/)** | User authentication, identity sessions, and modal dialogs |
| **[Quill.js](https://quilljs.com/)** | WYSIWYG rich text editor for drafting job descriptions |
| **[Moment.js](https://momentjs.com/)** | Relative and formatted date representations |
| **[k-convert](https://www.npmjs.com/package/k-convert)** | Numeric salary string conversion (e.g., `85000` -> `85k`) |
| **[React Toastify](https://fkhadra.github.io/react-toastify/)** | User alerts and toast notifications |
| **[Oxlint](https://oxc.rs/)** | High-speed JavaScript/JSX code linter |

---

## 📂 Directory Structure

```text
client/
├── public/
│   └── Logo2.png              # App icon & brand favicon
├── src/
│   ├── assets/
│   │   ├── assets.js          # SVG icons, company logos, mock data (jobsData, jobsApplied, etc.)
│   │   └── ...                # Visual icons and branding graphics
│   ├── components/
│   │   ├── AppDownload.jsx    # Informational mobile app banner
│   │   ├── Footer.jsx         # Footer with social channels & copyright
│   │   ├── Hero.jsx           # Hero banner with keyword & location search inputs
│   │   ├── JobCard.jsx        # Individual job card item with company info & CTC
│   │   ├── JobListing.jsx     # Multi-filter sidebar, search chips, and paginated job grid
│   │   ├── Loading.jsx        # Loading spinner component
│   │   ├── Navbar.jsx         # Top navbar with brand logo, recruiter trigger, and Clerk auth
│   │   └── RecruiterLogin.jsx # Modal popup for recruiter sign-in & company logo upload
│   ├── context/
│   │   └── AppContext.jsx     # Global Context API for search filters, jobs list, and recruiter modal
│   ├── pages/
│   │   ├── Addjobs.jsx        # Recruiter: Job posting form with Quill rich-text editor
│   │   ├── Applications.jsx   # Candidate: Applied jobs history table & PDF resume manager
│   │   ├── ApplyJob.jsx       # Candidate: Job details view, requirements, and apply action
│   │   ├── Dashboard.jsx      # Recruiter: Shell layout with sidebar navigation and subroutes
│   │   ├── Home.jsx           # Public home page combining Navbar, Hero, JobListings, Footer
│   │   ├── ManageJob.jsx      # Recruiter: Data table of posted jobs & active toggles
│   │   └── ViewApplication.jsx# Recruiter: Candidate list with resume access & Accept/Reject actions
│   ├── App.jsx                # Application root with client route tree
│   ├── index.css              # Global styles, fonts, and Quill rich-text stylesheet
│   └── main.jsx               # Entry point with ClerkProvider and BrowserRouter
├── .env                       # Local environment variables
├── .env.example               # Template for environment variables
├── package.json               # NPM scripts and dependency definitions
└── vite.config.js             # Vite 8 config with React and Tailwind plugins
```

---

## 🗺 Application Routes

| Path | Component | View Purpose |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Main landing page: Search Hero, partner logos, category filters, and job card listings |
| `/apply-job/:id` | `ApplyJob.jsx` | Detailed job specification view with CTC, role requirements, and apply action |
| `/applications` | `Applications.jsx` | Candidate portal: PDF resume upload and applied jobs tracking table |
| `/dashboard` | `Dashboard.jsx` | Recruiter workspace shell with sidebar navigation |
| `/dashboard/add-job` | `Addjobs.jsx` | Nested view: Publish a new opening with Quill.js rich text description |
| `/dashboard/manage-job` | `ManageJob.jsx` | Nested view: Table of posted jobs, applicant counters, and visibility switches |
| `/dashboard/view-application` | `ViewApplication.jsx` | Nested view: Candidate application cards with resume downloads and status actions |

---

## ⚡ Global State Management

The frontend uses React's **Context API** via `AppContext` (`src/context/AppContext.jsx`) to handle shared state across views:

---

## 🚀 Quick Start & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Environment Variables
In the `client/` directory, create a `.env` file (refer to `client/.env.example`):

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

> **Note**: You can get your free publishable key from the [Clerk Dashboard](https://dashboard.clerk.com/).

### Installation & Running

1. Open your terminal and navigate to the `client` folder:
   ```bash
   cd client
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the URL printed in your terminal).

### Available Scripts

In the `client/` directory, you can run:

- **`npm run dev`**: Starts the Vite development server with Hot Module Replacement.
- **`npm run build`**: Compiles and bundles the application for production inside the `dist/` folder.
- **`npm run preview`**: Previews the production build locally.
- **`npm run lint`**: Runs Oxlint to inspect and validate code quality.
