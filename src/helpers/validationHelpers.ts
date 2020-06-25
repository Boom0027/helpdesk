/**
 * Validation helper
 * Author: Tirthamouli Baidya
 */
import { hash } from './bcryptHelper';

/**
 * Regex patterns for validation
 */
const patterns = {
  name: /^[a-z]{3,}$/i,
  username: /^[a-z0-9_]{3,}$/i,
  theatreName: /^[a-z0-9_+\-': ]+$/i,
  email: /^([a-z0-9.-_%+]+)@([a-z0-9-]+)\.([a-z]{2,10})(\.[a-z]{2,5})?$/i,
  password: /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/,
};

/**
 * Verify simple string
 * @param value
 */
export function simpleString(value: any) {
  return typeof value === 'string';
}

/**
 * Int check
 * @param value
 */
export function intCheck(value: any): number | null {
  return isNaN(value) ? null : parseInt(value);
}

/**
 * Name sanitize and format
 * @param value
 */
export function nameValidator(value: any): string {
  return simpleString(value) && patterns.name.test(value.trim()) ? value.trim() : null;
}

/**
 * Simple string check
 * @param value
 */
export function simpleStringCheck(value: any): string {
  return simpleString(value) ? value.trim() : null;
}

/**
 * Email verification
 * @param value
 */
export function emailValidator(value: any): string {
  return simpleString(value) && patterns.email.test(value.trim()) ? value.trim() : null;
}

/**
 * Password sanitization
 * @param value
 */
export async function passwordValidator(value: any): Promise<string | null> {
  // Step 1: Format the value
  const formattedValue = simpleStringCheck(value);

  // Step 2: Check if password is equal to repeat password
  if (!formattedValue) {
    return null;
  }

  if (!patterns.password.test(formattedValue)) {
    return null;
  }

  // Step 3: Hash the password
  const hashedPassword = await hash(value);

  // Step 4: Return hash
  return hashedPassword;
}
