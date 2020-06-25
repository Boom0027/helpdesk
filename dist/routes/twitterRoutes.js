"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const jwtHelper_1 = require("../helpers/jwtHelper");
require("../passport/twitterStrategy");
const router = express_1.default.Router();
const MongoDBStore = connect_mongodb_session_1.default(express_session_1.default);
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'session',
});
router.use(express_session_1.default({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
    },
    store,
}));
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.get('/auth', passport_1.default.authenticate('twitter'));
router.get('/callback', passport_1.default.authenticate('twitter'), async (req, res) => {
    if (!('user' in req) || !('profile' in req.user) || !('displayName' in req.user.profile) || !('id' in req.user.profile) || !('oldUser' in req.user)) {
        return res.redirect('/register');
    }
    const token = await jwtHelper_1.signTwitterUser({
        twitterId: req.user.profile.id,
        isRoot: true,
    });
    if (token && req.user.oldUser === true) {
        return res.redirect(`/login?token=${encodeURI(token)}`);
    }
    if (token && req.user.oldUser === false) {
        return res.redirect(`/register?token=${encodeURI(token)}`);
    }
    return res.redirect('/register');
});
exports.default = router;
