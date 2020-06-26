/**
 * Auth controller
 * Author: Tirthamouli Baidya
 */

// Types
import { Request, Response } from 'express';

// Service layer
import { IAuthService } from '../types/service/authServiceInterface';

class AuthController {
  /**
   * Auth service
   */
  private authService: IAuthService

  /**
   * Dependency injection
   * @param authService
   */
  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  /**
   * Login user
   * @param req
   * @param res
   */
  async login(req: Request, res: Response) {
    try {
      // Step 1: Pass data to service layer
      const response = await this.authService.loginWithEmailAndPassword({
        email: req.body.email,
        password: req.body.password,
      });

      // Step 2: Send the response
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  /**
   * Register an user
   * @param req
   * @param res
   */
  async register(req: Request, res: Response) {
    try {
      // Step 1: Pass data to service layer
      const response = await this.authService.registerUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token,
      });

      // Step 2: Send the response
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
export default AuthController;
