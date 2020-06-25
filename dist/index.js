"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
require("./mongo/index");
const app = express_1.default();
app.use((err, req, res, _next) => {
    res.status(500).json({ message: 'internal server error' });
});
index_1.default(app);
app.listen(3000, () => {
    console.log('Listening to port 3000');
});
