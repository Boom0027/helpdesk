/**
 * Interface for auth service
 */

// Step 1: Defining common response
type authResponse = {code: number, token: string, details: {firstName: string, lastName: string}}

// Step 2: Defining interface
export interface IAuthService {
  /**
   * Login using the user name and password
   */
  loginWithEmailAndPassword: ({ email, password }:
    { email: string, password: string }) => Promise<authResponse>

  /**
   * Register a new user
   */
  registerUser: ({
    firstName, lastName, email, password, token,
  }:{
    firstName: string,
    lastName: string,
    email?: string,
    password: string
    token: string
  }) => Promise<authResponse | null>
}
