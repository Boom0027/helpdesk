"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptHelper_1 = require("../helpers/bcryptHelper");
const jwtHelper_1 = require("../helpers/jwtHelper");
const validationHelpers_1 = require("../helpers/validationHelpers");
const badRequestException_1 = __importDefault(require("../exception/badRequestException"));
const forbiddenException_1 = __importDefault(require("../exception/forbiddenException"));
const internalServerException_1 = __importDefault(require("../exception/internalServerException"));
class AuthService {
    constructor(userRepository, twitterAccountRepository) {
        this.userRepository = userRepository;
        this.twitterAccountRepository = twitterAccountRepository;
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
        const token = await jwtHelper_1.signUser({
            id: user.id,
            email: user.auth.email,
            twitterAccountId: user.twitterDetails.account.profile.id,
        });
        if (!token) {
            throw new internalServerException_1.default('unable to create jwt token');
        }
        return {
            code: 200,
            token,
            details: { firstName: user.firstName, lastName: user.lastName },
        };
    }
    async registerUser({ firstName, lastName, password, token, email, }) {
        const formattedFirstName = validationHelpers_1.nameValidator(firstName);
        const formattedLastName = validationHelpers_1.nameValidator(lastName);
        const hashedPassword = await validationHelpers_1.passwordValidator(password);
        if (!formattedFirstName || !formattedLastName || !hashedPassword) {
            throw new badRequestException_1.default('Invalid data');
        }
        const twitterUser = await jwtHelper_1.verifyTwitterUser(token);
        if (!twitterUser) {
            throw new forbiddenException_1.default('Invalid token');
        }
        const twitterUserDetails = await this.twitterAccountRepository.getUserByID(twitterUser.twitterId);
        if (!twitterUserDetails) {
            throw new forbiddenException_1.default('Invalid twitter account');
        }
        const rootUser = await this.userRepository.getRootUserForTwitterAccount(twitterUserDetails.id);
        let formattedEmail;
        if (twitterUser.email) {
            formattedEmail = validationHelpers_1.emailValidator(twitterUser.email);
        }
        else {
            formattedEmail = validationHelpers_1.emailValidator(email);
        }
        if (!formattedEmail) {
            throw new badRequestException_1.default('Invalid email');
        }
        let user;
        if (!rootUser) {
            user = await this.userRepository.createUser(formattedFirstName, formattedLastName, formattedEmail, hashedPassword, twitterUserDetails.id, 'admin');
        }
        else {
            user = await this.userRepository.createUser(formattedFirstName, formattedLastName, formattedEmail, hashedPassword, twitterUserDetails.id, 'user');
        }
        const jwtToken = await jwtHelper_1.signUser({
            id: user.id,
            email: user.auth.email,
            twitterAccountId: twitterUser.twitterId,
        });
        if (!jwtToken) {
            throw new internalServerException_1.default('unable to create jwt token');
        }
        return {
            code: 200,
            token: jwtToken,
            details: { firstName: user.firstName, lastName: user.lastName },
        };
    }
}
exports.default = AuthService;
