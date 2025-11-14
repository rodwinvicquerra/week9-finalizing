"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Activity, 
  LogIn, 
  LogOut, 
  UserPlus, 
  Shield, 
  AlertCircle,
  Search,
  RefreshCw,
  Home,
  Filter,
  Calendar,
  User,
  Globe
} from "lucide-react"
import Link from "next/link"
import { useAuth, useUser } from "@clerk/nextjs"
import type { AuthLog } from "@/lib/security/auth-logger"

interface LogsResponse {
  logs: AuthLog[]
  stats: {
    totalLogs: number
    eventCounts: Record<string, number>
    uniqueUsers: number
    recentActivity: AuthLog[]
  }
  count: number
  total: number
}

export default function AdminLogsPage() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const [logs, setLogs] = useState<AuthLog[]>([])
  const [stats, setStats] = useState<LogsResponse['stats'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEvent, setFilterEvent] = useState<string>("all")

  // Check if user has admin role
  const publicMetadata = user?.publicMetadata as { role?: string } | undefined
  const role = publicMetadata?.role
  const isAdmin = role?.toLowerCase() === 'admin'

  // Debug logging
  useEffect(() => {
    console.log('Admin Logs Page - User Check:', {
      isSignedIn,
      userId: user?.id,
      publicMetadata,
      role,
      isAdmin
    })
  }, [isSignedIn, user, publicMetadata, role, isAdmin])

  useEffect(() => {
    if (isSignedIn && isAdmin) {
      fetchLogs()
    }
  }, [isSignedIn, isAdmin, filterEvent])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterEvent !== 'all') {
        params.append('event', filterEvent)
      }
      
      const response = await fetch(`/api/admin/logs?${params.toString()}`)
      if (response.ok) {
        const data: LogsResponse = await response.json()
        setLogs(data.logs)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Redirect if not signed in or not admin
  useEffect(() => {
    if (isSignedIn !== undefined && !isSignedIn) {
      window.location.href = '/sign-in'
    } else if (user && !isAdmin) {
      window.location.href = '/portfolio'
    }
  }, [isSignedIn, user, isAdmin])

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Access denied. Redirecting...</p>
        </div>
      </div>
    )
  }

  const filteredLogs = logs.filter(log => {
    const searchLower = searchTerm.toLowerCase()
    return (
      log.userEmail?.toLowerCase().includes(searchLower) ||
      log.userName?.toLowerCase().includes(searchLower) ||
      log.ipAddress.includes(searchLower)
    )
  })

  const getEventIcon = (event: AuthLog['event']) => {
    switch (event) {
      case 'sign_in':
        return <LogIn className="h-4 w-4" />
      case 'sign_out':
        return <LogOut className="h-4 w-4" />
      case 'sign_up':
        return <UserPlus className="h-4 w-4" />
      case 'failed_auth':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getEventBadgeVariant = (event: AuthLog['event']) => {
    switch (event) {
      case 'sign_in':
      case 'sign_up':
        return 'default'
      case 'sign_out':
        return 'secondary'
      case 'failed_auth':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getEventLabel = (event: AuthLog['event']) => {
    return event.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex gap-3 mb-8">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/portfolio">
              <Home className="h-4 w-4" />
              Portfolio
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/security">
              <Shield className="h-4 w-4" />
              Security Dashboard
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <Activity className="h-4 w-4" />
            Authentication Logs
          </div>
          <h1 className="text-4xl font-bold mb-2">User Activity Logs</h1>
          <p className="text-muted-foreground">
            Monitor user authentication events, sign-ins, sign-outs, and security events
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalLogs}</div>
                  <div className="text-sm text-muted-foreground">Total Events</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <LogIn className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.eventCounts.sign_in || 0}</div>
                  <div className="text-sm text-muted-foreground">Sign Ins</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
                  <div className="text-sm text-muted-foreground">Unique Users</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-red-500/10">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.eventCounts.failed_auth || 0}</div>
                  <div className="text-sm text-muted-foreground">Failed Attempts</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email, name, or IP address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
                className="px-4 py-2 rounded-md border border-input bg-background text-sm"
              >
                <option value="all">All Events</option>
                <option value="sign_in">Sign In</option>
                <option value="sign_out">Sign Out</option>
                <option value="sign_up">Sign Up</option>
                <option value="failed_auth">Failed Auth</option>
              </select>
              <Button onClick={fetchLogs} variant="outline" size="icon" disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </Card>

        {/* Logs Table */}
        <Card className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {logs.length} events
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Loading logs...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No logs found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-1">
                    <div className={`p-2 rounded-lg ${
                      log.event === 'failed_auth' ? 'bg-red-500/10' :
                      log.event === 'sign_in' || log.event === 'sign_up' ? 'bg-green-500/10' :
                      'bg-blue-500/10'
                    }`}>
                      {getEventIcon(log.event)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getEventBadgeVariant(log.event)}>
                        {getEventLabel(log.event)}
                      </Badge>
                      {log.userName && (
                        <span className="font-medium truncate">{log.userName}</span>
                      )}
                    </div>

                    {log.userEmail && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <User className="h-3 w-3" />
                        {log.userEmail}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <span>{log.ipAddress}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </div>

                    {log.userAgent && (
                      <div className="text-xs text-muted-foreground mt-1 truncate">
                        {log.userAgent}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
