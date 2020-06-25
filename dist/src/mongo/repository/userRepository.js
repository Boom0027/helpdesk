"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../model/userModel"));
const internalServerException_1 = __importDefault(require("../../exception/internalServerException"));
const userRepository = {
    async createUser(user) {
        try {
            const newUser = await new userModel_1.default(user).save();
            return {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                auth: {
                    email: newUser.auth.email,
                },
            };
        }
        catch (_err) {
            throw new internalServerException_1.default('error while trying to create user');
        }
    },
    async getUserByEmail(email) {
        try {
            const user = await userModel_1.default.findOne({ 'auth.email': email });
            if (!user) {
                return null;
            }
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                auth: user.auth,
                createdAt: user.createdAt,
            };
        }
        catch (_err) {
            throw new internalServerException_1.default('error while fetching user by email');
        }
    },
    async getUserByPhone(phoneNumber, code) {
        try {
            const user = await userModel_1.default.findOne({ 'auth.phone': { code, number: phoneNumber } });
            if (!user) {
                return null;
            }
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                auth: user.auth,
                createdAt: user.createdAt,
            };
        }
        catch (_err) {
            throw new internalServerException_1.default('error while fetching user by email');
        }
    },
};
exports.default = userRepository;
