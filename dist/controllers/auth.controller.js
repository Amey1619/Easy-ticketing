"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const auth_service_1 = require("../services/auth.service");
const httpExceptions_1 = require("../exceptions/httpExceptions");
class AuthController {
    constructor() {
        this.auth = typedi_1.Container.get(auth_service_1.AuthService);
        this.signUp = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const signUpUserData = yield this.auth.signup(userData);
                res.status(201).json({ data: signUpUserData, message: "signup" });
            }
            catch (error) {
                next(error);
            }
        });
        this.logIn = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const { cookie, findUser } = yield this.auth.login(userData);
                res.setHeader("Set-Cookie", [cookie]);
                res.status(200).json({ data: findUser, message: "login" });
            }
            catch (error) {
                next(error);
            }
        });
        this.logOut = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "User not authenticated"));
                }
                const userData = req.user;
                const logOutUserData = yield this.auth.logout(userData);
                res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
                res.status(200).json({ data: logOutUserData, message: "logout" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map