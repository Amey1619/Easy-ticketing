"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const tickets_service_1 = require("../services/tickets.service");
const httpExceptions_1 = require("../exceptions/httpExceptions");
const notification_1 = require("../utils/notification");
class TicketController {
    constructor() {
        this.ticket = typedi_1.Container.get(tickets_service_1.TicketsService);
        this.getTickets = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { status, priority, category, assigned, sortBy, sortOrder } = req.query;
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "Unauthorized"));
                }
                const ticketsData = yield this.ticket.findAllTickets(req.user, status, priority, category, assigned, sortBy, sortOrder);
                res
                    .status(200)
                    .json({
                    data: ticketsData,
                    message: "All tickets",
                    count: ticketsData.length,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.createTicket = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const ticketData = req.body;
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "Unauthorized"));
                }
                ticketData.createdBy = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                const ticket = yield this.ticket.newTicket(ticketData);
                yield (0, notification_1.sendMail)((_b = req.user) === null || _b === void 0 ? void 0 : _b.email, "Ticket Creation", `<h3>New Ticket Created!<h3>`);
                res
                    .status(201)
                    .json({ data: ticket, message: "Ticket creation successfull" });
            }
            catch (error) {
                next(error);
            }
        });
        this.getTicketById = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const ticket = yield this.ticket.getTicketById(ticketId, req.body);
                res
                    .status(200)
                    .json({ data: ticket, message: "Ticket Retrieval successfull" });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTicket = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const updateData = {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    priority: req.body.priority,
                    category: req.body.category,
                };
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "Unauthorized"));
                }
                const updatedTicket = yield this.ticket.updateTicketById(ticketId, updateData, req.user);
                yield (0, notification_1.sendMail)(req.user.email, "Ticket Updation", `<h3>Ticket Updated Successfully!<h3>`);
                res
                    .status(201)
                    .json({ data: updatedTicket, message: "Ticket update successfull" });
            }
            catch (error) {
                next(error);
            }
        });
        this.claimTicket = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "Unauthorized"));
                }
                const ticket = yield this.ticket.assignTicket(ticketId, req.user);
                // email for support agent
                yield (0, notification_1.sendMail)(req.user.email, "Ticket Claimed", `<h5>Successfully Claimed Ticket with Id: <p>${ticket._id}</p>!<h5>`);
                if (ticket.createdBy &&
                    typeof ticket.createdBy == "object" &&
                    "email" in ticket.createdBy) {
                    yield (0, notification_1.sendMail)(ticket.createdBy.email, "Ticket Assigned", `<h5>Ticket with, Id: <p> ${ticket._id}</p> assigned to Agent with email ${req.user.email}<h5>`);
                }
                if (ticket)
                    res
                        .status(201)
                        .json({ data: ticket, message: "Ticket claim successfull" });
                else
                    res
                        .status(409)
                        .json({ data: ticket, message: "Ticket already claimed" });
            }
            catch (error) {
                next(error);
            }
        });
        this.getClaimedTickets = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketsData = yield this.ticket.findTickets(req.body);
                res.status(200).json({ data: ticketsData, message: "Claimed tickets" });
            }
            catch (error) {
                next(error);
            }
        });
        this.reassignTicket = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const newAgentId = req.body.agentId;
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "Unauthorized"));
                }
                const ticket = yield this.ticket.changeAgent(ticketId, newAgentId, req.user);
                //email for prev agent
                yield (0, notification_1.sendMail)(req.user.email, "Ticket Reassigned Successfully", `<h5>Successfully Reassigned Ticket with Id: <p>${ticket._id}</p><h5>`);
                //email for new agent
                if (ticket.assignedAgent &&
                    typeof ticket.assignedAgent == "object" &&
                    "email" in ticket.assignedAgent) {
                    yield (0, notification_1.sendMail)(ticket.assignedAgent.email, "Ticket Assigned", `<h5>Ticket with, Id: <p> ${ticket._id}</p>Assigned to you by the Agent with email ${req.user.email}<h5>`);
                }
                //email for user
                if (ticket.createdBy &&
                    typeof ticket.createdBy == "object" &&
                    "email" in ticket.createdBy) {
                    yield (0, notification_1.sendMail)(ticket.createdBy.email, "New Agent Assigned", `<h5>Ticket Assigned to a new Agent<h5>`);
                }
                res
                    .status(201)
                    .json({ data: ticket, message: "Ticket reassign successfull" });
            }
            catch (error) {
                next(error);
            }
        });
        this.resolveTicket = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "Unauthorized"));
                }
                const ticket = yield this.ticket.closeTicket(ticketId, req.user);
                //email for support agent
                yield (0, notification_1.sendMail)(req.user.email, "Ticket Closed", `<h5>Successfully Closed Ticket with Id: <p>${ticket._id}</p>!<h5>`);
                if (ticket.createdBy &&
                    typeof ticket.createdBy == "object" &&
                    "email" in ticket.createdBy) {
                    yield (0, notification_1.sendMail)(ticket.createdBy.email, "Ticket Closed", `<h5>Ticket with, Id: <p> ${ticket._id}</p> Closed by the Agent with email ${req.user.email}<h5>`);
                }
                res.status(201).json({ message: "Ticket resolved", data: ticket });
            }
            catch (err) {
                next(err);
            }
        });
        this.addComment = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const comment = req.body.text;
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "Unauthorized"));
                }
                const ticket = yield this.ticket.createComment(ticketId, comment, req.user);
                //email for user/owner of ticket
                if (ticket.createdBy &&
                    typeof ticket.createdBy == "object" &&
                    "email" in ticket.createdBy) {
                    yield (0, notification_1.sendMail)(ticket.createdBy.email, "New Comment Added", `<h5>New Comment Added on the Ticket with Id: <p>${ticket._id}</p><h5>`);
                }
                //email for support agent
                if (ticket.assignedAgent &&
                    typeof ticket.assignedAgent == "object" &&
                    "email" in ticket.assignedAgent) {
                    yield (0, notification_1.sendMail)(ticket.assignedAgent.email, "New Comment Added", `<h5>New Comment Added on the Ticket with Id: <p>${ticket._id}</p> <h5>`);
                }
                res.status(201).json({ data: ticket, message: "Ticket comment added" });
            }
            catch (error) {
                next(error);
            }
        });
        this.getCommentsById = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const comments = yield this.ticket.getComments(ticketId, req.body);
                res.status(200).json({ data: comments, message: "Ticket comments" });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTicket = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const ticket = yield this.ticket.findAndDeleteTicket(ticketId, req.body);
                //email for user/owner of ticket
                //agent and admin can delete the ticket
                if (!req.user) {
                    return next(new httpExceptions_1.HttpException(401, "Unauthorized"));
                }
                if (ticket.createdBy &&
                    typeof ticket.createdBy == "object" &&
                    "email" in ticket.createdBy) {
                    yield (0, notification_1.sendMail)(ticket.createdBy.email, "Ticket Deleted", `<h5>Ticket with Id: <p>${ticket._id}</p> Deleted by the admin/agent with email ${req.user.email} <h5>`);
                }
                //email for support agent
                yield (0, notification_1.sendMail)(req.user.email, "Ticket Deleted", `<h5> Ticket with Id: <p>${ticket._id}</p> Deleted <h5>`);
                res.status(200).json({ data: ticket, message: "Ticket deleted" });
            }
            catch (error) {
                next(error);
            }
        });
        this.getTicketLogs = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const ticketId = req.params.id;
                const history = yield this.ticket.getLogs(ticketId, req.body);
                res.status(200).json({ data: history, message: "Ticket history" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TicketController = TicketController;
//# sourceMappingURL=tickets.controller.js.map