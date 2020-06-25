"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitterAccountModel_1 = __importDefault(require("../model/twitterAccountModel"));
const internalServerException_1 = __importDefault(require("../../exception/internalServerException"));
const TwitterAccountRepository = {
    async addUser(user) {
        try {
            const newUser = await new twitterAccountModel_1.default(user).save();
            return {
                id: newUser.id,
                token: newUser.token,
                tokenSecret: newUser.tokenSecret,
                profile: newUser.profile,
                createdAt: newUser.createdAt,
            };
        }
        catch (_err) {
            throw new internalServerException_1.default('error while trying to create user');
        }
    },
    async getUserByID(userID) {
        try {
            const user = await twitterAccountModel_1.default.findOne({ 'profile.id': userID });
            if (!user) {
                return null;
            }
            return {
                id: user.id,
                token: user.token,
                tokenSecret: user.tokenSecret,
                profile: user.profile,
                createdAt: user.createdAt,
            };
        }
        catch (_err) {
            throw new internalServerException_1.default('error while fetching user');
        }
    },
    async updateUser(user) {
        try {
            await twitterAccountModel_1.default.updateOne({ 'profile.id': user.profile.id }, { $set: { ...user } });
            return {
                token: user.token,
                tokenSecret: user.tokenSecret,
                profile: user.profile,
                createdAt: user.createdAt,
            };
        }
        catch (_err) {
            throw new internalServerException_1.default('error while fetching user');
        }
    },
};
exports.default = TwitterAccountRepository;
