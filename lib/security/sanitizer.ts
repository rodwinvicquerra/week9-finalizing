/**
 * Sanitize HTML content to prevent XSS attacks
 * Simple sanitization without external dependencies for Vercel compatibility
 */
export function sanitizeHtml(dirty: string): string {
  // Remove script tags and their content
  let cleaned = dirty.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  cleaned = cleaned.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Allow only safe tags
  const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br'];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  
  cleaned = cleaned.replace(tagRegex, (match, tag) => {
    return allowedTags.includes(tag.toLowerCase()) ? match : '';
  });
  
  return cleaned;
}

/**
 * Sanitize plain text - removes all HTML tags
 */
export function sanitizeText(dirty: string): string {
  // Remove all HTML tags
  return dirty.replace(/<[^>]*>/g, '').trim();
}

/**
 * Sanitize user input for chat messages
 */
export function sanitizeChatMessage(message: string): string {
  // Remove all HTML tags, keep only text
  const cleaned = sanitizeText(message);
  
  // Trim whitespace
  const trimmed = cleaned.trim();
  
  // Limit length
  const maxLength = 2000;
  if (trimmed.length > maxLength) {
    return trimmed.substring(0, maxLength);
  }
  
  return trimmed;
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  const cleaned = sanitizeText(email).toLowerCase().trim();
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleaned)) {
    throw new Error('Invalid email format');
  }
  
  return cleaned;
}

/**
 * Sanitize contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function sanitizeContactForm(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeText(data.name).substring(0, 100),
    email: sanitizeEmail(data.email),
    message: sanitizeText(data.message).substring(0, 5000),
  };
}

/**
 * Escape special characters for SQL-like queries
 */
export function escapeSpecialChars(str: string): string {
  return str
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
}

/**
 * Validate and sanitize JSON input
 */
export function sanitizeJson<T>(input: unknown): T {
  try {
    const stringified = JSON.stringify(input);
    return JSON.parse(stringified) as T;
  } catch (error) {
    throw new Error('Invalid JSON input');
  }
}
