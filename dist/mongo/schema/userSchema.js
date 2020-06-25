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
        phone: {
            code: {
                type: Number,
                default: 91,
            },
            number: {
                type: Number,
                min: 1000000000,
                max: 9999999999,
            },
        },
        password: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
userSchema.index({ firstName: 1 });
userSchema.index({ lastName: 1 });
userSchema.index({ 'auth.email': 1 }, { unique: true });
userSchema.index({ 'auth.phone.code': 1, 'auth.phone.number': 1 }, { unique: true });
exports.default = userSchema;
