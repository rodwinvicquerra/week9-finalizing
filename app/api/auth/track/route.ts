import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { authLogger } from "@/lib/security/auth-logger-db"
import { getClientIp, getSecureHeaders } from "@/lib/security"

export const dynamic = 'force-dynamic'

/**
 * POST /api/auth/track
 * Track authentication events from client-side
 * Updated: 2025-11-15
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, userId, email, userName, ipAddress: providedIp, userAgent: providedUserAgent } = body

    console.log('🔐 Auth track request:', { type, userId, email })

    // Use provided values or extract from request
    const ipAddress = providedIp || getClientIp(req)
    const userAgent = providedUserAgent || req.headers.get('user-agent') || 'unknown'

    // Log the event to database
    await authLogger.log({
      userId: userId || 'unknown',
      userEmail: email || 'unknown',
      userName: userName || 'Unknown User',
      event: type as any,
      ipAddress,
      userAgent,
    })

    console.log('✅ Event logged successfully')

    return NextResponse.json(
      { success: true, message: 'Event logged to database' },
      { headers: getSecureHeaders() }
    )
  } catch (error) {
    console.error('❌ Error tracking auth event:', error)
    return NextResponse.json(
      { error: 'Failed to track event', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}
