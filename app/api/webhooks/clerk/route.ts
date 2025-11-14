import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { Webhook } from "svix"
import { authLogger } from "@/lib/security/auth-logger"

export const dynamic = 'force-dynamic'

/**
 * POST /api/webhooks/clerk
 * Webhook endpoint for Clerk authentication events
 */
export async function POST(req: NextRequest) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    )
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: any

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Get the event type
  const eventType = evt.type
  const ipAddress = req.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = req.headers.get('user-agent') || 'unknown'

  console.log(`Webhook received: ${eventType}`)

  // Handle different event types
  try {
    switch (eventType) {
      case 'session.created':
        authLogger.log({
          userId: evt.data.user_id,
          userEmail: null,
          userName: null,
          event: 'session_created',
          ipAddress,
          userAgent,
          metadata: { sessionId: evt.data.id }
        })
        break

      case 'session.ended':
      case 'session.removed':
      case 'session.revoked':
        authLogger.log({
          userId: evt.data.user_id,
          userEmail: null,
          userName: null,
          event: 'session_revoked',
          ipAddress,
          userAgent,
          metadata: { sessionId: evt.data.id }
        })
        break

      case 'user.created':
        authLogger.log({
          userId: evt.data.id,
          userEmail: evt.data.email_addresses?.[0]?.email_address || null,
          userName: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim() || null,
          event: 'sign_up',
          ipAddress,
          userAgent,
        })
        break

      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
}
