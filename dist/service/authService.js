"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptHelper_1 = require("../helpers/bcryptHelper");
const jwtHelper_1 = require("../helpers/jwtHelper");
const forbiddenException_1 = __importDefault(require("../exception/forbiddenException"));
const internalServerException_1 = __importDefault(require("../exception/internalServerException"));
class AuthService {
    constructor(userRepository, tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }
    async loginWithEmailAndPassword({ email, password }) {
        const user = await this.userRepository.getUserByEmail(email);
        if (user === null) {
            throw new forbiddenException_1.default("user doen't exists");
        }
        if (!user.auth.password) {
            throw new forbiddenException_1.default("password doesn't exists");
        }
        const verified = await bcryptHelper_1.compare(password, user.auth.password);
        if (!verified) {
            throw new forbiddenException_1.default('incorrect password');
        }
        const token = await jwtHelper_1.sign({
            id: user.id,
            email: user.auth.email,
            phone: user.auth.phone ? `+${user.auth.phone.code}${user.auth.phone.number}` : '',
        });
        if (!token) {
            throw new internalServerException_1.default('unable to create jwt token');
        }
        this.tokenRepository.createToken({
            user,
            token: {
                type: 'access',
                value: token,
            },
        });
    }
}
exports.default = AuthService;
