"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
requestSchema.index({ to: 1, from: 1 }, { unique: true });
requestSchema.index({ from: 1 });
requestSchema.index({ createdAt: 1 });
exports.default = requestSchema;
