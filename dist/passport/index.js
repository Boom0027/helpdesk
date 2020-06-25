"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./twitterStrategy");
exports.default = (app) => {
    app.get('/hello', (req, res) => {
        res.send('HELLO');
    });
};
