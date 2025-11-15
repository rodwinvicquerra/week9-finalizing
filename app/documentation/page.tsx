'use client';

import { useState } from 'react';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'auth', title: 'Authentication' },
  { id: 'security', title: 'Security Features' },
  { id: 'ai', title: 'AI Chat' },
  { id: 'database', title: 'Database' },
  { id: 'features', title: 'Advanced Features' },
  { id: 'deployment', title: 'Deployment' },
  { id: 'api', title: 'API Routes' },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-6 sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Documentation</h2>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeSection === section.id
                  ? 'bg-foreground text-background'
                  : 'hover:bg-muted'
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-4xl">
        <div className="space-y-12">
          {/* Overview */}
          {activeSection === 'overview' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Tech Stack Overview</h1>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Frontend Framework</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• Next.js 14 - React framework with App Router</li>
                    <li>• TypeScript - Type-safe JavaScript</li>
                    <li>• Tailwind CSS - Utility-first CSS framework</li>
                    <li>• shadcn/ui - Beautiful UI components</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Backend & APIs</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• Next.js API Routes - Serverless functions</li>
                    <li>• Groq AI API - AI chat integration</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Deployment</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• Vercel - Automatic deployments from GitHub</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Authentication */}
          {activeSection === 'auth' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Clerk Authentication</h1>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Authentication Methods</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• OAuth providers (Google, GitHub)</li>
                    <li>• Magic link email authentication</li>
                    <li>• Passwordless sign-in</li>
                    <li>• Session management</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Role-Based Access Control (RBAC)</h2>
                  <div className="space-y-3 ml-4">
                    <div className="border p-4">
                      <p className="font-medium">Admin Role</p>
                      <p className="text-sm text-muted-foreground">Access to admin dashboard, security center, MCP integration</p>
                    </div>
                    <div className="border p-4">
                      <p className="font-medium">User Role</p>
                      <p className="text-sm text-muted-foreground">Portfolio viewing, AI chat, contact form</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Implementation</h2>
                  <pre className="bg-black text-white p-4 rounded overflow-x-auto text-sm">
{`import { auth } from '@clerk/nextjs';

// Server-side authentication check
const { userId, sessionClaims } = auth();
const userRole = sessionClaims?.metadata?.role;

// Protected route example
if (!userId || userRole !== 'admin') {
  return <AccessDenied />;
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Security Features</h1>
              <p className="mb-6">95/100 security score with OWASP compliance</p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">1. Intrusion Detection System (IDS)</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• Real-time threat detection and scoring (0-100)</li>
                    <li>• Failed login attempt tracking (5 attempt threshold)</li>
                    <li>• Rate limiting (50 requests/minute)</li>
                    <li>• Automatic IP blocking (threat score ≥80)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">2. Content Security Policy (CSP) Reporter</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• XSS attack detection</li>
                    <li>• CSP violation tracking</li>
                    <li>• Real-time security event logging</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">3. Security Notifications</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• Email alerts for critical threats</li>
                    <li>• Admin dashboard notifications</li>
                    <li>• Webhook integration ready</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">4. Security Operations Center</h2>
                  <p className="mb-3">Admin-only dashboard at <code className="bg-muted px-2 py-1 rounded">/admin/security</code></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Security Events - Real-time monitoring</li>
                    <li>• Threat Analysis - IP tracking & scoring</li>
                    <li>• CSP Reports - Violation tracking</li>
                    <li>• Statistics - Security metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* AI Chat */}
          {activeSection === 'ai' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">AI Chat Integration</h1>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">AI Model</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• Groq API - llama-3.1-8b-instant model</li>
                    <li>• Ollama (Fallback) - llama3.2 for local development</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Features</h2>
                  <ul className="space-y-2 ml-4">
                    <li>• Real-time AI responses (not hardcoded!)</li>
                    <li>• Context-aware conversations with portfolio knowledge</li>
                    <li>• First-person conversational responses</li>
                    <li>• Suggested questions for quick access</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">How It Works</h2>
                  <ol className="space-y-2 ml-4">
                    <li>1. User asks a question → sent to /api/chat endpoint</li>
                    <li>2. Portfolio context added to the prompt</li>
                    <li>3. Groq API processes and returns natural answer</li>
                    <li>4. Conversational answer shown to user</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Easter Eggs</h2>
                  <p className="mb-3 text-sm">Fun responses for friends (these ARE hardcoded):</p>
                  <div className="space-y-2 ml-4">
                    <div className="border p-3">
                      <p className="font-medium">"Who is Niño Marcos?"</p>
                      <p className="text-sm">Full-stack developer, lover boy, cybersecurity pro - the GOAT!</p>
                    </div>
                    <div className="border p-3">
                      <p className="font-medium">"Who is Jan Cabe?"</p>
                      <p className="text-sm">Millionaire programmer in the Philippines!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Database */}
          {activeSection === 'database' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Database Setup</h1>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Database Provider</h2>
                  <p className="mb-2">Neon PostgreSQL - Serverless Postgres</p>
                  <p className="text-sm text-muted-foreground ml-4">
                    Ready for future features like contact form submissions, analytics, and user feedback.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Connection Setup</h2>
                  <pre className="bg-black text-white p-4 rounded overflow-x-auto text-sm">
{`// lib/neon.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL!);

export { sql };`}
                  </pre>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Environment Variable</h2>
                  <pre className="bg-muted p-3 rounded text-sm">
POSTGRES_URL=postgresql://user:password@host/database
                  </pre>
                  <p className="text-sm text-muted-foreground mt-2">Set in Vercel environment variables for production</p>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          {activeSection === 'features' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Advanced Features</h1>
              
              <div className="space-y-4">
                <div className="border p-4">
                  <h3 className="font-semibold mb-2">Security First</h3>
                  <p className="text-sm">95/100 security score with IDS, CSP tracking, and OWASP compliance</p>
                </div>

                <div className="border p-4">
                  <h3 className="font-semibold mb-2">AI Integration</h3>
                  <p className="text-sm">Real-time AI chat with context-aware responses using Groq API</p>
                </div>

                <div className="border p-4">
                  <h3 className="font-semibold mb-2">RBAC System</h3>
                  <p className="text-sm">Role-based access control with admin and user permissions</p>
                </div>

                <div className="border p-4">
                  <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
                  <p className="text-sm">Security Operations Center with live threat detection</p>
                </div>

                <div className="border p-4">
                  <h3 className="font-semibold mb-2">Dark/Light Mode</h3>
                  <p className="text-sm">Seamless theme switching with system preference detection</p>
                </div>

                <div className="border p-4">
                  <h3 className="font-semibold mb-2">Modern UI/UX</h3>
                  <p className="text-sm">Beautiful components with Tailwind CSS and shadcn/ui</p>
                </div>
              </div>
            </div>
          )}

          {/* Deployment */}
          {activeSection === 'deployment' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Vercel Deployment</h1>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Deployment Process</h2>
                  <ol className="space-y-2 ml-4">
                    <li>1. Push code to GitHub repository</li>
                    <li>2. Vercel automatically detects changes</li>
                    <li>3. Builds Next.js application</li>
                    <li>4. Deploys to production in seconds</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Environment Variables</h2>
                  <pre className="bg-muted p-3 rounded text-sm space-y-1">
{`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
GROQ_API_KEY
POSTGRES_URL`}
                  </pre>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Build Configuration</h2>
                  <pre className="bg-black text-white p-4 rounded overflow-x-auto text-sm">
{`// vercel.json
{
  "buildCommand": "pnpm run build",
  "devCommand": "pnpm run dev",
  "framework": "nextjs"
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* API Routes */}
          {activeSection === 'api' && (
            <div>
              <h1 className="text-3xl font-bold mb-6">API Routes</h1>
              
              <div className="space-y-4">
                <div className="border p-4">
                  <p className="font-mono text-sm mb-2">POST /api/chat</p>
                  <p className="text-sm text-muted-foreground">AI chat endpoint - sends messages to Groq API</p>
                </div>

                <div className="border p-4">
                  <p className="font-mono text-sm mb-2">POST /api/contact</p>
                  <p className="text-sm text-muted-foreground">Contact form submission handler</p>
                </div>

                <div className="border p-4">
                  <p className="font-mono text-sm mb-2">POST /api/security/csp-report</p>
                  <p className="text-sm text-muted-foreground">CSP violation reporting endpoint</p>
                </div>

                <div className="border p-4">
                  <p className="font-mono text-sm mb-2">GET /api/security/dashboard</p>
                  <p className="text-sm text-muted-foreground">Security metrics and events (admin only)</p>
                </div>

                <div className="border p-4">
                  <p className="font-mono text-sm mb-2">GET /api/admin/users</p>
                  <p className="text-sm text-muted-foreground">User management endpoint (admin only)</p>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-3">Example API Call</h2>
                  <pre className="bg-black text-white p-4 rounded overflow-x-auto text-sm">
{`// Example: AI Chat API
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'What are your skills?',
    history: previousMessages
  })
});

const data = await response.json();
console.log(data.response); // AI generated answer`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Tech Stack Overview
                </CardTitle>
                <CardDescription>Modern technologies powering this portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    Frontend Framework
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge>Next.js 14</Badge>
                      <span className="text-sm text-muted-foreground">React framework with App Router</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>TypeScript</Badge>
                      <span className="text-sm text-muted-foreground">Type-safe JavaScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Tailwind CSS</Badge>
                      <span className="text-sm text-muted-foreground">Utility-first CSS framework</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>shadcn/ui</Badge>
                      <span className="text-sm text-muted-foreground">Beautiful UI components</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Backend & APIs</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Next.js API Routes</Badge>
                      <span className="text-sm text-muted-foreground">Serverless functions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Groq AI API</Badge>
                      <span className="text-sm text-muted-foreground">AI chat integration</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Deployment</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Vercel</Badge>
                      <span className="text-sm text-muted-foreground">Automatic deployments from GitHub</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authentication Tab */}
          <TabsContent value="auth">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Clerk Authentication
                </CardTitle>
                <CardDescription>OAuth and passwordless authentication system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Authentication Methods</h3>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>OAuth providers (Google, GitHub)</li>
                    <li>Magic link email authentication</li>
                    <li>Passwordless sign-in</li>
                    <li>Session management</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Role-Based Access Control (RBAC)</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-sm">Admin Role</p>
                      <p className="text-xs text-muted-foreground">Access to admin dashboard, security center, MCP integration</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium text-sm">User Role</p>
                      <p className="text-xs text-muted-foreground">Portfolio viewing, AI chat, contact form</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Implementation</h3>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`import { auth } from '@clerk/nextjs';

// Server-side authentication check
const { userId, sessionClaims } = auth();
const userRole = sessionClaims?.metadata?.role;

// Protected route example
if (!userId || userRole !== 'admin') {
  return <AccessDenied />;
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Advanced Security Features
                </CardTitle>
                <CardDescription>95/100 security score with OWASP compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">1. Intrusion Detection System (IDS)</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Real-time threat detection and scoring (0-100)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Failed login attempt tracking (5 attempt threshold)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Rate limiting (50 requests/minute)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>Automatic IP blocking (threat score ≥80)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">2. Content Security Policy (CSP) Reporter</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>XSS attack detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>CSP violation tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>Real-time security event logging</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">3. Security Notifications</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Email alerts for critical threats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Admin dashboard notifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span>Webhook integration ready</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">4. Security Operations Center</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Admin-only dashboard at <code className="bg-muted px-1 rounded">/admin/security</code>
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-muted rounded text-xs">
                      <p className="font-medium">Security Events</p>
                      <p className="text-muted-foreground">Real-time monitoring</p>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <p className="font-medium">Threat Analysis</p>
                      <p className="text-muted-foreground">IP tracking & scoring</p>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <p className="font-medium">CSP Reports</p>
                      <p className="text-muted-foreground">Violation tracking</p>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <p className="font-medium">Statistics</p>
                      <p className="text-muted-foreground">Security metrics</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Chat Integration
                </CardTitle>
                <CardDescription>Conversational AI powered by Groq</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">AI Model</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge>Groq API</Badge>
                      <span className="text-sm text-muted-foreground">llama-3.1-8b-instant model</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Ollama (Fallback)</Badge>
                      <span className="text-sm text-muted-foreground">llama3.2 for local development</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>Real-time AI responses (not hardcoded!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-purple-500 mt-0.5" />
                      <span>Context-aware conversations with portfolio knowledge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Code className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>First-person conversational responses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Eye className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Suggested questions for quick access</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">How It Works</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="text-sm font-medium">User asks a question</p>
                        <p className="text-xs text-muted-foreground">Question sent to /api/chat endpoint</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="text-sm font-medium">Context injection</p>
                        <p className="text-xs text-muted-foreground">Portfolio context added to the prompt</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="text-sm font-medium">AI generates response</p>
                        <p className="text-xs text-muted-foreground">Groq API processes and returns natural answer</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                      <div>
                        <p className="text-sm font-medium">Response displayed</p>
                        <p className="text-xs text-muted-foreground">Conversational answer shown to user</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Easter Eggs</h3>
                  <p className="text-xs text-muted-foreground mb-2">Fun responses for friends (these ARE hardcoded 😄):</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-muted rounded text-xs">
                      <p className="font-medium">"Who is Niño Marcos?"</p>
                      <p className="text-muted-foreground">Full-stack developer, lover boy, cybersecurity pro - the GOAT!</p>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs">
                      <p className="font-medium">"Who is Jan Cabe?"</p>
                      <p className="text-muted-foreground">Millionaire programmer in the Philippines!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Setup
                </CardTitle>
                <CardDescription>PostgreSQL with Neon serverless</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Database Provider</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Neon PostgreSQL</Badge>
                    <span className="text-sm text-muted-foreground">Serverless Postgres</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ready for future features like contact form submissions, analytics, and user feedback.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Connection Setup</h3>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`// lib/neon.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL!);

export { sql };`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Environment Variable</h3>
                  <div className="bg-muted p-3 rounded text-xs font-mono">
                    POSTGRES_URL=postgresql://user:password@host/database
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Set in Vercel environment variables for production
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Advanced Features
                </CardTitle>
                <CardDescription>What makes this portfolio special</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      Security First
                    </h4>
                    <p className="text-sm text-muted-foreground">95/100 security score with IDS, CSP tracking, and OWASP compliance</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      AI Integration
                    </h4>
                    <p className="text-sm text-muted-foreground">Real-time AI chat with context-aware responses using Groq API</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-500" />
                      RBAC System
                    </h4>
                    <p className="text-sm text-muted-foreground">Role-based access control with admin and user permissions</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Bell className="h-4 w-4 text-orange-500" />
                      Real-time Monitoring
                    </h4>
                    <p className="text-sm text-muted-foreground">Security Operations Center with live threat detection</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-pink-500" />
                      Dark/Light Mode
                    </h4>
                    <p className="text-sm text-muted-foreground">Seamless theme switching with system preference detection</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4 text-yellow-500" />
                      Modern UI/UX
                    </h4>
                    <p className="text-sm text-muted-foreground">Beautiful components with Tailwind CSS and shadcn/ui</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deployment Tab */}
          <TabsContent value="deployment">
            <Card>
              <CardHeader>
                <CardTitle>Vercel Deployment</CardTitle>
                <CardDescription>Automatic deployments from GitHub</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Deployment Process</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">1.</span>
                      <span>Push code to GitHub repository</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">2.</span>
                      <span>Vercel automatically detects changes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">3.</span>
                      <span>Builds Next.js application</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">4.</span>
                      <span>Deploys to production in seconds</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Environment Variables</h3>
                  <div className="space-y-2 text-xs font-mono bg-muted p-3 rounded">
                    <p>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</p>
                    <p>CLERK_SECRET_KEY</p>
                    <p>GROQ_API_KEY</p>
                    <p>POSTGRES_URL</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Build Configuration</h3>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`// vercel.json
{
  "buildCommand": "pnpm run build",
  "devCommand": "pnpm run dev",
  "framework": "nextjs"
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Routes Tab */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Routes</CardTitle>
                <CardDescription>Server-side endpoints and functions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Available Endpoints</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">POST</Badge>
                        <code className="text-sm">/api/chat</code>
                      </div>
                      <p className="text-xs text-muted-foreground">AI chat endpoint - sends messages to Groq API</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">POST</Badge>
                        <code className="text-sm">/api/contact</code>
                      </div>
                      <p className="text-xs text-muted-foreground">Contact form submission handler</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">POST</Badge>
                        <code className="text-sm">/api/security/csp-report</code>
                      </div>
                      <p className="text-xs text-muted-foreground">CSP violation reporting endpoint</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-sm">/api/security/dashboard</code>
                      </div>
                      <p className="text-xs text-muted-foreground">Security metrics and events (admin only)</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-sm">/api/admin/users</code>
                      </div>
                      <p className="text-xs text-muted-foreground">User management endpoint (admin only)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Example API Call</h3>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`// Example: AI Chat API
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'What are your skills?',
    history: previousMessages
  })
});

const data = await response.json();
console.log(data.response); // AI generated answer`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
