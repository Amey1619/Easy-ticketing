"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRoute = void 0;
const express_1 = require("express");
const tickets_controller_1 = require("../controllers/tickets.controller");
const tickets_dto_1 = require("../dtos/tickets.dto");
const validation_middleware_1 = require("../interfaces/middleware/validation.middleware");
const auth_middleware_1 = require("../interfaces/middleware/auth.middleware");
class TicketRoute {
    constructor() {
        this.path = "/tickets";
        this.router = (0, express_1.Router)();
        this.ticket = new tickets_controller_1.TicketController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support", "user"]), this.ticket.getTickets);
        this.router.get(`${this.path}/claimed`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support"]), this.ticket.getClaimedTickets);
        this.router.get(`${this.path}/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support", "user"]), this.ticket.getTicketById);
        this.router.get(`${this.path}/comments/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support", "user"]), this.ticket.getCommentsById);
        this.router.get(`${this.path}/history/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support", "user"]), this.ticket.getTicketLogs);
        this.router.put(`${this.path}/reassign/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support"]), this.ticket.reassignTicket);
        this.router.put(`${this.path}/resolve/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support"]), this.ticket.resolveTicket);
        this.router.post(`${this.path}/comments/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support", "user"]), (0, validation_middleware_1.ValidationMiddleware)(tickets_dto_1.CreateCommentDto, true), this.ticket.addComment);
        this.router.post(`${this.path}`, (0, auth_middleware_1.AuthMiddleware)(["user"]), (0, validation_middleware_1.ValidationMiddleware)(tickets_dto_1.CreateTicketDto, true), this.ticket.createTicket);
        this.router.put(`${this.path}/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "user"]), (0, validation_middleware_1.ValidationMiddleware)(tickets_dto_1.UpdateTicketDto, true), this.ticket.updateTicket);
        this.router.put(`${this.path}/claim/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support"]), this.ticket.claimTicket);
        this.router.delete(`${this.path}/:id`, (0, auth_middleware_1.AuthMiddleware)(["admin", "support"]), this.ticket.deleteTicket);
    }
}
exports.TicketRoute = TicketRoute;
//# sourceMappingURL=tickets.route.js.map