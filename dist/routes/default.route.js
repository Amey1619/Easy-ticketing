"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRoute = void 0;
const express_1 = require("express");
class DefaultRoute {
    constructor() {
        this.path = "/";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (req, res, next) => {
            res.status(200).json({
                message: "SERVER RUNNING ON PORT 3000 🚀",
                whatNext: "Got to the route {{baseUrl}}/api-docs",
            });
        });
    }
}
exports.DefaultRoute = DefaultRoute;
//# sourceMappingURL=default.route.js.map