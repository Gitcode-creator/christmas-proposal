/**
 * Simulated password hashing for frontend demonstration purposes.
 * Converts plain text passwords into mixed salt ciphers.
 */
export function simulateHash(password: string): string {
  const salt = "wish_magic_secret_salt_";
  const salted = salt + password;
  try {
    const encoded = btoa(unescape(encodeURIComponent(salted)));
    // Slice and prepend to look like a unique hash
    return "xm_hash_" + encoded.substring(4, 38).replace(/=/g, '9');
  } catch {
    return "xm_hash_fallback_" + password.split('').reverse().join('');
  }
}
