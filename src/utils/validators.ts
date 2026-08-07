/**
 * Validation utilities for Auth Forms
 */

// Email regex checker
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password strength meter
// Criteria:
// - Strong: >= 6 chars, >= 1 uppercase, >= 1 number, >= 1 special char
// - Medium: >= 6 chars, >= 1 number or uppercase
// - Weak: default
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (!password) return 'weak';
  
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (hasMinLength && hasUppercase && hasNumber && hasSpecial) {
    return 'strong';
  }
  
  if (hasMinLength && (hasUppercase || hasNumber)) {
    return 'medium';
  }

  return 'weak';
}
