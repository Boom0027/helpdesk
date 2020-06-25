"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectionSchema = new mongoose_1.Schema({
    connects: {
        type: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            }],
        validate: {
            validator: (v) => v.length > 0,
            message: () => 'Minimum two users required to connect',
        },
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastActivity: {
        type: Date,
        default: Date.now,
    },
});
connectionSchema.index({ connects: 1, lastActivity: 1 });
exports.default = connectionSchema;
