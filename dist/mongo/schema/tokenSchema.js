"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    token: {
        type: {
            type: String,
            enum: ['access', 'refresh'],
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
tokenSchema.index({ user: 1, createdAt: 1 });
exports.default = tokenSchema;
