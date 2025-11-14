/**
 * Authentication Activity Logger
 * Tracks user sign-ins, sign-outs, and authentication events
 */

export interface AuthLog {
  id: string
  userId: string | null
  userEmail: string | null
  userName: string | null
  event: 'sign_in' | 'sign_out' | 'sign_up' | 'failed_auth' | 'session_created' | 'session_revoked'
  ipAddress: string
  userAgent: string
  timestamp: string
  metadata?: Record<string, unknown>
}

class AuthLogger {
  private logs: AuthLog[] = []
  private maxLogs = 500 // Keep last 500 auth events

  /**
   * Log an authentication event
   */
  log(event: Omit<AuthLog, 'id' | 'timestamp'>): void {
    const authLog: AuthLog = {
      ...event,
      id: `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    }

    // Add to in-memory store
    this.logs.unshift(authLog) // Add to beginning
    
    // Trim old logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    // Console log for Vercel logs
    const logLevel = event.event === 'failed_auth' ? 'warn' : 'log'
    console[logLevel]('[AUTH LOG]', {
      event: event.event,
      user: event.userEmail || event.userId,
      ip: event.ipAddress,
      timestamp: authLog.timestamp,
    })
  }

  /**
   * Get all logs (admin only)
   */
  getAllLogs(limit = 100): AuthLog[] {
    return this.logs.slice(0, limit)
  }

  /**
   * Get logs by user ID
   */
  getLogsByUser(userId: string, limit = 50): AuthLog[] {
    return this.logs
      .filter(log => log.userId === userId)
      .slice(0, limit)
  }

  /**
   * Get logs by event type
   */
  getLogsByEvent(event: AuthLog['event'], limit = 50): AuthLog[] {
    return this.logs
      .filter(log => log.event === event)
      .slice(0, limit)
  }

  /**
   * Get recent sign-ins
   */
  getRecentSignIns(limit = 20): AuthLog[] {
    return this.logs
      .filter(log => log.event === 'sign_in')
      .slice(0, limit)
  }

  /**
   * Get failed auth attempts
   */
  getFailedAttempts(limit = 20): AuthLog[] {
    return this.logs
      .filter(log => log.event === 'failed_auth')
      .slice(0, limit)
  }

  /**
   * Get statistics
   */
  getStats(): {
    totalLogs: number
    eventCounts: Record<string, number>
    uniqueUsers: number
    recentActivity: AuthLog[]
  } {
    const eventCounts: Record<string, number> = {}
    const uniqueUsers = new Set<string>()

    this.logs.forEach(log => {
      // Count events
      eventCounts[log.event] = (eventCounts[log.event] || 0) + 1
      
      // Track unique users
      if (log.userId) {
        uniqueUsers.add(log.userId)
      }
    })

    return {
      totalLogs: this.logs.length,
      eventCounts,
      uniqueUsers: uniqueUsers.size,
      recentActivity: this.logs.slice(0, 10),
    }
  }

  /**
   * Clear old logs (maintenance)
   */
  clearOldLogs(daysOld = 30): void {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)
    
    this.logs = this.logs.filter(log => 
      new Date(log.timestamp) > cutoffDate
    )
  }
}

// Singleton instance
export const authLogger = new AuthLogger()

// Convenience functions
export function logSignIn(userId: string, userEmail: string, userName: string, ipAddress: string, userAgent: string): void {
  authLogger.log({
    userId,
    userEmail,
    userName,
    event: 'sign_in',
    ipAddress,
    userAgent,
  })
}

export function logSignOut(userId: string, userEmail: string, userName: string, ipAddress: string, userAgent: string): void {
  authLogger.log({
    userId,
    userEmail,
    userName,
    event: 'sign_out',
    ipAddress,
    userAgent,
  })
}

export function logSignUp(userId: string, userEmail: string, userName: string, ipAddress: string, userAgent: string): void {
  authLogger.log({
    userId,
    userEmail,
    userName,
    event: 'sign_up',
    ipAddress,
    userAgent,
  })
}

export function logFailedAuth(ipAddress: string, userAgent: string, reason?: string): void {
  authLogger.log({
    userId: null,
    userEmail: null,
    userName: null,
    event: 'failed_auth',
    ipAddress,
    userAgent,
    metadata: reason ? { reason } : undefined,
  })
}
