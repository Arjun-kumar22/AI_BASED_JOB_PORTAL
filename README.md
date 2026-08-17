# TITAN Job Portal — Next.js Application

A modern, full-featured AI-powered Career Intelligence & Job Portal built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **NextAuth.js**.

---

## 🚀 Features

- **Multi-Role Portals**:
  - 👨‍💼 **Candidate Panel**: Job search, AI ATS Resume Analyzer & PDF Builder, Application Tracking, STAR Mock Interview practice, Messaging.
  - 🏢 **Employer Panel**: Job posting & management, Applicant pipeline (Kanban / List), AI Candidate Matching, Interview scheduling, Direct messaging.
  - 🛡️ **Admin Panel**: System-wide analytics, job approvals, candidate/employer directory management, campus announcements, audit logs.
- **AI Career Intelligence Engine**:
  - ATS resume scoring & vector PDF download
  - STAR method mock interview generator & real-time feedback
  - Intelligent job-candidate RAG matching
- **Authentication**: NextAuth.js v5 with credentials and OAuth support.
- **Database & ORM**: PostgreSQL with Prisma ORM.

---

## 📁 Project Structure

```
nextjs-job-portal/
├── prisma/
│   └── schema.prisma        # Prisma Database Schema & Models
├── public/
│   └── images/              # Assets, Logos, Mascots & Avatars
├── src/
│   ├── app/                 # Next.js 14 App Router Pages & API Routes
│   │   ├── (auth)/          # Authentication routes (login, register, onboarding)
│   │   ├── candidate/       # Candidate Dashboard & Tools
│   │   ├── employer/        # Employer Dashboard & ATS Suite
│   │   ├── admin/           # Super Admin Analytics & Management
│   │   ├── jobs/            # Job Search, Filtering & Detail Pages
│   │   ├── api/             # Next.js Serverless API endpoints
│   │   ├── layout.tsx       # Root Layout
│   │   └── page.tsx         # Modern Landing Page
│   ├── components/          # Reusable UI Components (Navbar, Footer, Sidebars, Modals)
│   ├── lib/                 # State management (store.ts), AI engine (groqClient.ts, ragKnowledgeBase.ts), utilities
│   └── styles/              # Global CSS & Tailwind definitions
├── .env.example             # Environment variable template
├── next.config.mjs          # Next.js Configuration
├── package.json             # NPM dependencies & scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS design system
└── tsconfig.json            # TypeScript configuration
```

---

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env.local` and configure your credentials:

```bash
cp .env.example .env.local
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- `npm run dev`: Starts the local development server at port 3000.
- `npm run build`: Compiles and bundles the application for production.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint checks.

---

## 🛡️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
