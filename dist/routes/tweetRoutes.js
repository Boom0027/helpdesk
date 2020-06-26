"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const controllerFactory_1 = require("../factory/controllerFactory");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use(authMiddleware_1.default);
router.get('/get', controllerFactory_1.getTweetController.getTweets.bind(controllerFactory_1.getTweetController));
exports.default = router;
