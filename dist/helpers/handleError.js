"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMessaages = {
    400: 'bad request',
    403: 'forbidden',
    500: 'internal server error',
};
exports.default = (err, res) => {
    if (err.message in errorMessaages) {
        return res.status(+err.message).json({ message: errorMessaages[err.message] });
    }
    return res.status(500).json({ message: errorMessaages['500'] });
};
