"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = require("../interfaces/middleware/validation.middleware");
const users_dto_1 = require("../dtos/users.dto");
const auth_middleware_1 = require("../interfaces/middleware/auth.middleware");
class AuthRoutes {
    constructor() {
        this.path = "/";
        this.router = (0, express_1.Router)();
        this.auth = new auth_controller_1.AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}signup`, (0, validation_middleware_1.ValidationMiddleware)(users_dto_1.CreateUserDto, true), this.auth.signUp);
        this.router.post(`${this.path}login`, (0, validation_middleware_1.ValidationMiddleware)(users_dto_1.CreateUserDto, true), this.auth.logIn);
        this.router.post(`${this.path}logout`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support", "user"]), this.auth.logOut);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.route.js.map