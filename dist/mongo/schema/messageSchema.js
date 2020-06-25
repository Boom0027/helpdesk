"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    connection: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'connection',
        required: true,
    },
    from: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    message: {
        type: {
            type: String,
            enum: ['text', 'image'],
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    sentTime: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            }],
        required: true,
    },
});
messageSchema.index({ connection: 1, sentTime: 1 });
exports.default = messageSchema;
