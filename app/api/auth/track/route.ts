import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { authLogger } from "@/lib/security/auth-logger"
import { getClientIp, getSecureHeaders } from "@/lib/security"

export const dynamic = 'force-dynamic'

/**
 * POST /api/auth/track
 * Track authentication events from client-side
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, userId, email, userName, ipAddress: providedIp, userAgent: providedUserAgent } = body

    // Use provided values or extract from request
    const ipAddress = providedIp || getClientIp(req)
    const userAgent = providedUserAgent || req.headers.get('user-agent') || 'unknown'

    // Log the event
    authLogger.log({
      userId: userId || 'unknown',
      userEmail: email || 'unknown',
      userName: userName || 'Unknown User',
      event: type as any,
      ipAddress,
      userAgent,
    })

    return NextResponse.json(
      { success: true },
      { headers: getSecureHeaders() }
    )
  } catch (error) {
    console.error('Error tracking auth event:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}
