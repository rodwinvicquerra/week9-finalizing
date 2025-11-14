/**
 * Authentication Activity Logger with Database Storage
 * Tracks user sign-ins, sign-outs, and authentication events in Neon PostgreSQL
 */

import { sql } from '@vercel/postgres'

export interface AuthLog {
  id: string | number
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
  /**
   * Log an authentication event to database
   */
  async log(event: Omit<AuthLog, 'id' | 'timestamp'>): Promise<void> {
    try {
      await sql`
        INSERT INTO auth_logs (user_id, user_email, user_name, event, ip_address, user_agent, metadata)
        VALUES (
          ${event.userId},
          ${event.userEmail},
          ${event.userName},
          ${event.event},
          ${event.ipAddress},
          ${event.userAgent},
          ${event.metadata ? JSON.stringify(event.metadata) : null}::jsonb
        )
      `

      const logLevel = event.event === 'failed_auth' ? 'warn' : 'log'
      console[logLevel]('[AUTH LOG]', {
        event: event.event,
        user: event.userEmail || event.userId,
        ip: event.ipAddress,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error('[AUTH LOG ERROR]', error)
      // Don't throw - we don't want logging failures to break the app
    }
  }

  /**
   * Get all logs (admin only)
   */
  async getAllLogs(limit = 100): Promise<AuthLog[]> {
    try {
      const result = await sql`
        SELECT 
          id,
          user_id as "userId",
          user_email as "userEmail",
          user_name as "userName",
          event,
          ip_address as "ipAddress",
          user_agent as "userAgent",
          created_at as timestamp,
          metadata
        FROM auth_logs
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
      return result.rows as AuthLog[]
    } catch (error) {
      console.error('[GET LOGS ERROR]', error)
      return []
    }
  }

  /**
   * Get logs by user ID
   */
  async getLogsByUser(userId: string, limit = 50): Promise<AuthLog[]> {
    try {
      const result = await sql`
        SELECT 
          id,
          user_id as "userId",
          user_email as "userEmail",
          user_name as "userName",
          event,
          ip_address as "ipAddress",
          user_agent as "userAgent",
          created_at as timestamp,
          metadata
        FROM auth_logs
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
      return result.rows as AuthLog[]
    } catch (error) {
      console.error('[GET USER LOGS ERROR]', error)
      return []
    }
  }

  /**
   * Get logs by event type
   */
  async getLogsByEvent(event: AuthLog['event'], limit = 50): Promise<AuthLog[]> {
    try {
      const result = await sql`
        SELECT 
          id,
          user_id as "userId",
          user_email as "userEmail",
          user_name as "userName",
          event,
          ip_address as "ipAddress",
          user_agent as "userAgent",
          created_at as timestamp,
          metadata
        FROM auth_logs
        WHERE event = ${event}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
      return result.rows as AuthLog[]
    } catch (error) {
      console.error('[GET EVENT LOGS ERROR]', error)
      return []
    }
  }

  /**
   * Get recent sign-ins
   */
  async getRecentSignIns(limit = 20): Promise<AuthLog[]> {
    return this.getLogsByEvent('sign_in', limit)
  }

  /**
   * Get failed auth attempts
   */
  async getFailedAttempts(limit = 20): Promise<AuthLog[]> {
    return this.getLogsByEvent('failed_auth', limit)
  }

  /**
   * Get statistics
   */
  async getStats(): Promise<{
    totalLogs: number
    eventCounts: Record<string, number>
    uniqueUsers: number
    recentActivity: AuthLog[]
  }> {
    try {
      // Get total count
      const totalResult = await sql`SELECT COUNT(*) as count FROM auth_logs`
      const totalLogs = parseInt(totalResult.rows[0].count as string)

      // Get event counts
      const eventCountsResult = await sql`
        SELECT event, COUNT(*) as count
        FROM auth_logs
        GROUP BY event
      `
      const eventCounts: Record<string, number> = {}
      eventCountsResult.rows.forEach((row: any) => {
        eventCounts[row.event] = parseInt(row.count)
      })

      // Get unique users
      const uniqueUsersResult = await sql`
        SELECT COUNT(DISTINCT user_id) as count
        FROM auth_logs
        WHERE user_id IS NOT NULL
      `
      const uniqueUsers = parseInt(uniqueUsersResult.rows[0].count as string)

      // Get recent activity
      const recentActivity = await this.getAllLogs(10)

      return {
        totalLogs,
        eventCounts,
        uniqueUsers,
        recentActivity,
      }
    } catch (error) {
      console.error('[GET STATS ERROR]', error)
      return {
        totalLogs: 0,
        eventCounts: {},
        uniqueUsers: 0,
        recentActivity: [],
      }
    }
  }

  /**
   * Clear old logs (maintenance)
   */
  async clearOldLogs(daysOld = 30): Promise<void> {
    try {
      await sql`
        DELETE FROM auth_logs
        WHERE created_at < NOW() - INTERVAL '${daysOld} days'
      `
      console.log(`[AUTH LOG] Cleared logs older than ${daysOld} days`)
    } catch (error) {
      console.error('[CLEAR OLD LOGS ERROR]', error)
    }
  }
}

// Singleton instance
export const authLogger = new AuthLogger()

// Convenience functions
export async function logSignIn(userId: string, userEmail: string, userName: string, ipAddress: string, userAgent: string): Promise<void> {
  await authLogger.log({
    userId,
    userEmail,
    userName,
    event: 'sign_in',
    ipAddress,
    userAgent,
  })
}

export async function logSignOut(userId: string, userEmail: string, userName: string, ipAddress: string, userAgent: string): Promise<void> {
  await authLogger.log({
    userId,
    userEmail,
    userName,
    event: 'sign_out',
    ipAddress,
    userAgent,
  })
}

export async function logSignUp(userId: string, userEmail: string, userName: string, ipAddress: string, userAgent: string): Promise<void> {
  await authLogger.log({
    userId,
    userEmail,
    userName,
    event: 'sign_up',
    ipAddress,
    userAgent,
  })
}

export async function logFailedAuth(ipAddress: string, userAgent: string, reason?: string): Promise<void> {
  await authLogger.log({
    userId: null,
    userEmail: null,
    userName: null,
    event: 'failed_auth',
    ipAddress,
    userAgent,
    metadata: reason ? { reason } : undefined,
  })
}
