/**
 * Security Module - Central Export
 * All security utilities and middleware
 */

// Rate Limiting
export { createRateLimiter, resetRateLimit } from './rate-limiter';

// Input Sanitization
export {
  sanitizeHtml,
  sanitizeText,
  sanitizeChatMessage,
  sanitizeEmail,
  sanitizeContactForm,
  escapeSpecialChars,
  sanitizeJson,
  type ContactFormData,
} from './sanitizer';

// Security Logging
export {
  securityLogger,
  logRateLimitExceeded,
  logUnauthorizedAccess,
  logSuspiciousInput,
  logApiAbuse,
  logFailedAuth,
  type SecurityEvent,
  type SecurityEventType,
} from './logger';

// Authentication Logging
export {
  authLogger,
  logSignIn,
  logSignOut,
  logSignUp,
  logFailedAuth as logAuthFailure,
  type AuthLog,
} from './auth-logger';

// API Validation
export {
  validateOrigin,
  validateMethod,
  getClientIp,
  validateContentType,
  detectSuspiciousPatterns,
  validateApiRequest,
  validateEnvironment,
  getSecureHeaders,
} from './api-validator';
