"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tweetSchema = new mongoose_1.Schema({
    queryString: {
        type: String,
        required: true,
    },
    details: {
        id: {
            type: String,
            required: true,
        },
        inReplyTo: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        user: {
            id: {
                type: String,
                required: true,
            },
            displayName: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            photoURL: {
                type: String,
                required: true,
            },
            followers: {
                type: Number,
                required: true,
            },
            following: {
                type: Number,
                required: true,
            },
        },
        createdAt: {
            type: String,
            required: true,
        },
    },
});
tweetSchema.index({ queryString: 1, 'details.id': 1 }, { unique: true });
tweetSchema.index({ 'details.inReplyTo': 1 });
exports.default = tweetSchema;
