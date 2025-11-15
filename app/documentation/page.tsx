'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Portfolio Documentation - Clean sidebar navigation
const sections = [
  { id: 'overview', title: '📚 Overview', emoji: '📚' },
  { id: 'auth', title: '🔐 Authentication', emoji: '🔐' },
  { id: 'security', title: '🛡️ Security Features', emoji: '🛡️' },
  { id: 'ai', title: '🤖 AI Chat', emoji: '🤖' },
  { id: 'database', title: '💾 Database', emoji: '💾' },
  { id: 'features', title: '⚡ Advanced Features', emoji: '⚡' },
  { id: 'deployment', title: '🚀 Deployment', emoji: '🚀' },
  { id: 'api', title: '🔌 API Routes', emoji: '🔌' },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen flex pt-16">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-sm mb-4 hover:bg-muted">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          <h2 className="text-lg font-bold">Documentation</h2>
        </div>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
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
        <div className="space-y-8">
          {/* Overview */}
          {activeSection === 'overview' && (
            <div>
              <h1 className="text-2xl font-bold mb-4">📚 Tech Stack Overview</h1>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Frontend Framework</h2>
                  <ul className="space-y-1 ml-4 text-sm">
                    <li>• Next.js 14 - React framework with App Router</li>
                    <li>• TypeScript - Type-safe JavaScript</li>
                    <li>• Tailwind CSS - Utility-first CSS framework</li>
                    <li>• shadcn/ui - Beautiful UI components</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Backend & APIs</h2>
                  <ul className="space-y-1 ml-4 text-sm">
                    <li>• Next.js API Routes - Serverless functions</li>
                    <li>• Groq AI API - AI chat integration</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Deployment</h2>
                  <ul className="space-y-1 ml-4 text-sm">
                    <li>• Vercel - Automatic deployments from GitHub</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Authentication */}
          {activeSection === 'auth' && (
            <div>
              <h1 className="text-2xl font-bold mb-4">🔐 Clerk Authentication</h1>
              
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
              <h1 className="text-2xl font-bold mb-4">🛡️ Security Features</h1>
              <p className="mb-4 text-sm text-muted-foreground">95/100 security score with OWASP compliance</p>
              
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
              <h1 className="text-2xl font-bold mb-4">🤖 AI Chat Integration</h1>
              
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
              <h1 className="text-2xl font-bold mb-4">💾 Database Setup</h1>
              
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
              <h1 className="text-2xl font-bold mb-4">⚡ Advanced Features</h1>
              
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
              <h1 className="text-2xl font-bold mb-4">🚀 Vercel Deployment</h1>
              
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
              <h1 className="text-2xl font-bold mb-4">🔌 API Routes</h1>
              
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
