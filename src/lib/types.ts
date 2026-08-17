export type UserRole = 'candidate' | 'employer' | 'admin';

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: UserRole;
  title?: string;
  score?: number;
  availability?: string;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  companyName?: string;
  isVerified?: boolean;
  status?: 'active' | 'suspended';
  created_at?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  style: 'Remote' | 'Hybrid' | 'On-site' | 'Office / Hybrid';
  salary: string;
  salary_min?: number;
  salary_max?: number;
  experience: string;
  seniority?: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
  status: 'Active' | 'Reviewing' | 'Closed' | 'Draft' | 'Flagged';
  applicants: number;
  interviews: number;
  closing_date: string;
  description: string;
  qualifications: string[];
  responsibilities: string[];
  posted_by?: string;
  posted_days_ago?: number;
  is_featured?: boolean;
  is_verified_employer?: boolean;
  department?: string;
}

export interface LocumRole {
  id: number;
  title: string;
  company: string;
  location: string;
  date_tag: string;
  apps_count: number;
  duration: string;
  badge: string;
  skills: string[];
  is_urgent: boolean;
  description: string;
  rate?: string;
}

export type KanbanStage =
  | 'Applied'
  | 'Screening'
  | 'Technical Interview'
  | 'Final Round'
  | 'Offer Extended'
  | 'Hired'
  | 'Rejected';

export interface Application {
  id: number | string;
  candidate_id: number | string;
  candidate_name: string;
  candidate_email: string;
  candidate_avatar?: string;
  job_id: number | string;
  job_title: string;
  company: string;
  status: KanbanStage;
  applied_date: string;
  ats_score: number;
  star_rating?: number;
  recruiter_notes?: string;
  cover_letter?: string;
  resume_version?: string;
  skills?: string[];
  experience_years?: string;
}

export interface ResumeWorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface ResumeProject {
  id: string;
  title: string;
  techStack: string;
  link?: string;
  description: string;
}

export interface ResumeData {
  id: number | string;
  candidate_id: number | string;
  versionName: string;
  filename: string;
  filesize: string;
  upload_date: string;
  is_primary: boolean;
  views: number;
  downloads: number;
  ats_score: number;
  parsed_skills: string[];
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary: string;
  };
  experiences: ResumeWorkExperience[];
  education: ResumeEducation[];
  skills: string[];
  projects: ResumeProject[];
}

export interface SavedJob {
  id: number | string;
  candidate_id: number | string;
  job_id: number | string;
  title: string;
  company: string;
  location: string;
  salary: string;
  match_score: number;
  saved_date: string;
}

export interface Message {
  id: number | string;
  sender_id: number | string;
  sender_name: string;
  sender_role: string;
  avatar?: string;
  recipient_id: number | string;
  text: string;
  timestamp: string;
  attachment?: string;
}

export interface JobAlert {
  id: number | string;
  candidate_id: number | string;
  title: string;
  location: string;
  frequency: 'Daily' | 'Weekly' | 'Instant';
  is_active: boolean;
}

export interface RagAnnouncement {
  id: number | string;
  title: string;
  content: string;
  category: 'General' | 'Exam Schedule' | 'Recruitment Drive' | 'Academic Notice' | 'Campus Event';
  author: string;
  timestamp: string;
}

export interface InterviewSession {
  id: number | string;
  candidate_id: number | string;
  candidate_name: string;
  candidate_email: string;
  job_title: string;
  company: string;
  date: string;
  time: string;
  format: 'Technical' | 'Behavioral' | 'System Design' | 'Executive';
  meeting_url: string;
  interviewer: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
}

export interface AuditLog {
  id: number;
  timestamp: string;
  event: string;
  user: string;
  role: string;
  status: 'success' | 'warning' | 'info';
  details?: string;
}

export interface FeatureFlags {
  ats_scanner: boolean;
  mock_interview: boolean;
  public_registration: boolean;
  maintenance_mode: boolean;
  auto_jd_writer: boolean;
}

export interface CategoryTaxonomy {
  id: string;
  name: string;
  icon: string;
  count: number;
  slug: string;
}

export interface SalaryBenchmark {
  domain: string;
  role: string;
  seniority: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  baseSalary: string;
  range: string;
  bonusPercent: string;
  inDemandSkills: string[];
}

export interface AtsScoreResult {
  overallScore: number;
  keywordScore: number;
  impactScore: number;
  formattingScore: number;
  experienceScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
}

export interface MockQuestion {
  id: number;
  role: string;
  category: 'Behavioral' | 'System Design' | 'Coding' | 'Architecture';
  question: string;
  hints: string[];
  sampleStar: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface RoadmapMilestone {
  dayRange: string;
  phase: string;
  title: string;
  focus: string;
  actionItems: { id: string; text: string; done: boolean }[];
  recommendedSkills: string[];
  resources: { name: string; type: string; url?: string }[];
}
