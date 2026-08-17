import {
  User,
  Job,
  LocumRole,
  Application,
  ResumeData,
  SavedJob,
  Message,
  JobAlert,
  RagAnnouncement,
  InterviewSession,
  AuditLog,
  FeatureFlags,
  CategoryTaxonomy,
  SalaryBenchmark,
  KanbanStage,
} from './types';

// Default Seed Data
const DEFAULT_USER: User = {
  id: 1,
  name: 'Jake Richards',
  email: 'jake@titan.com',
  role: 'candidate',
  title: 'Senior Full-Stack & AI Engineer',
  score: 94,
  availability: '100%',
  phone: '+44 7700 900234',
  location: 'Manchester, United Kingdom',
  avatar: '/images/candidate-avatar.jpg',
  bio: 'Innovative Full-Stack Developer with 6+ years of experience in building scalable web applications. Proficient in Next.js, React, Python FastAPI, and cloud infrastructure.',
  isVerified: true,
  status: 'active',
  created_at: '2024-01-15',
};

const DEFAULT_RECRUITER: User = {
  id: 2,
  name: 'Sarah Mitchell',
  email: 'employer@titan.com',
  role: 'employer',
  title: 'Talent Acquisition Director',
  companyName: 'Titan Technology Group',
  location: 'London, UK',
  avatar: '/images/employer-avatar.jpg',
  isVerified: true,
  status: 'active',
  created_at: '2023-11-20',
};

const DEFAULT_ADMIN: User = {
  id: 3,
  name: 'Titan Super Admin',
  email: 'admin@titan.com',
  role: 'admin',
  title: 'Chief System Director',
  location: 'Zurich, Switzerland',
  avatar: '/images/admin-avatar.jpg',
  isVerified: true,
  status: 'active',
  created_at: '2023-09-01',
};

const DEFAULT_JOBS: Job[] = [
  {
    id: 101,
    title: 'Senior Full-Stack Engineer',
    company: 'Titan Technology Group',
    location: 'Remote / London, UK',
    type: 'Full-time',
    style: 'Remote',
    salary: '$140k – $190k + Equity',
    salary_min: 140000,
    salary_max: 190000,
    experience: '5+ years',
    seniority: 'Senior',
    status: 'Active',
    applicants: 198,
    interviews: 24,
    closing_date: 'Nov 30, 2026',
    posted_by: 'Titan HR',
    posted_days_ago: 2,
    is_featured: true,
    is_verified_employer: true,
    department: 'Core Platform',
    description: 'As a Senior Full-Stack Engineer at Titan Technology Group, you will lead the architecture of high-throughput Next.js & Python microservices with sub-second performance.',
    qualifications: [
      '5+ years of professional full-stack development experience.',
      'Expert proficiency in React.js, Next.js, and TypeScript.',
      'Strong Python / FastAPI and PostgreSQL database expertise.',
      'Experience with AWS / Docker / Cloud Infrastructure.'
    ],
    responsibilities: [
      'System Architecture: Design scalable microservices and UI components.',
      'Collaboration: Partner with product managers and engineers to ship features.',
      'Code Quality: Drive code reviews and maintain automated test coverage.'
    ]
  },
  {
    id: 102,
    title: 'Lead AI Research Engineer',
    company: 'NeuralPath Labs',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    style: 'Hybrid',
    salary: '$165k – $210k',
    salary_min: 165000,
    salary_max: 210000,
    experience: '6+ years',
    seniority: 'Lead',
    status: 'Active',
    applicants: 86,
    interviews: 12,
    closing_date: 'Dec 15, 2026',
    posted_by: 'NeuralPath Talent',
    posted_days_ago: 3,
    is_featured: true,
    is_verified_employer: true,
    department: 'AI Intelligence',
    description: 'Lead fine-tuning and inference infrastructure for next-generation STAR interview evaluators and ATS algorithmic matching models.',
    qualifications: [
      'MS or PhD in Computer Science, Machine Learning or related field.',
      'Proficiency with PyTorch, Transformers, LangChain, and RAG pipelines.',
      'Experience optimizing LLM latency and distributed GPU clusters.'
    ],
    responsibilities: [
      'Train and evaluate domain-specific LLMs for recruitment scoring.',
      'Architect low-latency vector databases and RAG pipelines.',
      'Collaborate with front-end teams for interactive AI coaching widgets.'
    ]
  },
  {
    id: 103,
    title: 'Senior UX / UI Product Designer',
    company: 'Quantum Systems Inc.',
    location: 'San Francisco, CA (Remote)',
    type: 'Full-time',
    style: 'Remote',
    salary: '$130k – $165k',
    salary_min: 130000,
    salary_max: 165000,
    experience: '4+ years',
    seniority: 'Senior',
    status: 'Active',
    applicants: 124,
    interviews: 18,
    closing_date: 'Dec 05, 2026',
    posted_by: 'Design Ops',
    posted_days_ago: 1,
    is_featured: false,
    is_verified_employer: true,
    department: 'Product Design',
    description: 'Design luxury glassmorphic design systems, interactive ATS scorecards, and intuitive recruiter pipelines with pixel perfection.',
    qualifications: [
      'Mastery of Figma, design token systems, and responsive layout grids.',
      'Deep understanding of micro-interactions and motion design principles.',
      'Track record of shipping enterprise SaaS products.'
    ],
    responsibilities: [
      'Build reusable component design systems with dark/navy themes.',
      'Conduct user testing sessions with tech recruiters and job seekers.',
      'Deliver interactive prototypes for Kanban boards and career coaching tabs.'
    ]
  },
  {
    id: 104,
    title: 'Cloud Infrastructure & DevOps Lead',
    company: 'Fortress Cloud Networks',
    location: 'Seattle, WA (On-site)',
    type: 'Full-time',
    style: 'On-site',
    salary: '$155k – $195k',
    salary_min: 155000,
    salary_max: 195000,
    experience: '7+ years',
    seniority: 'Lead',
    status: 'Active',
    applicants: 54,
    interviews: 6,
    closing_date: 'Dec 20, 2026',
    posted_by: 'Infra Ops',
    posted_days_ago: 4,
    is_featured: false,
    is_verified_employer: false,
    department: 'DevOps & SRE',
    description: 'Oversee Kubernetes clusters, multi-region failover, and CI/CD automated deployment pipelines for global recruitment traffic.',
    qualifications: [
      '7+ years managing production AWS/GCP infrastructure with Terraform.',
      'Deep knowledge of Kubernetes, Docker, Envoy, and Prometheus telemetry.',
      'Strong scripting skills in Python and Bash.'
    ],
    responsibilities: [
      'Maintain 99.99% system uptime across international server nodes.',
      'Automate deployment pipelines with zero-downtime rolling updates.',
      'Implement enterprise security and role-based access audits.'
    ]
  },
  {
    id: 105,
    title: 'Data Science & Analytics Lead',
    company: 'FinEdge Global Markets',
    location: 'New York, NY (Hybrid)',
    type: 'Full-time',
    style: 'Hybrid',
    salary: '$150k – $185k',
    salary_min: 150000,
    salary_max: 185000,
    experience: '5+ years',
    seniority: 'Senior',
    status: 'Active',
    applicants: 72,
    interviews: 9,
    closing_date: 'Jan 10, 2027',
    posted_by: 'FinEdge Talent',
    posted_days_ago: 5,
    is_featured: false,
    is_verified_employer: true,
    department: 'Analytics',
    description: 'Architect compensation telemetry models, in-demand skill valuation algorithms, and recruitment yield funnel analytics.',
    qualifications: [
      'Proficiency in SQL, Python, BigQuery, and statistical modeling.',
      'Experience designing Recharts / D3 visual dashboards.',
      'Strong communication skills to present insights to executive leaders.'
    ],
    responsibilities: [
      'Build real-time salary benchmarking prediction models.',
      'Track recruitment funnel conversion metrics across all stages.',
      'Publish quarterly tech talent compensation index reports.'
    ]
  }
];

const DEFAULT_LOCUMS: LocumRole[] = [
  {
    id: 201,
    title: 'Senior Locum Cloud Architect',
    company: 'CloudStratus Systems',
    location: 'Remote',
    date_tag: 'NOV 18',
    apps_count: 245,
    duration: '3 Months',
    badge: 'High Priority',
    skills: ['AWS / Azure', 'Terraform', 'Kubernetes', 'Financial Compliance'],
    is_urgent: true,
    description: 'Leading high-level cloud migrations for Tier 1 financial institutions. Titan precision required for 3-month contract.',
    rate: '$120 / hr'
  },
  {
    id: 202,
    title: 'AI Research Locum Consultant',
    company: 'NeuralFlow Inc.',
    location: 'Hybrid (SF)',
    date_tag: 'NOV 22',
    apps_count: 42,
    duration: '6 Months',
    badge: 'Hybrid',
    skills: ['PyTorch', 'Transformers', 'LLM Fine-Tuning', 'Rapid Prototyping'],
    is_urgent: false,
    description: 'Supporting our core LLM fine-tuning team during the pre-launch phase. Intense 6-month contract.',
    rate: '$145 / hr'
  },
  {
    id: 203,
    title: 'Incident Response Security Lead',
    company: 'Titan Guardian Division',
    location: 'Global Remote',
    date_tag: 'NOV 15',
    apps_count: 12,
    duration: '1 Month',
    badge: 'Urgent',
    skills: ['CISSP', 'Fortune 500 Incidents', '24/7 Availability', 'Forensics'],
    is_urgent: true,
    description: 'Direct oversight of high-priority security patches and breach response protocols.',
    rate: '$160 / hr'
  },
  {
    id: 204,
    title: 'Full-Stack Next.js Developer',
    company: 'Spark Dev Agency',
    location: 'Remote',
    date_tag: 'NOV 24',
    apps_count: 512,
    duration: '2 Months',
    badge: 'Contract',
    skills: ['Next.js 14/15', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
    is_urgent: false,
    description: 'Building out features for high-traffic career platform launch with extreme precision.',
    rate: '$95 / hr'
  }
];

const DEFAULT_APPLICATIONS: Application[] = [
  {
    id: 301,
    candidate_id: 1,
    candidate_name: 'Jake Richards',
    candidate_email: 'jake@titan.com',
    candidate_avatar: '/images/candidate-avatar.jpg',
    job_id: 101,
    job_title: 'Senior Full-Stack Engineer',
    company: 'Titan Technology Group',
    status: 'Screening',
    applied_date: 'Oct 28, 2026',
    ats_score: 94,
    star_rating: 5,
    recruiter_notes: 'Strong candidate with full-stack Next.js and FastAPI expertise. Impressed with system architecture knowledge.',
    cover_letter: 'Dear Hiring Manager, I am excited to apply for the Senior Full-Stack Engineer role at Titan Technology Group. With 6+ years building scalable microservices and Next.js applications, I am eager to contribute to your core platform.',
    resume_version: 'Next.js & Cloud Architecture v2',
    skills: ['React', 'Next.js', 'Python', 'FastAPI', 'AWS'],
    experience_years: '6+ Years'
  },
  {
    id: 302,
    candidate_id: 1,
    candidate_name: 'Jake Richards',
    candidate_email: 'jake@titan.com',
    candidate_avatar: '/images/candidate-avatar.jpg',
    job_id: 102,
    job_title: 'Lead AI Research Engineer',
    company: 'NeuralPath Labs',
    status: 'Technical Interview',
    applied_date: 'Oct 24, 2026',
    ats_score: 91,
    star_rating: 4,
    recruiter_notes: 'Completed technical coding round. Scheduled for architecture deep dive with ML Director.',
    cover_letter: 'I am thrilled to submit my candidacy for the Lead AI Research Engineer position at NeuralPath Labs.',
    resume_version: 'AI & Data Engineering v1',
    skills: ['PyTorch', 'LLMs', 'Python', 'Docker'],
    experience_years: '6+ Years'
  },
  {
    id: 303,
    candidate_id: 4,
    candidate_name: 'Jordan Smith',
    candidate_email: 'jordan.s@example.com',
    candidate_avatar: '/images/user-avatar.jpg',
    job_id: 101,
    job_title: 'Senior Full-Stack Engineer',
    company: 'Titan Technology Group',
    status: 'Applied',
    applied_date: 'Just now',
    ats_score: 88,
    star_rating: 4,
    recruiter_notes: 'New applicant with strong cloud credentials.',
    cover_letter: 'Applying with my primary Cloud Systems resume.',
    resume_version: 'Primary Resume',
    skills: ['Node.js', 'React', 'Kubernetes'],
    experience_years: '5 Years'
  },
  {
    id: 304,
    candidate_id: 5,
    candidate_name: 'Elena Castillo',
    candidate_email: 'e.castillo@webmail.io',
    candidate_avatar: '/images/user-avatar.png',
    job_id: 101,
    job_title: 'Senior Full-Stack Engineer',
    company: 'Titan Technology Group',
    status: 'Final Round',
    applied_date: 'Oct 15, 2026',
    ats_score: 96,
    star_rating: 5,
    recruiter_notes: 'Executive presentation went exceptionally well. Preparing compensation proposal.',
    cover_letter: 'Tailored application for Senior Engineering role.',
    resume_version: 'Executive Full Stack',
    skills: ['React', 'TypeScript', 'System Design', 'PostgreSQL'],
    experience_years: '7 Years'
  },
  {
    id: 305,
    candidate_id: 6,
    candidate_name: 'Maya Patel',
    candidate_email: 'mpatel@titan.edu',
    candidate_avatar: '/images/user-avatar.jpg',
    job_id: 103,
    job_title: 'Senior UX / UI Product Designer',
    company: 'Quantum Systems Inc.',
    status: 'Offer Extended',
    applied_date: 'Oct 10, 2026',
    ats_score: 95,
    star_rating: 5,
    recruiter_notes: 'Offer package sent: $155k + equity. Awaiting sign-off.',
    cover_letter: 'Design leadership cover letter.',
    resume_version: 'Design Systems Lead',
    skills: ['Figma', 'Design Systems', 'Micro-interactions', 'User Research'],
    experience_years: '6 Years'
  },
  {
    id: 306,
    candidate_id: 7,
    candidate_name: 'Arthur Wright',
    candidate_email: 'a.wright@techcorp.com',
    candidate_avatar: '/images/user-avatar.png',
    job_id: 104,
    job_title: 'Cloud Infrastructure & DevOps Lead',
    company: 'Fortress Cloud Networks',
    status: 'Hired',
    applied_date: 'Sept 28, 2026',
    ats_score: 97,
    star_rating: 5,
    recruiter_notes: 'Successfully accepted offer! Start date: Nov 1st.',
    cover_letter: 'DevOps & SRE cover letter.',
    resume_version: 'Cloud Principal v3',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    experience_years: '8 Years'
  }
];

const DEFAULT_RESUMES: ResumeData[] = [
  {
    id: 401,
    candidate_id: 1,
    versionName: 'Next.js & Cloud Architecture v2',
    filename: 'Jake_Richards_Senior_Engineer_2026.pdf',
    filesize: '2.4 MB',
    upload_date: 'Oct 28, 2026',
    is_primary: true,
    views: 1284,
    downloads: 342,
    ats_score: 94,
    parsed_skills: ['Next.js', 'React.js', 'TypeScript', 'Python', 'FastAPI', 'AWS', 'Docker', 'PostgreSQL'],
    personalInfo: {
      fullName: 'Jake Richards',
      title: 'Senior Full-Stack & AI Engineer',
      email: 'jake@titan.com',
      phone: '+44 7700 900234',
      location: 'Manchester, United Kingdom',
      website: 'https://jakerichards.dev',
      linkedin: 'https://linkedin.com/in/jakerichards',
      github: 'https://github.com/jakerichards',
      summary: 'Innovative Full-Stack & AI Engineer with 6+ years of experience architecting resilient web platforms, microservices, and AI-driven workflow engines. Proven track record reducing API latency by 45% and leading cross-functional engineering teams.'
    },
    experiences: [
      {
        id: 'exp-1',
        title: 'Senior Full-Stack Engineer',
        company: 'Global Dynamics Inc.',
        location: 'London, UK (Remote)',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        description: 'Lead engineering team in building next-generation recruitment and career intelligence microservices.',
        highlights: [
          'Architected high-throughput Next.js frontend and Python FastAPI services serving 150k+ monthly active users.',
          'Reduced average API response latency by 42% through Redis caching and query indexing.',
          'Mentored 6 junior engineers and established automated CI/CD unit testing suites.'
        ]
      },
      {
        id: 'exp-2',
        title: 'Full-Stack Developer',
        company: 'NexTech Solutions',
        location: 'Manchester, UK',
        startDate: '2019',
        endDate: '2022',
        current: false,
        description: 'Developed and scaled interactive client web applications across financial and healthcare domains.',
        highlights: [
          'Engineered responsive React portals with custom Tailwind design systems.',
          'Integrated secure JWT authentication and role-based access control (RBAC).',
          'Delivered 12 enterprise client projects on schedule with 99.8% customer satisfaction.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.Sc. in Computer Science (First Class Hons)',
        institution: 'University of Manchester',
        year: '2019',
        gpa: '3.9 / 4.0'
      }
    ],
    skills: [
      'React.js', 'Next.js 14/15', 'TypeScript', 'Python FastAPI', 'Node.js',
      'PostgreSQL', 'Docker', 'Kubernetes', 'AWS (ECS, S3, RDS)', 'Tailwind CSS',
      'System Architecture', 'CI/CD Pipelines'
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Titans AI Career Engine',
        techStack: 'Next.js, TypeScript, FastAPI, PyTorch',
        link: 'https://github.com/jakerichards/titans-portal',
        description: 'Architected algorithmic ATS compatibility scanner with real-time radar scoring and STAR mock interview coach.'
      }
    ]
  },
  {
    id: 402,
    candidate_id: 1,
    versionName: 'AI & Data Engineering v1',
    filename: 'Jake_Richards_AI_Research_Variant.pdf',
    filesize: '1.8 MB',
    upload_date: 'Oct 15, 2026',
    is_primary: false,
    views: 412,
    downloads: 88,
    ats_score: 91,
    parsed_skills: ['Python', 'PyTorch', 'Transformers', 'LangChain', 'FastAPI', 'RAG Pipelines', 'Vector DB'],
    personalInfo: {
      fullName: 'Jake Richards',
      title: 'AI & Machine Learning Engineer',
      email: 'jake@titan.com',
      phone: '+44 7700 900234',
      location: 'Manchester, United Kingdom',
      summary: 'Data & AI Engineer specializing in LLM fine-tuning, RAG pipelines, and high-performance ML inference.'
    },
    experiences: [],
    education: [],
    skills: ['Python', 'PyTorch', 'FastAPI', 'LangChain', 'PostgreSQL'],
    projects: []
  }
];

const DEFAULT_SAVED_JOBS: SavedJob[] = [
  {
    id: 501,
    candidate_id: 1,
    job_id: 101,
    title: 'Senior Full-Stack Engineer',
    company: 'Titan Technology Group',
    location: 'Remote / London, UK',
    salary: '$140k – $190k + Equity',
    match_score: 94,
    saved_date: 'Saved 2 days ago'
  },
  {
    id: 502,
    candidate_id: 1,
    job_id: 102,
    title: 'Lead AI Research Engineer',
    company: 'NeuralPath Labs',
    location: 'Austin, TX',
    salary: '$165k – $210k per year',
    match_score: 91,
    saved_date: 'Saved 5 days ago'
  },
  {
    id: 503,
    candidate_id: 1,
    job_id: 103,
    title: 'Senior UX / UI Product Designer',
    company: 'Quantum Systems Inc.',
    location: 'San Francisco, CA (Remote)',
    salary: '$130k – $165k per year',
    match_score: 85,
    saved_date: 'Saved 1 week ago'
  }
];

const DEFAULT_MESSAGES: Message[] = [
  {
    id: 601,
    sender_id: 2,
    sender_name: 'Sarah Mitchell',
    sender_role: 'Talent Acquisition Director @ Titan',
    avatar: '/images/employer-avatar.jpg',
    recipient_id: 1,
    text: 'Hi Jake, thank you for your patience! The hiring panel was extremely impressed with your portfolio and ATS resume rating.',
    timestamp: '10:42 AM'
  },
  {
    id: 602,
    sender_id: 2,
    sender_name: 'Sarah Mitchell',
    sender_role: 'Talent Acquisition Director @ Titan',
    avatar: '/images/employer-avatar.jpg',
    recipient_id: 1,
    text: "I have dispatched the technical assessment guidelines. Let's schedule the technical interview for Thursday at 11:00 AM.",
    timestamp: '10:44 AM',
    attachment: 'Titan_Technical_Assessment_v2.pdf'
  },
  {
    id: 603,
    sender_id: 1,
    sender_name: 'Jake Richards',
    sender_role: 'Candidate',
    avatar: '/images/candidate-avatar.jpg',
    recipient_id: 2,
    text: 'Thanks Sarah! Thursday at 11:00 AM works perfectly for me. Looking forward to our discussion!',
    timestamp: '10:48 AM'
  }
];

const DEFAULT_JOB_ALERTS: JobAlert[] = [
  {
    id: 701,
    candidate_id: 1,
    title: 'Senior Full-Stack Engineer',
    location: 'Remote / London, UK',
    frequency: 'Daily',
    is_active: true
  },
  {
    id: 702,
    candidate_id: 1,
    title: 'AI / Machine Learning Architect',
    location: 'Global Remote',
    frequency: 'Instant',
    is_active: true
  },
  {
    id: 703,
    candidate_id: 1,
    title: 'Lead Cloud DevOps Engineer',
    location: 'United Kingdom',
    frequency: 'Weekly',
    is_active: true
  }
];

const DEFAULT_ANNOUNCEMENTS: RagAnnouncement[] = [
  {
    id: 801,
    title: 'Fall 2026 Examination & Project Defense Schedule',
    content: 'The Fall 2026 Final Technical Examinations and Capstone Project Defenses are scheduled for Oct 12-18, 2026. All candidates must verify their primary resumes by Sept 30.',
    category: 'Exam Schedule',
    author: 'Chief Academic Admin',
    timestamp: 'Aug 14, 2026 10:00 AM'
  },
  {
    id: 802,
    title: 'TITAN Annual Campus Recruitment Drive 2026',
    content: 'Top tech employers (Vortex, Lumina, Apex Tech, Titan Group) will conduct on-campus and video interviews starting November 5, 2026. 1-Click tailored applications are now open.',
    category: 'Recruitment Drive',
    author: 'Career Placement Cell',
    timestamp: 'Aug 15, 2026 02:30 PM'
  },
  {
    id: 803,
    title: 'AI ATS Resume Scoring & STAR Coach Upgrade v2.0',
    content: 'All candidates now have access to the 24/7 AI STAR Mock Interview simulator and automated A4 PDF vector export engine.',
    category: 'General',
    author: 'System Operations',
    timestamp: 'Aug 16, 2026 09:15 AM'
  }
];

const DEFAULT_INTERVIEWS: InterviewSession[] = [
  {
    id: 901,
    candidate_id: 1,
    candidate_name: 'Jake Richards',
    candidate_email: 'jake@titan.com',
    job_title: 'Senior Full-Stack Engineer',
    company: 'Titan Technology Group',
    date: 'Thu, Nov 05, 2026',
    time: '11:00 AM - 12:00 PM',
    format: 'Technical',
    meeting_url: 'https://meet.google.com/titan-tech-round',
    interviewer: 'Sarah Mitchell & Lead Architect',
    status: 'Scheduled'
  },
  {
    id: 902,
    candidate_id: 1,
    candidate_name: 'Jake Richards',
    candidate_email: 'jake@titan.com',
    job_title: 'Lead AI Research Engineer',
    company: 'NeuralPath Labs',
    date: 'Mon, Nov 09, 2026',
    time: '03:00 PM - 04:00 PM',
    format: 'System Design',
    meeting_url: 'https://zoom.us/j/984210384',
    interviewer: 'Dr. David Chen (ML Director)',
    status: 'Scheduled'
  }
];

const DEFAULT_AUDIT_LOGS: AuditLog[] = [
  {
    id: 1001,
    timestamp: '14:32:01',
    event: 'Candidate Application Submitted',
    user: 'Jake Richards (jake@titan.com)',
    role: 'Candidate',
    status: 'success',
    details: 'Applied to Senior Full-Stack Engineer with 94% ATS score'
  },
  {
    id: 1002,
    timestamp: '14:28:15',
    event: 'Employer Verified Badge Granted',
    user: 'Titan Super Admin',
    role: 'Super Admin',
    status: 'success',
    details: 'Granted ✓ Verified Employer status to Quantum Systems Inc.'
  },
  {
    id: 1003,
    timestamp: '14:15:40',
    event: 'User Session Authentication',
    user: 'Sarah Mitchell (employer@titan.com)',
    role: 'Employer',
    status: 'info',
    details: '256-Bit JWT Session Token issued'
  },
  {
    id: 1004,
    timestamp: '13:50:12',
    event: 'Job Moderation Approved',
    user: 'Titan Super Admin',
    role: 'Super Admin',
    status: 'success',
    details: 'Approved Lead AI Research Engineer posting'
  }
];

const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  ats_scanner: true,
  mock_interview: true,
  public_registration: true,
  maintenance_mode: false,
  auto_jd_writer: true,
};

const DEFAULT_TAXONOMIES: CategoryTaxonomy[] = [
  { id: 'cat-1', name: 'AI & Machine Learning', icon: 'psychology', count: 48, slug: 'ai-ml' },
  { id: 'cat-2', name: 'Software Engineering', icon: 'code', count: 124, slug: 'engineering' },
  { id: 'cat-3', name: 'Product & UX Design', icon: 'palette', count: 36, slug: 'design' },
  { id: 'cat-4', name: 'Cloud & DevOps SRE', icon: 'cloud', count: 52, slug: 'cloud' },
  { id: 'cat-5', name: 'Data & Analytics', icon: 'analytics', count: 41, slug: 'data' },
  { id: 'cat-6', name: 'Cybersecurity & Auditing', icon: 'security', count: 19, slug: 'security' },
];

const DEFAULT_SALARY_BENCHMARKS: SalaryBenchmark[] = [
  {
    domain: 'Software Engineering',
    role: 'Full-Stack Engineer',
    seniority: 'Entry',
    baseSalary: '$85,000',
    range: '$75k – $95k',
    bonusPercent: '8%',
    inDemandSkills: ['React.js', 'JavaScript', 'Node.js', 'PostgreSQL']
  },
  {
    domain: 'Software Engineering',
    role: 'Senior Full-Stack Engineer',
    seniority: 'Senior',
    baseSalary: '$165,000',
    range: '$145k – $195k',
    bonusPercent: '15%',
    inDemandSkills: ['Next.js', 'TypeScript', 'FastAPI', 'AWS', 'System Design']
  },
  {
    domain: 'Software Engineering',
    role: 'Principal Architect',
    seniority: 'Lead',
    baseSalary: '$225,000',
    range: '$195k – $260k + Equity',
    bonusPercent: '20%',
    inDemandSkills: ['Distributed Systems', 'Kubernetes', 'Cloud Architecture', 'Leadership']
  },
  {
    domain: 'AI & Data',
    role: 'AI / ML Engineer',
    seniority: 'Mid',
    baseSalary: '$140,000',
    range: '$125k – $160k',
    bonusPercent: '12%',
    inDemandSkills: ['Python', 'PyTorch', 'Transformers', 'FastAPI']
  },
  {
    domain: 'AI & Data',
    role: 'Lead AI Scientist',
    seniority: 'Lead',
    baseSalary: '$240,000',
    range: '$210k – $280k + Equity',
    bonusPercent: '25%',
    inDemandSkills: ['LLM Fine-Tuning', 'Distributed GPU', 'RAG Pipelines', 'Research']
  },
  {
    domain: 'Product & Design',
    role: 'Senior Product Designer',
    seniority: 'Senior',
    baseSalary: '$145,000',
    range: '$130k – $165k',
    bonusPercent: '10%',
    inDemandSkills: ['Figma', 'Design Systems', 'Micro-interactions', 'User Research']
  }
];

// Reactive Portal Store Singleton — Database-backed via API routes
class PortalStore {
  private user: User | null = null;
  private jobs: Job[] = DEFAULT_JOBS;
  private locums: LocumRole[] = DEFAULT_LOCUMS;
  private applications: Application[] = DEFAULT_APPLICATIONS;
  private resumes: ResumeData[] = DEFAULT_RESUMES;
  private savedJobs: SavedJob[] = DEFAULT_SAVED_JOBS;
  private messages: Message[] = DEFAULT_MESSAGES;
  private jobAlerts: JobAlert[] = DEFAULT_JOB_ALERTS;
  private announcements: RagAnnouncement[] = DEFAULT_ANNOUNCEMENTS;
  private interviews: InterviewSession[] = DEFAULT_INTERVIEWS;
  private auditLogs: AuditLog[] = DEFAULT_AUDIT_LOGS;
  private featureFlags: FeatureFlags = DEFAULT_FEATURE_FLAGS;
  private taxonomies: CategoryTaxonomy[] = DEFAULT_TAXONOMIES;
  private salaryBenchmarks: SalaryBenchmark[] = DEFAULT_SALARY_BENCHMARKS;
  private listeners: Set<() => void> = new Set();
  private initialized: boolean = false;

  constructor() {
    // Hydrate from database API after React hydration completes
    if (typeof window !== 'undefined') {
      setTimeout(() => this.hydrateFromDatabase(), 0);
    }
  }

  // Fetch real data from database API routes
  private async hydrateFromDatabase() {
    try {
      // Fetch jobs from database
      const jobsRes = await fetch('/api/jobs').then(r => r.json()).catch(() => null);
      if (jobsRes?.status === 'ok' && Array.isArray(jobsRes.data) && jobsRes.data.length > 0) {
        this.jobs = jobsRes.data.map((j: any) => ({
          id: j.id,
          title: j.title,
          company: j.company,
          location: j.location,
          type: j.type || 'Full-time',
          style: j.style || 'Hybrid',
          salary: j.salary || 'Competitive',
          salary_min: 0,
          salary_max: 0,
          experience: j.experience || '',
          seniority: j.seniority || '',
          status: j.status || 'Active',
          applicants: j._count?.applications || 0,
          interviews: 0,
          closing_date: '',
          posted_by: j.employer?.name || 'Employer',
          posted_days_ago: Math.floor((Date.now() - new Date(j.createdAt).getTime()) / 86400000),
          is_featured: j.isFeatured || false,
          is_verified_employer: true,
          department: j.department || '',
          description: j.description || '',
          qualifications: j.skills || [],
          responsibilities: [],
        }));
      }

      // Fetch applications from database
      const appsRes = await fetch('/api/applications').then(r => r.json()).catch(() => null);
      if (appsRes?.status === 'ok' && Array.isArray(appsRes.data) && appsRes.data.length > 0) {
        this.applications = appsRes.data.map((a: any) => ({
          id: a.id,
          candidate_id: a.candidateId,
          candidate_name: a.candidate?.name || 'Candidate',
          candidate_email: a.candidate?.email || '',
          candidate_avatar: a.candidate?.image || '/images/candidate-avatar.jpg',
          job_id: a.jobId,
          job_title: a.job?.title || 'Position',
          company: a.job?.company || 'Company',
          status: a.status?.replace(/_/g, ' ') || 'Applied',
          applied_date: new Date(a.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          ats_score: 90,
          star_rating: 0,
          recruiter_notes: a.notes || '',
          cover_letter: a.coverLetter || '',
          resume_version: 'Primary Resume',
          skills: [],
          experience_years: '',
        }));
      }

      this.initialized = true;
      this.notify();
    } catch (err) {
      console.warn('Store database hydration error (falling back to defaults):', err);
      this.initialized = true;
      this.notify();
    }
  }

  // Notify subscribers to re-render (replaces saveToLocalStorage)
  private persistAndNotify() {
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  // User Actions
  public getUser(): User | null {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return this.user !== null;
  }

  public setUser(user: User | null) {
    this.user = user;
    this.persistAndNotify();
  }

  public loginRole(role: 'candidate' | 'employer' | 'admin') {
    if (role === 'employer') {
      this.user = { ...DEFAULT_RECRUITER };
    } else if (role === 'admin') {
      this.user = { ...DEFAULT_ADMIN };
    } else {
      this.user = { ...DEFAULT_USER };
    }
    this.persistAndNotify();
    this.addAuditLog('User Signed In', `${this.user.name} (${this.user.email})`, this.user.role, 'success');
  }

  public loginWithCredentials(email: string, role: 'candidate' | 'employer' | 'admin', name?: string, phone?: string, id?: string | number) {
    if (role === 'admin') {
      this.user = {
        ...DEFAULT_ADMIN,
        id: id || DEFAULT_ADMIN.id,
        email,
        name: name || 'Titan Super Admin'
      };
    } else if (role === 'employer') {
      this.user = {
        ...DEFAULT_RECRUITER,
        id: id || DEFAULT_RECRUITER.id,
        email,
        name: name || 'Talent Acquisition Director'
      };
    } else {
      this.user = {
        ...DEFAULT_USER,
        id: id || DEFAULT_USER.id,
        email,
        name: name || 'Jake Richards',
        phone: phone || '+44 7700 900234'
      };
    }
    this.persistAndNotify();
    this.addAuditLog('User Authenticated', `${this.user.name} logged in (${this.user.role})`, this.user.role, 'success');
  }

  public loginWithGoogle(role: 'candidate' | 'employer' | 'admin', email?: string, name?: string, avatar?: string) {
    const defaultEmail = role === 'admin' 
      ? 'admin.master@titan-networks.org' 
      : role === 'employer' 
      ? 'sarah.mitchell.hr@gmail.com' 
      : 'jake.richards.dev@gmail.com';
    const defaultName = role === 'admin'
      ? 'Admin Director (Google Verified)'
      : role === 'employer'
      ? 'Sarah Mitchell (Google Verified)'
      : 'Jake Richards (Google Verified)';

    const userObj: User = {
      id: Date.now(),
      name: name || defaultName,
      email: email || defaultEmail,
      role,
      title: role === 'admin' ? 'Chief System Administrator' : role === 'employer' ? 'Lead Technical Recruiter' : 'Senior Full-Stack Engineer',
      location: 'London / Remote',
      avatar: avatar || (role === 'admin' ? '/images/admin-avatar.jpg' : role === 'employer' ? '/images/employer-avatar.jpg' : '/images/candidate-avatar.jpg'),
      isVerified: true,
      status: 'active',
      score: 96,
      created_at: new Date().toISOString().split('T')[0]
    };

    this.user = userObj;
    this.persistAndNotify();
    this.addAuditLog('Google OAuth Login', `${this.user.name} logged in via Google (${this.user.email})`, this.user.role, 'success');
  }

  public logout() {
    this.user = null;
    this.notify();
  }

  // Jobs Actions
  public getJobs(): Job[] {
    return this.jobs;
  }

  public getJobById(id: number | string): Job | undefined {
    return this.jobs.find(j => String(j.id) === String(id));
  }

  public addJob(job: Omit<Job, 'id' | 'applicants' | 'interviews' | 'posted_days_ago'>): Job {
    const newJob: Job = {
      ...job,
      id: Date.now(),
      applicants: 0,
      interviews: 0,
      posted_days_ago: 0,
      status: 'Active',
      is_featured: job.is_featured ?? false,
      is_verified_employer: true
    };
    this.jobs = [newJob, ...this.jobs];
    this.persistAndNotify();
    this.addAuditLog('Job Created', `Created: ${newJob.title} @ ${newJob.company}`, 'Employer', 'success');

    // Async sync to database API
    if (typeof window !== 'undefined') {
      fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newJob.title,
          company: newJob.company,
          description: newJob.description,
          location: newJob.location,
          salary: newJob.salary,
          type: newJob.type?.toUpperCase().replace('-', '_') || 'FULL_TIME',
          style: newJob.style?.toUpperCase().replace('-', '_') || 'HYBRID',
          skills: newJob.qualifications || [],
          department: newJob.department,
          seniority: newJob.seniority,
          experience: newJob.experience,
          employerId: this.user?.id ? String(this.user.id) : 'default-employer'
        })
      }).catch(e => console.warn('Background DB sync (jobs):', e));
    }

    return newJob;
  }

  public updateJobStatus(jobId: number | string, status: Job['status']) {
    this.jobs = this.jobs.map(j => String(j.id) === String(jobId) ? { ...j, status } : j);
    this.persistAndNotify();
    this.addAuditLog('Job Moderation', `Job ID #${jobId} status set to ${status}`, 'Super Admin', 'info');
  }

  public toggleJobFeatured(jobId: number | string) {
    this.jobs = this.jobs.map(j => String(j.id) === String(jobId) ? { ...j, is_featured: !j.is_featured } : j);
    this.persistAndNotify();
  }

  // Applications & Kanban Pipeline
  public getApplications(): Application[] {
    return this.applications;
  }

  public applyToJob(jobId: number | string, coverLetter?: string, resumeVersionName?: string): Application {
    const job = this.getJobById(jobId);
    const primaryResume = this.resumes.find(r => r.is_primary) || this.resumes[0];

    const newApp: Application = {
      id: Date.now(),
      candidate_id: this.user ? this.user.id : 1,
      candidate_name: this.user ? this.user.name : 'Candidate',
      candidate_email: this.user ? this.user.email : 'candidate@titan.com',
      candidate_avatar: this.user?.avatar || '/images/candidate-avatar.jpg',
      job_id: jobId,
      job_title: job ? job.title : 'Software Engineer',
      company: job ? job.company : 'Titan Partner',
      status: 'Applied',
      applied_date: 'Just now',
      ats_score: primaryResume ? primaryResume.ats_score : 92,
      star_rating: 0,
      recruiter_notes: '',
      cover_letter: coverLetter || `Dear Hiring Manager at ${job?.company || 'Company'}, I am writing to express my enthusiastic interest in the ${job?.title} position.`,
      resume_version: resumeVersionName || primaryResume?.versionName || 'Primary ATS Resume',
      skills: primaryResume ? primaryResume.parsed_skills.slice(0, 5) : ['React', 'Next.js', 'Python'],
      experience_years: '6+ Years'
    };

    this.applications = [newApp, ...this.applications];
    
    // Increment applicant count on job
    if (job) {
      this.jobs = this.jobs.map(j => String(j.id) === String(jobId) ? { ...j, applicants: j.applicants + 1 } : j);
    }

    this.persistAndNotify();
    this.addAuditLog('Candidate Applied', `${newApp.candidate_name} applied to ${newApp.job_title}`, 'Candidate', 'success');

    // Async sync to database API
    if (typeof window !== 'undefined') {
      fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: String(jobId),
          candidateId: this.user?.id ? String(this.user.id) : 'default-candidate',
          coverLetter: newApp.cover_letter,
          resumeUrl: primaryResume?.filename
        })
      }).catch(e => console.warn('Background DB sync (applications):', e));
    }

    return newApp;
  }

  public updateApplicationStage(appId: number | string, newStage: KanbanStage) {
    this.applications = this.applications.map(a => String(a.id) === String(appId) ? { ...a, status: newStage } : a);
    this.persistAndNotify();
    this.addAuditLog('Kanban Stage Advanced', `Application #${appId} moved to ${newStage}`, 'Employer', 'info');

    // Async sync to database API
    if (typeof window !== 'undefined') {
      const stageMap: Record<string, string> = {
        'Applied': 'APPLIED',
        'Screening': 'SCREENING',
        'Technical Interview': 'INTERVIEW_SCHEDULED',
        'Final Round': 'INTERVIEWED',
        'Offer Extended': 'OFFER_MADE',
        'Hired': 'HIRED',
        'Rejected': 'REJECTED'
      };
      fetch('/api/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: String(appId),
          status: stageMap[newStage] || newStage.toUpperCase().replace(/\s+/g, '_')
        })
      }).catch(e => console.warn('Background DB sync (stage update):', e));
    }
  }

  public updateApplicationScorecard(appId: number | string, rating: number, notes: string) {
    this.applications = this.applications.map(a => String(a.id) === String(appId) ? { ...a, star_rating: rating, recruiter_notes: notes } : a);
    this.persistAndNotify();
    this.addAuditLog('Candidate Scorecard Updated', `Application #${appId} rated ${rating} stars`, 'Employer', 'success');

    // Async sync to database API
    if (typeof window !== 'undefined') {
      fetch('/api/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: String(appId),
          status: 'SCREENING',
          notes: notes
        })
      }).catch(e => console.warn('Background DB sync (scorecard):', e));
    }
  }

  // Resumes
  public getResumes(): ResumeData[] {
    return this.resumes;
  }

  public getPrimaryResume(): ResumeData | undefined {
    return this.resumes.find(r => r.is_primary) || this.resumes[0];
  }

  public saveResume(resume: ResumeData) {
    const existingIndex = this.resumes.findIndex(r => r.id === resume.id);
    if (existingIndex >= 0) {
      this.resumes[existingIndex] = resume;
    } else {
      this.resumes = [resume, ...this.resumes];
    }
    this.persistAndNotify();
  }

  public setPrimaryResume(resumeId: number | string) {
    this.resumes = this.resumes.map(r => ({
      ...r,
      is_primary: String(r.id) === String(resumeId)
    }));
    this.persistAndNotify();
  }

  public duplicateResume(resumeId: number | string): ResumeData | undefined {
    const target = this.resumes.find(r => String(r.id) === String(resumeId));
    if (!target) return undefined;

    const copy: ResumeData = {
      ...JSON.parse(JSON.stringify(target)),
      id: Date.now(),
      versionName: `${target.versionName} (Copy)`,
      filename: target.filename.replace('.pdf', '_copy.pdf'),
      is_primary: false,
      upload_date: 'Just now'
    };

    this.resumes = [copy, ...this.resumes];
    this.persistAndNotify();
    return copy;
  }

  public deleteResume(resumeId: number | string) {
    this.resumes = this.resumes.filter(r => String(r.id) !== String(resumeId));
    if (this.resumes.length > 0 && !this.resumes.some(r => r.is_primary)) {
      this.resumes[0].is_primary = true;
    }
    this.persistAndNotify();
  }

  // Saved Jobs
  public getSavedJobs(): SavedJob[] {
    return this.savedJobs;
  }

  public toggleSaveJob(jobId: number | string): boolean {
    const existing = this.savedJobs.find(s => String(s.job_id) === String(jobId));
    if (existing) {
      this.savedJobs = this.savedJobs.filter(s => String(s.job_id) !== String(jobId));
      this.persistAndNotify();
      return false; // Removed
    } else {
      const job = this.getJobById(jobId);
      if (job) {
        this.savedJobs.push({
          id: Date.now(),
          candidate_id: this.user ? this.user.id : 1,
          job_id: jobId,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          match_score: 92,
          saved_date: 'Just now'
        });
        this.persistAndNotify();
        return true; // Added
      }
      return false;
    }
  }

  public isJobSaved(jobId: number | string): boolean {
    return this.savedJobs.some(s => s.job_id === jobId);
  }

  // Messages
  public getMessages(): Message[] {
    return this.messages;
  }

  public sendMessage(text: string, recipientId: number | string = 2, attachment?: string): Message {
    const newMsg: Message = {
      id: Date.now(),
      sender_id: this.user ? this.user.id : 1,
      sender_name: this.user ? this.user.name : 'User',
      sender_role: this.user?.role === 'employer' ? 'Recruiter' : 'Candidate',
      avatar: this.user?.avatar || '/images/candidate-avatar.jpg',
      recipient_id: recipientId,
      text,
      timestamp: 'Just now',
      attachment
    };
    this.messages = [...this.messages, newMsg];
    this.persistAndNotify();
    return newMsg;
  }

  // Interviews
  public getInterviews(): InterviewSession[] {
    return this.interviews;
  }

  public scheduleInterview(session: Omit<InterviewSession, 'id' | 'status'>): InterviewSession {
    const newInterview: InterviewSession = {
      ...session,
      id: Date.now(),
      status: 'Scheduled'
    };
    this.interviews = [newInterview, ...this.interviews];
    this.persistAndNotify();
    this.addAuditLog('Interview Scheduled', `Scheduled with ${newInterview.candidate_name} on ${newInterview.date}`, 'Employer', 'success');
    return newInterview;
  }

  // RAG Announcements
  public getAnnouncements(): RagAnnouncement[] {
    return this.announcements;
  }

  public addAnnouncement(announcement: Omit<RagAnnouncement, 'id' | 'timestamp'>): RagAnnouncement {
    const newAnn: RagAnnouncement = {
      ...announcement,
      id: Date.now(),
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    this.announcements = [newAnn, ...this.announcements];
    this.persistAndNotify();
    this.addAuditLog('RAG Announcement Published', `Published: ${newAnn.title}`, 'Super Admin', 'info');
    return newAnn;
  }

  public deleteAnnouncement(id: number | string) {
    this.announcements = this.announcements.filter(a => a.id !== id);
    this.persistAndNotify();
  }

  // Audit Logs
  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public addAuditLog(event: string, details: string, role: string = 'System', status: AuditLog['status'] = 'info') {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const log: AuditLog = {
      id: Date.now(),
      timestamp: timeStr,
      event,
      user: this.user ? this.user.name : 'System User',
      role,
      status,
      details
    };
    this.auditLogs = [log, ...this.auditLogs.slice(0, 49)];
    this.persistAndNotify();
  }

  // Feature Flags & Taxonomies
  public getFeatureFlags(): FeatureFlags {
    return this.featureFlags;
  }

  public toggleFeatureFlag(flag: keyof FeatureFlags) {
    this.featureFlags = {
      ...this.featureFlags,
      [flag]: !this.featureFlags[flag]
    };
    this.persistAndNotify();
    this.addAuditLog('Feature Flag Toggled', `Toggled ${String(flag)} to ${this.featureFlags[flag]}`, 'Super Admin', 'warning');
  }

  public getTaxonomies(): CategoryTaxonomy[] {
    return this.taxonomies;
  }

  public addTaxonomy(name: string, icon: string = 'category') {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const newTax: CategoryTaxonomy = {
      id: `cat-${Date.now()}`,
      name,
      icon,
      count: 0,
      slug
    };
    this.taxonomies = [...this.taxonomies, newTax];
    this.persistAndNotify();
  }

  public deleteTaxonomy(id: string) {
    this.taxonomies = this.taxonomies.filter(t => t.id !== id);
    this.persistAndNotify();
  }

  // Salary Benchmarks & Locums
  public getLocums(): LocumRole[] {
    return this.locums;
  }

  public getSalaryBenchmarks(): SalaryBenchmark[] {
    return this.salaryBenchmarks;
  }
}

export const portalStore = new PortalStore();
