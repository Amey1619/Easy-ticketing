"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const typedi_1 = require("typedi");
const httpExceptions_1 = require("../exceptions/httpExceptions");
const config_1 = require("../config");
const users_model_1 = require("../models/users.model");
const notification_1 = require("../utils/notification");
const createToken = (user) => {
    const dataStoredInToken = {
        _id: user._id,
    };
    const expiresIn = 60 * 60;
    return {
        expiresIn,
        token: (0, jsonwebtoken_1.sign)(dataStoredInToken, `${config_1.SECRET_KEY}`, { expiresIn }),
    };
};
const createCookie = (tokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
let AuthService = class AuthService {
    signup(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findUser = yield users_model_1.UserModel.findOne({ email: userData.email });
            if (findUser)
                throw new httpExceptions_1.HttpException(409, `This email ${userData.email} already exists`);
            yield (0, notification_1.sendMail)(userData.email, "Welcome to Ticketing Application", `<h3>Welcome to Ticketing Application!<h3>`);
            const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
            const createUserData = yield users_model_1.UserModel.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            return createUserData;
        });
    }
    login(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findUser = yield users_model_1.UserModel.findOne({
                email: userData.email,
                role: userData.role,
            });
            if (!findUser)
                throw new httpExceptions_1.HttpException(404, `User with email ${userData.email} / role ${userData.role}  was not found`);
            const isPasswordMatching = yield (0, bcrypt_1.compare)(userData.password, findUser.password);
            if (!isPasswordMatching)
                throw new httpExceptions_1.HttpException(401, "Password is not matching");
            const tokenData = createToken(findUser);
            const cookie = createCookie(tokenData);
            return { cookie, findUser };
        });
    }
    logout(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findUser = yield users_model_1.UserModel.findOne({
                email: userData.email,
                password: userData.password,
            });
            if (!findUser)
                throw new httpExceptions_1.HttpException(409, `This email ${userData.email} was not found`);
            return findUser;
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], AuthService);
//# sourceMappingURL=auth.service.js.map