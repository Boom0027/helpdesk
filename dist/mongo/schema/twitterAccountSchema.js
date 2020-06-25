"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const twitterAccountSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    tokenSecret: {
        type: String,
        required: true,
    },
    profile: {
        id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        photoURL: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
twitterAccountSchema.index({ 'profile.id': 1 }, { unique: true });
exports.default = twitterAccountSchema;
