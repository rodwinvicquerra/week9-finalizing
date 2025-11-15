'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Sparkles, MessageSquare, TestTube, Github, Database, Lock, FileText } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    icon: FileText,
  },
  {
    id: 'authentication',
    title: 'Authentication & Security',
    icon: Lock,
  },
  {
    id: 'features',
    title: 'Advanced Features',
    icon: Sparkles,
  },
  {
    id: 'ai-chat',
    title: 'AI Chat System',
    icon: MessageSquare,
  },
  {
    id: 'security',
    title: 'Security Implementation',
    icon: Shield,
  },
  {
    id: 'testing',
    title: 'Testing & Quality',
    icon: TestTube,
  },
  {
    id: 'repositories',
    title: 'GitHub Repository',
    icon: Github,
  },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Comprehensive technical documentation for my portfolio system featuring <span className="font-semibold text-blue-600">advanced security</span>,{' '}
              <span className="font-semibold text-purple-600">AI integration</span>, and{' '}
              <span className="font-semibold text-pink-600">modern web technologies</span>.
            </p>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
          </div>

          {/* Horizontal Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-muted hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:shadow-md hover:scale-105'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-2xl">About This Portfolio</CardTitle>
                      <CardDescription>
                        A production-ready{' '}
                        <span className="font-semibold text-blue-600">Next.js 14</span> portfolio featuring{' '}
                        <span className="font-semibold text-purple-600">advanced security</span>,{' '}
                        <span className="font-semibold text-pink-600">AI-powered chat</span>, and{' '}
                        <span className="font-semibold text-green-600">role-based access control</span>.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="hover:scale-105 transition-transform duration-300">
                        <h3 className="font-semibold mb-2 text-blue-600">Framework</h3>
                        <p className="text-sm text-muted-foreground">Next.js 14 with App Router</p>
                      </div>
                      <div className="hover:scale-105 transition-transform duration-300">
                        <h3 className="font-semibold mb-2 text-purple-600">AI Model</h3>
                        <p className="text-sm text-muted-foreground">Groq AI (llama-3.1-8b-instant)</p>
                      </div>
                      <div className="hover:scale-105 transition-transform duration-300">
                        <h3 className="font-semibold mb-2 text-pink-600">Database</h3>
                        <p className="text-sm text-muted-foreground">Neon PostgreSQL</p>
                      </div>
                      <div className="hover:scale-105 transition-transform duration-300">
                        <h3 className="font-semibold mb-2 text-green-600">Deployment</h3>
                        <p className="text-sm text-muted-foreground">Vercel Edge</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-500" onClick={() => setActiveSection('authentication')}>
                      <CardHeader>
                        <Lock className="h-8 w-8 mb-2 text-blue-600" />
                        <CardTitle>Authentication & Security</CardTitle>
                        <CardDescription>
                          <span className="font-semibold text-blue-600">Clerk OAuth</span> integration,{' '}
                          <span className="font-semibold text-purple-600">RBAC system</span>, and admin dashboard implementation.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700">Read more →</Button>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-purple-500" onClick={() => setActiveSection('features')}>
                      <CardHeader>
                        <Sparkles className="h-8 w-8 mb-2 text-purple-600" />
                        <CardTitle>Advanced Features</CardTitle>
                        <CardDescription>
                          <span className="font-semibold text-purple-600">Intrusion Detection System</span>,{' '}
                          <span className="font-semibold text-pink-600">CSP violation tracking</span>, and security notifications.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="link" className="p-0 text-purple-600 hover:text-purple-700">Read more →</Button>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-pink-500" onClick={() => setActiveSection('ai-chat')}>
                      <CardHeader>
                        <MessageSquare className="h-8 w-8 mb-2 text-pink-600" />
                        <CardTitle>AI Chat System</CardTitle>
                        <CardDescription>
                          Real-time AI assistant powered by{' '}
                          <span className="font-semibold text-pink-600">Groq</span> with{' '}
                          <span className="font-semibold text-purple-600">context-aware responses</span>.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="link" className="p-0 text-pink-600 hover:text-pink-700">Read more →</Button>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-green-500" onClick={() => setActiveSection('security')}>
                      <CardHeader>
                        <Shield className="h-8 w-8 mb-2 text-green-600" />
                        <CardTitle>Security Implementation</CardTitle>
                        <CardDescription>
                          <span className="font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">95/100 security score</span> with{' '}
                          <span className="font-semibold text-green-600">OWASP compliance</span> and advanced threat detection.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="link" className="p-0 text-green-600 hover:text-green-700">Read more →</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Authentication Section */}
              {activeSection === 'authentication' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Authentication & Security</CardTitle>
                      <CardDescription>
                        Comprehensive authentication system using Clerk with role-based access control.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Clerk OAuth Integration</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Secure authentication with multiple OAuth providers and magic link support.
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Google OAuth integration</li>
                          <li>GitHub OAuth integration</li>
                          <li>Passwordless magic links</li>
                          <li>Session management with automatic refresh</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Role-Based Access Control (RBAC)</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Granular permission system with admin and user roles.
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Admin role with full access to security dashboard</li>
                          <li>User role for general portfolio access</li>
                          <li>Middleware-level protection for admin routes</li>
                          <li>Server-side authentication checks</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Implementation Details</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <code className="text-sm">
                            <pre>{`// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// Protected route check
const { userId, sessionClaims } = await auth();
const isAdmin = sessionClaims?.metadata?.role === 'admin';`}</pre>
                          </code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Advanced Features Section */}
              {activeSection === 'features' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Features</CardTitle>
                      <CardDescription>
                        Cutting-edge security and monitoring features for production environments.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Intrusion Detection System (IDS)</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Real-time threat detection with automatic IP blocking.
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Failed login attempt tracking (5 attempt threshold)</li>
                          <li>Rate limiting (50 requests/minute)</li>
                          <li>Threat scoring system (0-100 scale)</li>
                          <li>Automatic IP blocking for scores ≥80</li>
                          <li>Real-time security event monitoring</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">CSP Violation Tracking</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Content Security Policy monitoring to detect XSS attempts.
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Tracks all CSP violations in real-time</li>
                          <li>XSS attempt detection and logging</li>
                          <li>Violation statistics and analytics</li>
                          <li>Integration with security dashboard</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Security Notifications</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Automated alert system for critical security events.
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Email notifications for high-severity threats</li>
                          <li>Admin dashboard alerts</li>
                          <li>Configurable notification thresholds</li>
                          <li>Event categorization and priority levels</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* AI Chat Section */}
              {activeSection === 'ai-chat' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Chat System</CardTitle>
                      <CardDescription>
                        Intelligent portfolio assistant powered by Groq AI with real-time responses.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Technology Stack</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li><strong>Production:</strong> Groq AI with llama-3.1-8b-instant model</li>
                          <li><strong>Development:</strong> Ollama with llama3.2 for local testing</li>
                          <li><strong>Context Engine:</strong> Portfolio knowledge base system</li>
                          <li><strong>Streaming:</strong> Real-time response streaming</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">How It Works</h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                            <div>
                              <p className="text-sm font-medium">User asks a question</p>
                              <p className="text-xs text-muted-foreground">Question sent to /api/chat endpoint</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                            <div>
                              <p className="text-sm font-medium">Context injection</p>
                              <p className="text-xs text-muted-foreground">Portfolio data added to AI prompt</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                            <div>
                              <p className="text-sm font-medium">AI generates response</p>
                              <p className="text-xs text-muted-foreground">Groq processes with llama-3.1-8b-instant</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                            <div>
                              <p className="text-sm font-medium">Stream to user</p>
                              <p className="text-xs text-muted-foreground">Real-time response streaming for better UX</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Features</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>First-person conversational responses</li>
                          <li>Context-aware follow-up questions</li>
                          <li>Portfolio-focused knowledge base</li>
                          <li>Easter egg responses for fun interactions</li>
                          <li>Suggested quick questions</li>
                          <li>Chat history persistence</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Why Not Hardcoded?</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          The AI generates dynamic responses using Large Language Model technology:
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Each response is uniquely generated based on the question</li>
                          <li>Can combine information from multiple portfolio sections</li>
                          <li>Understands context and follow-up questions</li>
                          <li>Responds naturally in conversational first-person</li>
                          <li>Only easter eggs (Niño Marcos, Jan Cabe) are pre-defined jokes</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Implementation</CardTitle>
                      <CardDescription>
                        Achieved 95/100 security score with OWASP compliance and industry best practices.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Security Score: 95/100</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Comprehensive security implementation following OWASP Top 10 guidelines.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Security Features</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li><strong>Authentication:</strong> Clerk OAuth with session management</li>
                          <li><strong>Authorization:</strong> RBAC with admin/user roles</li>
                          <li><strong>Rate Limiting:</strong> 50 requests/minute per IP</li>
                          <li><strong>XSS Protection:</strong> CSP headers and violation tracking</li>
                          <li><strong>CSRF Protection:</strong> Token-based form protection</li>
                          <li><strong>SQL Injection:</strong> Parameterized queries with Neon</li>
                          <li><strong>IDS:</strong> Real-time intrusion detection and blocking</li>
                          <li><strong>HTTPS:</strong> Enforced SSL/TLS encryption</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Admin Security Dashboard</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Real-time monitoring interface at <code>/admin/security</code> (admin only)
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Security events timeline</li>
                          <li>Blocked IPs and threat scores</li>
                          <li>CSP violation logs</li>
                          <li>Security statistics and analytics</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">OWASP Top 10 Coverage</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-muted-foreground">Broken Access Control</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-muted-foreground">Cryptographic Failures</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-muted-foreground">Injection</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-muted-foreground">Insecure Design</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-muted-foreground">Security Misconfiguration</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-muted-foreground">Vulnerable Components</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-muted-foreground">Authentication Failures</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="text-muted-foreground">Data Integrity Failures</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Testing Section */}
              {activeSection === 'testing' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Testing & Quality Assurance</CardTitle>
                      <CardDescription>
                        Comprehensive testing strategy for security and functionality.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Security Testing</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>OWASP ZAP vulnerability scanning</li>
                          <li>Penetration testing methodologies</li>
                          <li>SQL injection testing</li>
                          <li>XSS attack simulation</li>
                          <li>CSRF token validation</li>
                          <li>Rate limiting verification</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Manual Testing</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Authentication flow testing</li>
                          <li>RBAC permission verification</li>
                          <li>AI chat response quality checks</li>
                          <li>Cross-browser compatibility</li>
                          <li>Mobile responsiveness</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Performance Optimization</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li>Lighthouse performance audits</li>
                          <li>Next.js build optimization</li>
                          <li>Image optimization with next/image</li>
                          <li>Code splitting and lazy loading</li>
                          <li>API response caching</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Repository Section */}
              {activeSection === 'repositories' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>GitHub Repository</CardTitle>
                      <CardDescription>
                        Access the complete source code and project documentation.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Repository Information</h3>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          <li><strong>Repository:</strong> week9-finalizing</li>
                          <li><strong>Owner:</strong> rodwinvicquerra</li>
                          <li><strong>Tech Stack:</strong> Next.js 14, TypeScript, Tailwind CSS</li>
                          <li><strong>Deployment:</strong> Automatic deployment via Vercel</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Key Files & Directories</h3>
                        <div className="bg-muted p-4 rounded-lg text-sm font-mono">
                          <div className="space-y-1">
                            <div>📁 app/ - Next.js 14 app directory</div>
                            <div className="ml-4">📁 api/chat/ - AI chat API route</div>
                            <div className="ml-4">📁 admin/security/ - Security dashboard</div>
                            <div>📁 components/ - React components</div>
                            <div className="ml-4">📁 chat/ - AI chat widget</div>
                            <div>📁 lib/ - Utilities and helpers</div>
                            <div className="ml-4">📄 portfolio-context.ts - AI knowledge base</div>
                            <div className="ml-4">📄 security/ids.ts - Intrusion detection</div>
                            <div>📄 middleware.ts - Auth & security middleware</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Button asChild className="w-full">
                          <a href="https://github.com/rodwinvicquerra/week9-finalizing" target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            View on GitHub
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
