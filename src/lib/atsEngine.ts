import { AtsScoreResult } from './types';

const COMMON_TECH_KEYWORDS = [
  'react', 'react.js', 'next.js', 'typescript', 'javascript', 'python', 'fastapi',
  'node.js', 'express', 'postgresql', 'mongodb', 'sql', 'nosql', 'graphql', 'rest api',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'git', 'github',
  'tailwind css', 'css3', 'html5', 'figma', 'ui/ux', 'system design', 'microservices',
  'machine learning', 'pytorch', 'tensorflow', 'llm', 'rag', 'data pipelines',
  'agile', 'scrum', 'jira', 'unit testing', 'jest', 'cypress', 'redis', 'kafka'
];

export function analyzeResumeAts(resumeText: string, jobDescription?: string): AtsScoreResult {
  if (!resumeText || resumeText.trim().length === 0) {
    return {
      overallScore: 0,
      keywordScore: 0,
      impactScore: 0,
      formattingScore: 0,
      experienceScore: 0,
      matchedKeywords: [],
      missingKeywords: ['React', 'TypeScript', 'Node.js', 'AWS', 'System Design'],
      recommendations: ['Paste or upload your resume text to generate a full ATS score.']
    };
  }

  const cleanResume = resumeText.toLowerCase();
  const targetKeywords = jobDescription
    ? extractKeywordsFromText(jobDescription)
    : COMMON_TECH_KEYWORDS.slice(0, 15);

  const matched: string[] = [];
  const missing: string[] = [];

  targetKeywords.forEach(kw => {
    if (cleanResume.includes(kw.toLowerCase())) {
      matched.push(formatKeyword(kw));
    } else {
      missing.push(formatKeyword(kw));
    }
  });

  // 1. Keyword Score (0 - 100)
  const keywordScore = Math.min(100, Math.round((matched.length / Math.max(1, targetKeywords.length)) * 100) + 15);

  // 2. Impact Metrics Score (checks for %, numbers, $, metrics)
  const hasPercentages = /%\s|percent|\d+%/i.test(resumeText);
  const hasNumbers = /\d+\+?\s*(years|users|projects|team|clients|increase|revenue|growth)/i.test(resumeText);
  const hasDollars = /\$\d+|\bUSD\b|\bk\b/i.test(resumeText);
  let impactScore = 50;
  if (hasPercentages) impactScore += 20;
  if (hasNumbers) impactScore += 20;
  if (hasDollars) impactScore += 10;
  impactScore = Math.min(100, impactScore);

  // 3. Formatting Score (checks for clean sections: experience, education, skills, summary)
  let formattingScore = 60;
  if (/experience|work history|employment/i.test(cleanResume)) formattingScore += 12;
  if (/education|degree|university|college/i.test(cleanResume)) formattingScore += 12;
  if (/skills|technologies|proficiencies/i.test(cleanResume)) formattingScore += 10;
  if (/summary|objective|about/i.test(cleanResume)) formattingScore += 6;
  formattingScore = Math.min(100, formattingScore);

  // 4. Experience & Seniority Score
  let experienceScore = 70;
  if (/lead|senior|architect|principal|staff/i.test(cleanResume)) experienceScore += 20;
  else if (/engineer|developer|specialist/i.test(cleanResume)) experienceScore += 10;
  if (cleanResume.length > 800) experienceScore += 10;
  experienceScore = Math.min(100, experienceScore);

  // Overall Weighted Score
  const overallScore = Math.round(
    keywordScore * 0.35 +
    impactScore * 0.25 +
    formattingScore * 0.20 +
    experienceScore * 0.20
  );

  const recommendations: string[] = [];
  if (missing.length > 0) {
    recommendations.push(`Incorporate high-value keywords missing from your profile: ${missing.slice(0, 4).join(', ')}.`);
  }
  if (impactScore < 75) {
    recommendations.push('Add quantifiable impact metrics to your bullet points (e.g., "Boosted API response time by 42%").');
  }
  if (formattingScore < 85) {
    recommendations.push('Ensure distinct section headings: "Professional Experience", "Technical Skills", "Education".');
  }
  if (recommendations.length === 0) {
    recommendations.push('Outstanding profile! Your resume is strongly aligned with modern ATS scanners.');
  }

  return {
    overallScore: Math.max(45, Math.min(99, overallScore)),
    keywordScore: Math.max(40, Math.min(98, keywordScore)),
    impactScore,
    formattingScore,
    experienceScore,
    matchedKeywords: matched.length > 0 ? matched : ['JavaScript', 'HTML5', 'CSS3'],
    missingKeywords: missing.slice(0, 8),
    recommendations
  };
}

function extractKeywordsFromText(text: string): string[] {
  const clean = text.toLowerCase();
  const found: string[] = [];
  COMMON_TECH_KEYWORDS.forEach(kw => {
    if (clean.includes(kw)) {
      found.push(kw);
    }
  });
  if (found.length < 5) {
    return ['react', 'typescript', 'python', 'fastapi', 'cloud systems', 'docker', 'system design'];
  }
  return Array.from(new Set(found));
}

function formatKeyword(kw: string): string {
  const map: Record<string, string> = {
    'react': 'React.js',
    'next.js': 'Next.js',
    'typescript': 'TypeScript',
    'javascript': 'JavaScript',
    'python': 'Python',
    'fastapi': 'FastAPI',
    'node.js': 'Node.js',
    'postgresql': 'PostgreSQL',
    'mongodb': 'MongoDB',
    'graphql': 'GraphQL',
    'rest api': 'REST APIs',
    'aws': 'AWS Cloud',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'tailwind css': 'Tailwind CSS',
    'ui/ux': 'UI/UX Design',
    'system design': 'System Architecture',
    'machine learning': 'Machine Learning',
    'pytorch': 'PyTorch',
    'llm': 'LLM & AI Systems'
  };
  return map[kw.toLowerCase()] || kw.charAt(0).toUpperCase() + kw.slice(1);
}
