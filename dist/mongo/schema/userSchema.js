"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    auth: {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    twitterDetails: {
        permissionLevel: {
            type: String,
            enum: ['admin', 'user'],
            required: true,
        },
        account: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'twitter_account',
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
userSchema.index({ 'auth.email': 1 }, { unique: true });
userSchema.index({ 'twitterDetails.account': 1, 'twitterDetails.permissionLevel': 1 });
exports.default = userSchema;
