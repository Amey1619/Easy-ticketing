"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const validation_middleware_1 = require("../interfaces/middleware/validation.middleware");
const users_dto_1 = require("../dtos/users.dto");
const auth_middleware_1 = require("../interfaces/middleware/auth.middleware");
class UserRoutes {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.user = new users_controller_1.UserController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.user.getUsers);
        this.router.get(`${this.path}/agents`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support"]), this.user.getAgents);
        this.router.get(`${this.path}/:id`, this.user.getUserById);
        this.router.post(`${this.path}`, (0, validation_middleware_1.ValidationMiddleware)(users_dto_1.CreateUserDto, true), this.user.createUser);
        this.router.put(`${this.path}/:id`, (0, validation_middleware_1.ValidationMiddleware)(users_dto_1.CreateUserDto, true), this.user.updateUser);
        this.router.delete(`${this.path}/:id`, this.user.deleteUser);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=users.route.js.map