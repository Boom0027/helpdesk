/**
 * Authentication service
 * Author: Tirthamouli Baidya
 */
import { IAuthService } from '../types/service/authServiceInterface';
import { IUserRepository } from '../types/repository/userRepositoryInterface';
import { ITwitterAccountRpository } from '../types/repository/twitterAccountRepositoryInterface';

// Helpers
import { compare } from '../helpers/bcryptHelper';
import { signUser, verifyTwitterUser } from '../helpers/jwtHelper';
import { nameValidator, emailValidator, passwordValidator } from '../helpers/validationHelpers';

// Exceptions
import BadRequest from '../exception/badRequestException';
import Forbidden from '../exception/forbiddenException';
import InternalServer from '../exception/internalServerException';

/**
 * Authentication service layer
 */
class AuthService implements IAuthService {
  /**
   * The user repository
   */
  private userRepository: IUserRepository

  /**
   * Twitter repository
   */
  private twitterAccountRepository: ITwitterAccountRpository

  /**
   * Dependency injections
   * @param userRepository
   */
  constructor(userRepository: IUserRepository,
    twitterAccountRepository: ITwitterAccountRpository) {
    this.userRepository = userRepository;
    this.twitterAccountRepository = twitterAccountRepository;
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
    const token = await signUser({
      id: user.id!,
      email: user.auth.email,
      twitterAccountId: user.twitterDetails.account.profile.id!,
      token: user.twitterDetails.account.token,
      tokenSecret: user.twitterDetails.account.tokenSecret,
      twitterName: user.twitterDetails.account.profile.displayName,
    });

    // Step 6: Check if token is created successfully
    if (!token) {
      throw new InternalServer('unable to create jwt token');
    }

    // Step 7: Return the token
    return {
      code: 200,
      token,
      details:
      { firstName: user.firstName, lastName: user.lastName },
    };
  }

  /**
   * Register a new user
   * @param UserDetails
   */
  async registerUser({
    firstName, lastName, password, token, email,
  }:{
    firstName: string,
    lastName: string,
    email?: string,
    password: string
    token: string
  }) {
    // Step 1: Verify all the types
    const formattedFirstName = nameValidator(firstName);
    const formattedLastName = nameValidator(lastName);
    const hashedPassword = await passwordValidator(password);
    if (!formattedFirstName || !formattedLastName || !hashedPassword) {
      throw new BadRequest('Invalid data');
    }

    // Step 2: Get the twitter id from the token
    const twitterUser = await verifyTwitterUser(token);

    // Step 3: If token is not found
    if (!twitterUser) {
      throw new Forbidden('Invalid token');
    }

    // Step 4: Get the twitter user from id
    const twitterUserDetails = await this.twitterAccountRepository.getUserByID(
      twitterUser.twitterId,
    );
    if (!twitterUserDetails) {
      throw new Forbidden('Invalid twitter account');
    }

    // Step 5: Check if there is a root user for the twitter account
    const rootUser = await this.userRepository.getRootUserForTwitterAccount(twitterUserDetails.id!);

    // Step 6: Get formatted email
    let formattedEmail;
    if (twitterUser.email) {
      formattedEmail = emailValidator(twitterUser.email);
    } else {
      formattedEmail = emailValidator(email);
    }
    if (!formattedEmail) {
      throw new BadRequest('Invalid email');
    }

    // Step 7: Register an app user if there is or register a root user
    let user;
    if (!rootUser) {
      user = await this.userRepository.createUser(
        formattedFirstName,
        formattedLastName,
        formattedEmail,
        hashedPassword,
        twitterUserDetails.id!,
        'admin',
      );
    } else {
      user = await this.userRepository.createUser(
        formattedFirstName,
        formattedLastName,
        formattedEmail,
        hashedPassword,
        twitterUserDetails.id!,
        'user',
      );
    }

    // Step 8: Create a token
    const jwtToken = await signUser({
      id: user.id!,
      email: user.auth.email,
      twitterAccountId: twitterUser.twitterId,
      token: twitterUserDetails.token,
      tokenSecret: twitterUserDetails.tokenSecret,
      twitterName: twitterUserDetails.profile.displayName,
    });

    // Step 9: Unable to create token
    if (!jwtToken) {
      throw new InternalServer('unable to create jwt token');
    }

    // Step 10: Return the token
    return {
      code: 200,
      token: jwtToken,
      details: { firstName: user.firstName, lastName: user.lastName },
    };
  }
}

export default AuthService;
