"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = exports.emailValidator = exports.simpleStringCheck = exports.nameValidator = exports.intCheck = exports.simpleString = void 0;
const bcryptHelper_1 = require("./bcryptHelper");
const patterns = {
    name: /^[a-z]{3,}$/i,
    username: /^[a-z0-9_]{3,}$/i,
    theatreName: /^[a-z0-9_+\-': ]+$/i,
    email: /^([a-z0-9.-_%+]+)@([a-z0-9-]+)\.([a-z]{2,10})(\.[a-z]{2,5})?$/i,
    password: /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/,
};
function simpleString(value) {
    return typeof value === 'string';
}
exports.simpleString = simpleString;
function intCheck(value) {
    return isNaN(value) ? null : parseInt(value);
}
exports.intCheck = intCheck;
function nameValidator(value) {
    return simpleString(value) && patterns.name.test(value.trim()) ? value.trim() : null;
}
exports.nameValidator = nameValidator;
function simpleStringCheck(value) {
    return simpleString(value) ? value.trim() : null;
}
exports.simpleStringCheck = simpleStringCheck;
function emailValidator(value) {
    return simpleString(value) && patterns.email.test(value.trim()) ? value.trim() : null;
}
exports.emailValidator = emailValidator;
async function passwordValidator(value) {
    const formattedValue = simpleStringCheck(value);
    if (!formattedValue) {
        return null;
    }
    if (!patterns.password.test(formattedValue)) {
        return null;
    }
    const hashedPassword = await bcryptHelper_1.hash(value);
    return hashedPassword;
}
exports.passwordValidator = passwordValidator;
