# 🔒 Security Documentation

This document outlines the comprehensive security measures implemented in the portfolio application to protect against common web vulnerabilities and attacks.

## 📋 Table of Contents

- [Security Features Overview](#security-features-overview)
- [1. Enhanced Security Headers](#1-enhanced-security-headers)
- [2. Content Security Policy (CSP)](#2-content-security-policy-csp)
- [3. Rate Limiting](#3-rate-limiting)
- [4. Input Sanitization](#4-input-sanitization)
- [5. API Route Protection](#5-api-route-protection)
- [6. Security Logging & Monitoring](#6-security-logging--monitoring)
- [7. Environment Variable Validation](#7-environment-variable-validation)
- [Vercel Deployment](#vercel-deployment)
- [Security Best Practices](#security-best-practices)

---

## Security Features Overview

✅ **Implemented Security Measures:**
- Content Security Policy (CSP) with Clerk whitelisting
- Strict Transport Security (HSTS)
- XSS Protection headers
- Clickjacking prevention
- Rate limiting on all API endpoints
- Input sanitization for user content
- SQL injection prevention
- Origin validation
- Security event logging
- Suspicious pattern detection

---

## 1. Enhanced Security Headers

### Location
- `next.config.mjs` - Headers configuration

### Headers Applied

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | Strict CSP with whitelisted domains | Prevents XSS attacks |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing |
| `X-XSS-Protection` | `1; mode=block` | Enables browser XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | Restricts camera, microphone, etc. | Limits feature access |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Forces HTTPS |

### How It Works
All responses from the Next.js application include these security headers automatically. They are configured at the framework level and apply to all routes.

---

## 2. Content Security Policy (CSP)

### Configuration
Our CSP is configured to work seamlessly with **Clerk authentication** while maintaining strict security:

```javascript
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://*.clerk.accounts.dev https://clerk.*.dev https://*.clerk.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  font-src 'self' data:;
  connect-src 'self' https://api.groq.com https://*.clerk.accounts.dev https://clerk.*.dev https://*.clerk.com https://api.anthropic.com wss://*.clerk.accounts.dev wss://clerk.*.dev;
  frame-src 'self' https://challenges.cloudflare.com https://*.clerk.accounts.dev https://clerk.*.dev;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests
```

### Whitelisted Domains
- **Clerk**: `*.clerk.accounts.dev`, `clerk.*.dev`, `*.clerk.com`
- **AI APIs**: `api.groq.com`, `api.anthropic.com`
- **Security**: `challenges.cloudflare.com`

### Protection Against
- Cross-Site Scripting (XSS)
- Data injection attacks
- Unauthorized resource loading
- Man-in-the-middle attacks

---

## 3. Rate Limiting

### Implementation
**File:** `lib/security/rate-limiter.ts`

### Rate Limits by Endpoint

| Endpoint | Requests | Time Window | Block Duration |
|----------|----------|-------------|----------------|
| `/api/chat` | 10 | 60 seconds | 2 minutes |
| `/api/contact` | 5 | 5 minutes | 10 minutes |
| `/api/admin/*` | 20 | 60 seconds | 5 minutes |
| General API | 30 | 60 seconds | 1 minute |

### Features
- **In-memory storage** (suitable for serverless)
- **IP-based tracking** using `x-forwarded-for` header
- **Automatic blocking** when limits exceeded
- **Retry-After headers** included in 429 responses
- **Security logging** of rate limit violations

### Usage Example
```typescript
import { createRateLimiter } from '@/lib/security';

const rateLimiter = createRateLimiter('chat');
const rateLimitResult = await rateLimiter(request);
if (rateLimitResult) {
  return rateLimitResult; // Returns 429 Too Many Requests
}
```

### Response Format (429)
```json
{
  "error": "Too many requests",
  "message": "Rate limit exceeded. Please try again in 120 seconds.",
  "retryAfter": 120
}
```

---

## 4. Input Sanitization

### Implementation
**File:** `lib/security/sanitizer.ts`

### Sanitization Functions

#### `sanitizeChatMessage(message: string)`
- Removes all HTML tags
- Trims whitespace
- Limits to 2000 characters
- **Use:** Chat API inputs

#### `sanitizeContactForm(data: ContactFormData)`
- Sanitizes name (max 100 chars)
- Validates and sanitizes email
- Sanitizes message (max 5000 chars)
- **Use:** Contact form submissions

#### `sanitizeEmail(email: string)`
- Removes HTML/special characters
- Validates email format
- Converts to lowercase
- **Throws error** if invalid

#### `detectSuspiciousPatterns(input: string)`
- Detects SQL injection patterns
- Detects XSS attempts
- Detects excessive length
- Detects null bytes
- **Returns:** `{ isSuspicious: boolean, reason?: string }`

### Protected Inputs
✅ Chat messages  
✅ Contact form (name, email, message)  
✅ API request bodies  
✅ Database queries

### Example Usage
```typescript
import { sanitizeChatMessage, detectSuspiciousPatterns } from '@/lib/security';

// Check for attacks
const check = detectSuspiciousPatterns(userInput);
if (check.isSuspicious) {
  logSuspiciousInput(ip, endpoint, check.reason);
  throw new Error('Invalid input');
}

// Sanitize before processing
const clean = sanitizeChatMessage(userInput);
```

---

## 5. API Route Protection

### Implementation
**File:** `lib/security/api-validator.ts`

### Validation Layers

#### 1. Request Method Validation
```typescript
validateMethod(request, ['POST', 'GET'])
```
Ensures only allowed HTTP methods are accepted.

#### 2. Origin Validation
```typescript
validateOrigin(request)
```
Verifies requests come from trusted origins. Checks:
- Origin header matches allowed domains
- Validates against `NEXT_PUBLIC_APP_URL`
- Allows same-origin requests

#### 3. Content-Type Validation
```typescript
validateContentType(request, 'application/json')
```
Ensures correct Content-Type header for POST/PUT/PATCH.

#### 4. Comprehensive API Validation
```typescript
await validateApiRequest(request, {
  allowedMethods: ['POST'],
  requireAuth: true,
  validateOrigin: true,
  requireContentType: true,
})
```

### Protected Endpoints
- ✅ `/api/chat` - Chat API with Groq
- ✅ `/api/contact` - Contact form submission
- ✅ `/api/admin/users` - User management (GET, PATCH)
- ✅ All admin routes

### Security Headers Applied
All API responses include:
```typescript
{
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}
```

---

## 6. Security Logging & Monitoring

### Implementation
**File:** `lib/security/logger.ts`

### Event Types Tracked

| Event Type | Severity | Description |
|------------|----------|-------------|
| `rate_limit_exceeded` | Medium | Too many requests from IP |
| `unauthorized_access` | High | Access attempt without auth |
| `suspicious_input` | Medium | XSS/SQL injection detected |
| `api_abuse` | High | Excessive API usage |
| `failed_auth` | Medium | Authentication failure |
| `invalid_token` | Medium | Invalid JWT/token |
| `csrf_detected` | High | CSRF attack attempt |
| `xss_attempt` | High | XSS injection attempt |
| `sql_injection_attempt` | Critical | SQL injection detected |

### Logging Features
- **In-memory storage** (last 1000 events)
- **Automatic console logging** visible in Vercel logs
- **Critical alerts** for high-severity events
- **IP tracking** for all security events
- **Statistics dashboard** data

### Usage Examples
```typescript
import { 
  logRateLimitExceeded,
  logUnauthorizedAccess,
  logSuspiciousInput,
} from '@/lib/security';

// Log rate limit violation
logRateLimitExceeded(ip, '/api/chat');

// Log unauthorized access
logUnauthorizedAccess(ip, '/api/admin/users', userId);

// Log suspicious input
logSuspiciousInput(ip, '/api/contact', 'SQL injection detected');
```

### Viewing Logs
**Development:**
```bash
# Console output in terminal
```

**Production (Vercel):**
1. Go to Vercel Dashboard
2. Select your project
3. Click "Logs" tab
4. Filter by `[SECURITY]`

### Log Format
```json
{
  "type": "rate_limit_exceeded",
  "severity": "medium",
  "message": "Rate limit exceeded for /api/chat",
  "ip": "192.168.1.1",
  "endpoint": "/api/chat",
  "timestamp": "2025-11-15T10:30:00.000Z"
}
```

---

## 7. Environment Variable Validation

### Implementation
**File:** `lib/security/api-validator.ts`

### Required Variables
```typescript
validateEnvironment()
```

Checks for:
- ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- ✅ `CLERK_SECRET_KEY`
- ✅ `DATABASE_URL`
- ✅ `GROQ_API_KEY`

### On Startup
The application validates all required environment variables and:
- **Logs success** ✅ if all present
- **Logs errors** ❌ with missing variable names
- **Prevents runtime crashes** from missing configs

---

## Vercel Deployment

### Security on Vercel

All security features work seamlessly on Vercel:

1. **Security Headers** ✅
   - Configured in `next.config.mjs`
   - Applied automatically by Vercel edge network

2. **Rate Limiting** ✅
   - Uses in-memory storage (suitable for serverless)
   - Works across Vercel function invocations

3. **Input Sanitization** ✅
   - Pure JavaScript, no server dependencies
   - Works in Vercel serverless functions

4. **Security Logging** ✅
   - Logs visible in Vercel dashboard
   - Accessible in real-time

5. **CSP with Clerk** ✅
   - Whitelists all Clerk domains
   - No conflicts with authentication

### Environment Variables
Set in Vercel Dashboard:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
DATABASE_URL=postgresql://xxx
GROQ_API_KEY=gsk_xxx
```

### Build Command
```bash
pnpm run build
```

### Deploy
```bash
git push origin main
# Vercel auto-deploys
```

---

## Security Best Practices

### ✅ What We Do

1. **Defense in Depth**
   - Multiple layers of security
   - No single point of failure

2. **Fail Secure**
   - Invalid requests are rejected
   - Errors don't expose system details

3. **Least Privilege**
   - Admin routes require authentication + role check
   - APIs validate every request

4. **Input Validation**
   - All user input is sanitized
   - Suspicious patterns are logged

5. **Security Logging**
   - All security events are tracked
   - Critical events trigger alerts

6. **Regular Updates**
   - Dependencies kept up-to-date
   - Security patches applied promptly

### 🔐 Security Checklist

- [x] HTTPS enforced via HSTS
- [x] Content Security Policy configured
- [x] XSS protection enabled
- [x] Clickjacking prevention (X-Frame-Options)
- [x] MIME-type sniffing prevention
- [x] Rate limiting on all APIs
- [x] Input sanitization
- [x] SQL injection prevention
- [x] Origin validation
- [x] Security event logging
- [x] Environment variable validation
- [x] Secure authentication (Clerk)
- [x] Admin role verification
- [x] API request validation

### 🚨 Incident Response

If you detect suspicious activity:

1. **Check Security Logs**
   ```typescript
   import { securityLogger } from '@/lib/security';
   const events = securityLogger.getHighPriorityEvents();
   ```

2. **Block Offending IP** (if needed)
   - Add to rate limiter blacklist
   - Update firewall rules

3. **Review Recent Events**
   ```typescript
   const recentEvents = securityLogger.getRecentEvents(100);
   ```

4. **Reset Rate Limits** (if false positive)
   ```typescript
   import { resetRateLimit } from '@/lib/security';
   await resetRateLimit(ip, 'chat');
   ```

---

## Testing Security Features

### Test Rate Limiting
```bash
# Send 15 requests rapidly to /api/chat
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"role":"user","content":"test"}]}'
done
# Should see 429 after 10 requests
```

### Test Input Sanitization
```typescript
// Try injecting XSS
const malicious = '<script>alert("XSS")</script>';
const clean = sanitizeChatMessage(malicious);
// Result: '' (removed)
```

### Test Suspicious Pattern Detection
```typescript
const suspicious = "' OR '1'='1";
const check = detectSuspiciousPatterns(suspicious);
// Result: { isSuspicious: true, reason: 'Potential injection attack detected' }
```

---

## Support & Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email: [your-security-email@example.com]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We take security seriously and will respond within 24-48 hours.

---

## License

This security implementation is part of the portfolio application and follows the same license.

---

**Last Updated:** November 15, 2025  
**Version:** 1.0.0  
**Security Level:** ⭐⭐⭐⭐⭐ (High)
