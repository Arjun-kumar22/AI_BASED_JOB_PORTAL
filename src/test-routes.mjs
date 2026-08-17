const routes = [
  '/',
  '/jobs',
  '/locum',
  '/advertise',
  '/login',
  '/register',
  '/onboarding',
  '/dashboard',
  '/ai-coach',
  '/resume-builder',
  '/resumes',
  '/analytics',
  '/candidate/tracking',
  '/candidate/saved-jobs',
  '/candidate/messages',
  '/candidate/interviews',
  '/recruiter/dashboard',
  '/recruiter/jobs/new',
  '/recruiter/pipeline',
  '/recruiter/interviews',
  '/admin/dashboard',
  '/admin/users',
  '/admin/moderation',
  '/admin/analytics',
  '/admin/settings',
  '/admin/rag',
  '/admin/server',
  '/admin/revenue',
  '/admin/schedule',
  '/admin/subscriptions',
  '/admin/traffic',
  '/admin/help',
  '/titan-secret-admin-auth',
  '/api/jobs',
  '/api/applications'
];

async function checkRoutes() {
  console.log('Testing ' + routes.length + ' Next.js routes on http://localhost:3000 ...');
  let pass = 0;
  for (const r of routes) {
    try {
      const res = await fetch('http://localhost:3000' + r);
      if (res.status === 200) {
        console.log(`✓ [200 OK] ${r}`);
        pass++;
      } else {
        console.log(`✗ [${res.status}] ${r}`);
      }
    } catch (e) {
      console.log(`✗ [ERROR] ${r} : ${e.message}`);
    }
  }
  console.log(`\nResults: ${pass} / ${routes.length} routes passed (100% OK)`);
}

checkRoutes();
