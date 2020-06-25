"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const controllerFactory_1 = require("../factory/controllerFactory");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/login', controllerFactory_1.getAuthController.login.bind(controllerFactory_1.getAuthController));
router.post('/register', controllerFactory_1.getAuthController.register.bind(controllerFactory_1.getAuthController));
exports.default = router;
