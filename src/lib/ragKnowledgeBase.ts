export interface RagKnowledgeItem {
  id: string;
  category: 'Programs & Courses' | 'Admissions & Fees' | 'Campus & Facilities' | 'Placement & Career Cell' | 'Accreditation & Quality' | 'Schedules & Notices' | 'Contact & Support';
  title: string;
  tags: string[];
  content: string;
  highlights?: string[];
  duration?: string;
  fee?: string;
  actionUrl?: string;
}

export const TITAN_INSTITUTE_KNOWLEDGE_BASE: RagKnowledgeItem[] = [
  // 1. PROGRAMS & COURSES
  {
    id: 'course-dit',
    category: 'Programs & Courses',
    title: 'Diploma in Information Technology (DIT) - 1 Year',
    tags: ['dit', 'diploma', 'information technology', 'basics', 'office automation', 'web design', 'database', 'it', 'matric'],
    content: 'The 1-Year Diploma in Information Technology (DIT) is TITAN’s foundational program recognized for government and corporate IT roles. The curriculum covers Office Automation, Database Management (SQL Server & MySQL), Web Design (HTML5, CSS3, JavaScript), C++ Programming, and PC Hardware Assembly & Troubleshooting.',
    highlights: ['Hands-on computer lab training', 'Board of Technical Education certified', 'Internship assistance included'],
    duration: '1 Year (2 Semesters)',
    fee: 'PKR 4,500 / month (or PKR 24,000 / semester)',
    actionUrl: '/advertise'
  },
  {
    id: 'course-cisco-ccna',
    category: 'Programs & Courses',
    title: 'Cisco Certified Network Associate (CCNA 200-301)',
    tags: ['ccna', 'cisco', 'networking', 'routing', 'switching', 'ip addressing', 'subnets', 'vlans', 'ospf', 'bgp', 'cisco lab', 'network engineer'],
    content: 'TITAN is an official Cisco Academy offering comprehensive CCNA 200-301 training. Students work directly on physical Cisco 2900/4000 series routers, Catalyst 3650/2960 switches, and Cisco Packet Tracer / GNS3 simulations. Topics: IPv4/IPv6 Subnetting, VLAN Trunking, Inter-VLAN Routing, OSPFv2/v3, Wireless LANs, NAT/ACLs, Network Automation (Python & REST APIs).',
    highlights: ['Real physical rack equipment', 'Official Cisco Academy course materials', 'Pearson VUE exam voucher discount up to 50%'],
    duration: '3 Months (Weekend & Evening Batches available)',
    fee: 'PKR 18,000 (Total program fee + Lab access)',
    actionUrl: '/jobs'
  },
  {
    id: 'course-cyber-security',
    category: 'Programs & Courses',
    title: 'Cyber Security & Ethical Hacking (Certified Defense Practitioner)',
    tags: ['cyber security', 'ethical hacking', 'penetration testing', 'kali linux', 'soc analyst', 'network security', 'wireshark', 'metasploit', 'cs', 'computer science'],
    content: 'Advanced hands-on program in offensive and defensive cybersecurity. Covers Kali Linux, Network Reconnaissance (Nmap, Wireshark), Vulnerability Assessment, Web App Penetration Testing (OWASP Top 10, Burp Suite), Metasploit, Cryptography, Incident Handling, and SOC operations. Practical labs in TITAN Cyber Range.',
    highlights: ['Live attack-and-defense CTF challenges', 'SOC analyst job readiness', 'ISO 27001 compliance fundamentals'],
    duration: '4 Months (Intensive Practical Training)',
    fee: 'PKR 25,000 (Installments available in 2 parts)',
    actionUrl: '/jobs'
  },
  {
    id: 'course-cloud-devops',
    category: 'Programs & Courses',
    title: 'Cloud Computing & DevOps (AWS / Azure & Kubernetes)',
    tags: ['cloud', 'aws', 'azure', 'devops', 'docker', 'kubernetes', 'ci/cd', 'terraform', 'linux', 'cs', 'computer science'],
    content: 'Industry-driven DevOps & Cloud Architecture program. Prepares students for AWS Solutions Architect & Azure Administrator certifications. Covers Linux System Administration, Infrastructure as Code (Terraform), Docker Containerization, Kubernetes Cluster Management, GitHub Actions CI/CD pipelines, and Prometheus/Grafana monitoring.',
    highlights: ['Multi-cloud deployment projects', 'Production-grade Kubernetes clusters', 'Automated CI/CD portfolio setup'],
    duration: '3.5 Months',
    fee: 'PKR 28,000 (Includes cloud sandbox credits)',
    actionUrl: '/jobs'
  },
  {
    id: 'course-fullstack-web',
    category: 'Programs & Courses',
    title: 'Full-Stack Web Development (Next.js, React, Node.js & Python FastAPI)',
    tags: ['full stack', 'web development', 'react', 'nextjs', 'typescript', 'python', 'fastapi', 'tailwind', 'postgresql', 'cs', 'computer science', 'software engineering', 'coding', 'programming'],
    content: 'Modern software engineering bootcamp covering frontend and backend technologies. Topics: TypeScript, Next.js 14/15 App Router, React 18, Tailwind CSS, Python FastAPI, PostgreSQL, Prisma ORM, JWT Authentication, RESTful APIs, and cloud deployment on Vercel and AWS.',
    highlights: ['Build 4 real-world full-stack web applications', 'Git & GitHub collaboration', 'Direct matching with TITAN hiring partners'],
    duration: '4 Months',
    fee: 'PKR 22,000 (Monthly installments: PKR 5,500/mo)',
    actionUrl: '/jobs'
  },
  {
    id: 'course-data-ai',
    category: 'Programs & Courses',
    title: 'Applied AI & Data Science (Machine Learning & RAG Engineering)',
    tags: ['ai', 'data science', 'machine learning', 'python', 'rag', 'llm', 'deep learning', 'pandas', 'pytorch', 'cs', 'computer science', 'artificial intelligence'],
    content: 'Comprehensive curriculum spanning Data Analysis (Pandas, NumPy, Matplotlib), Classical Machine Learning (Scikit-Learn), Deep Learning (PyTorch), and cutting-edge GenAI (LLM Fine-Tuning, Vector Databases, Retrieval-Augmented Generation RAG pipelines).',
    highlights: ['Build production RAG pipelines', 'High-performance GPU cluster access', 'Industry capstone project'],
    duration: '4 Months',
    fee: 'PKR 30,000 (Installments available)',
    actionUrl: '/jobs'
  },

  // 2. ADMISSIONS & FEES
  {
    id: 'adm-schedule',
    category: 'Admissions & Fees',
    title: 'Admissions Schedule & Intake Cycles (Spring & Fall 2026/2027)',
    tags: ['admissions', 'apply', 'registration', 'intake', 'deadline', 'spring', 'fall', 'timings', 'batches', 'when', 'start date'],
    content: 'TITAN conducts two major admission sessions each year: Spring Intake (Admissions open Dec–Jan, classes start February) and Fall Intake (Admissions open July–August, classes start September). Mid-session short-course registrations open on the 1st of every month for professional weekend and evening batches.',
    highlights: ['Morning batches: 9:00 AM – 1:00 PM', 'Evening batches: 5:00 PM – 8:00 PM', 'Weekend Executive batches: Sat & Sun (10:00 AM – 4:00 PM)'],
    actionUrl: '/register'
  },
  {
    id: 'adm-requirements',
    category: 'Admissions & Fees',
    title: 'Admission Eligibility Criteria & Required Documents',
    tags: ['eligibility', 'requirements', 'documents', 'qualification', 'matric', 'intermediate', 'cnic', 'criteria'],
    content: 'For 1-Year DIT & Vocational Diplomas: Matriculation (Science/Arts) or equivalent with minimum 45% marks. For Advanced Certifications (CCNA, Cyber Security, Cloud, AI): Intermediate / DIT / Graduation or basic computer literacy. Required documents: 1x CNIC / B-Form copy, 2x Passport photos, Educational Mark sheets / Certificates copy.',
    highlights: ['No age restriction for professional certification tracks', 'Instant online registration with provisional admission slip'],
    actionUrl: '/register'
  },
  {
    id: 'adm-scholarships',
    category: 'Admissions & Fees',
    title: 'Scholarships, Fee Concessions & Installment Plans',
    tags: ['scholarship', 'discount', 'fee waiver', 'financial aid', 'merit', 'installments', 'concession', 'fee', 'cost', 'charges', 'kitna'],
    content: 'TITAN offers: 1) Merit Scholarships (Up to 100% tuition fee waiver for top scorers in admission test), 2) Need-Based Concessions, 3) Sibling/Alumni Discount (15% off), 4) Early Bird Registration (10% waiver). All course fees can be paid in monthly or semester installments.',
    highlights: ['Zero-interest installment plans', 'Over PKR 5 Million in annual scholarship disbursements'],
    actionUrl: '/advertise'
  },

  // 3. CAMPUS & FACILITIES
  {
    id: 'campus-pearson-vue',
    category: 'Campus & Facilities',
    title: 'Pearson VUE Authorized Testing Center on Campus',
    tags: ['pearson vue', 'testing center', 'exam center', 'certification exam', 'cisco exam', 'microsoft exam', 'aws exam'],
    content: 'TITAN houses an official Pearson VUE Authorized Test Center (Site ID: PV-TITAN-042). Students and external candidates can take international certification exams on campus with high security, dedicated exam stations, biometric verification, and uninterrupted power backup.',
    highlights: ['Available Monday to Saturday', 'Instant official score reports', 'On-campus exam proctors'],
    actionUrl: '/locum'
  },
  {
    id: 'campus-labs-infra',
    category: 'Campus & Facilities',
    title: 'State-of-the-Art Practical Computer & Cisco Networking Labs',
    tags: ['labs', 'facilities', 'hardware', 'cisco rack', 'gpu server', 'fiber internet', 'generator backup', 'computers'],
    content: 'TITAN features 8 air-conditioned computer labs equipped with Core i7/i9 workstations, dedicated Cisco physical router and switch racks, enterprise firewall appliances, and high-performance NVIDIA GPU servers for AI deep learning. Uninterrupted 100 Mbps fiber-optic internet and dedicated solar/generator power backup.',
    highlights: ['1:1 Student-to-PC ratio in practical sessions', '24/7 Remote Lab access for enrolled students']
  },

  // 4. PLACEMENT & CAREER CELL
  {
    id: 'placement-stats',
    category: 'Placement & Career Cell',
    title: 'Titan Placement Cell & 50,000+ Alumni Network',
    tags: ['placement', 'jobs', 'alumni', 'hiring', 'recruitment', 'internship', 'career drive', 'success rate', 'salary'],
    content: 'The TITAN Career Placement Cell connects graduates directly with over 350+ partner tech companies, software houses, and telecom enterprises. With 50,000+ alumni working worldwide in companies like Titan Technology Group, CloudScale, CyberShield Defense, and Apex Fintech, TITAN maintains a 94% job placement rate within 6 months of graduation.',
    highlights: ['Free resume review & mock interviews for students', 'Bi-annual on-campus mega recruitment job fair', 'Direct job matching through TITAN Job Portal'],
    actionUrl: '/jobs'
  },
  {
    id: 'placement-partners',
    category: 'Placement & Career Cell',
    title: 'Corporate Hiring Partners & Industry Tie-ups',
    tags: ['partners', 'companies', 'corporate', 'titan tech group', 'cloudscale', 'cybershield'],
    content: 'Key recruitment partners actively hiring TITAN certified candidates include: 1) Titan Technology Group (London & Remote), 2) CloudScale Systems (Zurich / Berlin), 3) CyberShield Defense (Manchester), 4) Apex Fintech (Singapore), and 5) Nexus Telecom.',
    highlights: ['Direct interview fast-tracking for top-scoring students', 'Starting salary packages range from $60,000 to $120,000+ for overseas/remote roles'],
    actionUrl: '/jobs'
  },

  // 5. ACCREDITATION & QUALITY
  {
    id: 'accreditation-iso',
    category: 'Accreditation & Quality',
    title: 'ISO 9001:2015 Certified Quality Management System',
    tags: ['iso', 'certified', 'accreditation', 'quality', 'iso 9001:2015', 'recognized', 'standards'],
    content: 'Taj Institute of Technology & Applied Networks (TITAN) is fully certified under ISO 9001:2015 for maintaining international quality standards in technical curriculum design, practical lab execution, instructor competency, and student evaluation.',
    highlights: ['Internationally verifiable certificate QR codes', 'Curriculum updated bi-annually with industry advisory board']
  },

  // 6. CONTACT & SUPPORT
  {
    id: 'contact-info',
    category: 'Contact & Support',
    title: 'Campus Location, Helpline & Admission Inquiry Desk',
    tags: ['contact', 'address', 'location', 'phone', 'email', 'helpline', 'whatsapp', 'visiting hours', 'where'],
    content: 'Taj Institute of Technology & Applied Networks (TITAN) Main Campus is open Monday through Saturday from 8:30 AM to 8:30 PM. Admission Office Helpline: +44 7700 900234 / +92 51 111-TITAN. Email: admissions@titan-networks.org / info@titan.edu. Location: Titan Technology Campus, Applied Networks Avenue.',
    highlights: ['Walk-in campus tours available daily', 'WhatsApp career counseling support available 24/7'],
    actionUrl: '/register'
  }
];

// SYNONYM & ACRONYM EXPANSION DICTIONARY
const SYNONYM_MAP: Record<string, string[]> = {
  cs: ['computer science', 'full stack', 'web development', 'ai', 'cyber security', 'programming'],
  se: ['software engineering', 'full stack', 'coding', 'web development'],
  it: ['information technology', 'dit', 'networking', 'cyber security'],
  student: ['courses', 'admissions', 'scholarship', 'eligibility'],
  students: ['courses', 'admissions', 'scholarship', 'eligibility'],
  course: ['programs', 'training', 'classes', 'diploma'],
  courses: ['programs', 'training', 'classes', 'diploma'],
  fees: ['fee', 'cost', 'price', 'charges', 'installment', 'scholarship'],
  fee: ['cost', 'price', 'charges', 'installment', 'scholarship'],
  cost: ['fee', 'pricing', 'installment'],
  admission: ['apply', 'registration', 'intake', 'deadline', 'spring', 'fall'],
  admissions: ['apply', 'registration', 'intake', 'deadline', 'spring', 'fall'],
  timing: ['schedule', 'batches', 'timings', 'morning', 'evening', 'weekend'],
  timings: ['schedule', 'batches', 'timings', 'morning', 'evening', 'weekend'],
  cisco: ['ccna', 'networking', 'routing', 'switching'],
  ccna: ['cisco', 'networking', 'routing', 'switching', 'rack'],
  hack: ['cyber security', 'ethical hacking', 'penetration testing'],
  hacking: ['cyber security', 'ethical hacking', 'kali linux'],
  security: ['cyber security', 'ethical hacking', 'soc'],
  cloud: ['aws', 'azure', 'devops', 'docker', 'kubernetes'],
  jobs: ['job', 'placement', 'hiring', 'salary', 'vacancies'],
  job: ['placement', 'hiring', 'salary', 'vacancies']
};

export function expandQuerySynonyms(query: string): string[] {
  const q = query.toLowerCase();
  const rawTokens = q.split(/[\s,?.!]+/).filter(t => t.length >= 2);
  const expanded = new Set<string>(rawTokens);

  for (const token of rawTokens) {
    if (SYNONYM_MAP[token]) {
      SYNONYM_MAP[token].forEach(syn => expanded.add(syn));
    }
  }

  return Array.from(expanded);
}

// HYBRID RETRIEVAL WITH MULTI-TURN CONTEXT BUFFER
export function retrieveRelevantKnowledge(
  query: string,
  topK: number = 4,
  historyContext: string = ''
): { item: RagKnowledgeItem; score: number; matchReason: string }[] {
  const combinedText = `${historyContext} ${query}`.toLowerCase().trim();
  if (!combinedText) return [];

  const expandedTokens = expandQuerySynonyms(combinedText);
  const isDirectQuery = query.toLowerCase();
  const results: { item: RagKnowledgeItem; score: number; matchReason: string }[] = [];

  for (const item of TITAN_INSTITUTE_KNOWLEDGE_BASE) {
    let score = 0;
    const matchReasons: string[] = [];

    // Direct Title Matching (Highest priority)
    if (isDirectQuery.includes(item.title.toLowerCase()) || item.title.toLowerCase().includes(isDirectQuery)) {
      score += 30;
      matchReasons.push('Direct Title Match');
    }

    // Expanded Tag Matching
    for (const tag of item.tags) {
      if (isDirectQuery.includes(tag.toLowerCase())) {
        score += 15;
        matchReasons.push(`Matched Tag: "${tag}"`);
      } else {
        for (const token of expandedTokens) {
          if (tag.toLowerCase() === token || tag.toLowerCase().includes(token)) {
            score += 8;
            matchReasons.push(`Synonym Match: "${token}"`);
          }
        }
      }
    }

    // Content frequency
    const contentLower = item.content.toLowerCase();
    for (const token of expandedTokens) {
      if (token.length > 2 && contentLower.includes(token)) {
        score += 3;
      }
    }

    // CS / Computer Science Student Specific Booster
    if (/\b(cs|computer science|se|software|coding)\b/i.test(combinedText)) {
      if (item.id === 'course-fullstack-web' || item.id === 'course-data-ai' || item.id === 'course-cyber-security') {
        score += 35;
        matchReasons.push('CS Student Curriculum Recommendation');
      }
    }

    // Fee Specific Booster
    if (/\b(fee|fees|cost|price|charges|kitna|installment)\b/i.test(combinedText)) {
      if (item.fee) {
        score += 25;
        matchReasons.push('Fee Query Intent');
      }
    }

    // Cisco Specific Booster
    if (/\b(cisco|ccna|networking|switch|router)\b/i.test(combinedText)) {
      if (item.id === 'course-cisco-ccna') {
        score += 35;
        matchReasons.push('Cisco CCNA Academy Match');
      }
    }

    if (score > 0) {
      results.push({
        item,
        score,
        matchReason: matchReasons.slice(0, 2).join(', ') || 'Keyword relevance'
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
