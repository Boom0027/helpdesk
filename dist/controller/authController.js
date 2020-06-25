"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        try {
            const response = await this.authService.loginWithEmailAndPassword({
                email: req.body.email,
                password: req.body.password,
            });
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    async register(req, res) {
        try {
            const response = await this.authService.registerUser({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                token: req.body.token,
            });
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}
exports.default = AuthController;
