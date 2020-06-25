/**
 * Authentication service
 * Author: Tirthamouli Baidya
 */

import { IUserRepository } from '../types/repository/userRepositoryInterface';
import { ITokenRepository } from '../types/repository/tokenRepositoryInterface';

// Helpers
import { compare } from '../helpers/bcryptHelper';
import { sign } from '../helpers/jwtHelper';

// Exceptions
import BadRequest from '../exception/badRequestException';
import Forbidden from '../exception/forbiddenException';
import InternalServer from '../exception/internalServerException';

/**
 * Authentication service layer
 */
class AuthService {
  /**
   * The user repository
   */
  private userRepository: IUserRepository

  /**
   * Token repository
   */
  private tokenRepository: ITokenRepository

  /**
   * Dependency injections
   * @param userRepository
   */
  constructor(userRepository: IUserRepository, tokenRepository: ITokenRepository) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
  }

  /**
   * Login with email and password
   * @param email
   * @param password
   */
  async loginWithEmailAndPassword({ email, password }: { email: string, password: string }) {
    // Step 1: Get the user
    const user = await this.userRepository.getUserByEmail(email);

    // Step 2: Check if user exists
    if (user === null) {
      throw new Forbidden("user doen't exists");
    }

    // Step 3: Verify password
    if (!user.auth.password) {
      throw new Forbidden("password doesn't exists");
    }

    // Step 4: Verify password
    const verified = await compare(password, user.auth.password);
    if (!verified) {
      throw new Forbidden('incorrect password');
    }

    // Step 5: Create access token
    const token = await sign({
      id: user.id,
      email: user.auth.email,
      phone: user.auth.phone ? `+${user.auth.phone.code}${user.auth.phone.number}` : '',
    });

    // Step 6: Check if token is created successfully
    if (!token) {
      throw new InternalServer('unable to create jwt token');
    }

    // Step 7: Add the token to the db
    this.tokenRepository.createToken({
      user,
      token: {
        type: 'access',
        value: token,
      },
    });
  }
}

export default AuthService;
