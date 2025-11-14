import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { authLogger } from "@/lib/security/auth-logger"
import { getSecureHeaders } from "@/lib/security"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * GET /api/admin/logs
 * Get authentication logs (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: getSecureHeaders() }
      )
    }

    // Verify user is admin
    const user = await clerkClient().users.getUser(userId)
    const role = (user.publicMetadata?.role as string) || 'viewer'
    
    if (role.toLowerCase() !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403, headers: getSecureHeaders() }
      )
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    const eventType = searchParams.get('event') as any
    const targetUserId = searchParams.get('userId')

    let logs

    if (targetUserId) {
      logs = authLogger.getLogsByUser(targetUserId, limit)
    } else if (eventType) {
      logs = authLogger.getLogsByEvent(eventType, limit)
    } else {
      logs = authLogger.getAllLogs(limit)
    }

    // Get statistics
    const stats = authLogger.getStats()

    return NextResponse.json({
      logs,
      stats,
      count: logs.length,
      total: stats.totalLogs,
    }, { headers: getSecureHeaders() })

  } catch (error) {
    console.error('Error fetching auth logs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}
