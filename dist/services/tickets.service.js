"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const httpExceptions_1 = require("../exceptions/httpExceptions");
const tickets_model_1 = require("../models/tickets.model");
const comments_model_1 = require("../models/comments.model");
const ticketLogs_model_1 = require("../models/ticketLogs.model");
const mongoose_1 = require("mongoose");
let TicketsService = class TicketsService {
    findAllTickets(user, status, priority, category, assigned, sortBy, sortOrder) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const filter = {};
            const sorter = {};
            let tickets = [];
            if (user.role === "user")
                filter["createdBy"] = user._id;
            if (status)
                filter["status"] = status;
            if (priority)
                filter["priority"] = priority;
            if (assigned) {
                if (assigned === "true")
                    filter["assignedAgent"] = { $not: { $eq: null } };
                else if (assigned === "false")
                    filter["assignedAgent"] = null;
            }
            if (category)
                filter["category"] = category;
            if (sortBy)
                sorter[sortBy] = sortOrder;
            tickets = yield tickets_model_1.TicketModel.find(filter).populate("comments").sort(sorter);
            return tickets;
        });
    }
    newTicket(ticketData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateData = {
                userId: ticketData.createdBy,
                updateType: "newTicket",
                updateFields: ticketData,
            };
            const logData = yield ticketLogs_model_1.TicketLogModel.create(updateData);
            if (!logData) {
                throw new httpExceptions_1.HttpException(500, "Failed to create the log");
            }
            ticketData.history = [new mongoose_1.Types.ObjectId(logData._id)];
            //creating a ticket
            const ticket = yield tickets_model_1.TicketModel.create(ticketData);
            if (!ticket) {
                throw new httpExceptions_1.HttpException(500, "Failed to create the ticket");
            }
            return ticket;
        });
    }
    getTicketById(ticketId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticket = yield tickets_model_1.TicketModel.findById(ticketId).populate("comments");
            if (!ticket) {
                throw new httpExceptions_1.HttpException(404, "Ticket not found");
            }
            if (user._id &&
                ticket.createdBy.toString() !== user._id.toString() &&
                user.role === "user") {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Access");
            }
            return ticket;
        });
    }
    updateTicketById(ticketId, updateData, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticket = yield tickets_model_1.TicketModel.findById(ticketId);
            if (!ticket) {
                throw new httpExceptions_1.HttpException(404, "Ticket not found");
            }
            if (user._id &&
                ticket.createdBy.toString() !== user._id.toString() &&
                user.role === "user") {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Access");
            }
            // logging the ticket updation
            const multiFieldUpdateData = {
                userId: user._id,
                updateType: "updateTicket",
                updateFields: updateData,
            };
            const logData = yield ticketLogs_model_1.TicketLogModel.create(multiFieldUpdateData);
            if (!logData) {
                throw new httpExceptions_1.HttpException(500, "Failed to create the log");
            }
            const updatedTicket = yield tickets_model_1.TicketModel.findByIdAndUpdate(ticketId, { $set: updateData, $push: { history: logData._id } }, { new: true }).populate("comments");
            if (!updatedTicket) {
                throw new httpExceptions_1.HttpException(500, "Failed to update ticket");
            }
            return updatedTicket;
        });
    }
    assignTicket(ticketId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // logging the ticket assigning
            const updateData = {
                userId: user._id,
                updateType: "assignTicket",
                updateFields: {
                    assignedAgent: user._id,
                    status: "inProgress",
                },
            };
            const logData = yield ticketLogs_model_1.TicketLogModel.create(updateData);
            if (!logData) {
                throw new httpExceptions_1.HttpException(500, "Failed to create the log");
            }
            //assigining ticket
            const ticket = yield tickets_model_1.TicketModel.findOneAndUpdate({ _id: ticketId, assignedAgent: null, status: "open" }, {
                $set: { assignedAgent: user._id, status: "inProgress" },
                $push: { history: logData._id },
            }, { new: true }).populate({ path: "createdBy", select: "email" });
            if (!ticket) {
                throw new httpExceptions_1.HttpException(404, "Ticket not found/Ticket already assigned");
            }
            return ticket;
        });
    }
    findTickets(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tickets = yield tickets_model_1.TicketModel.find({ assignedAgent: user._id });
            if (!tickets) {
                throw new httpExceptions_1.HttpException(500, "Failed to get tickets");
            }
            return tickets;
        });
    }
    changeAgent(ticketId, newAgentId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (user.role == "support") {
                const ticket = yield tickets_model_1.TicketModel.findOne({
                    _id: ticketId,
                    assignedAgent: user._id,
                });
                if (!ticket) {
                    throw new httpExceptions_1.HttpException(404, "Ticket not found or Unauthorized access");
                }
            }
            // logging the ticket assigning
            const updateData = {
                userId: user._id,
                updateType: "reassignTicket",
                updateFields: {
                    assignedAgent: newAgentId,
                },
            };
            const logData = yield ticketLogs_model_1.TicketLogModel.create(updateData);
            if (!logData) {
                throw new httpExceptions_1.HttpException(500, "Failed to create the log");
            }
            //reassigining ticket
            const updatedTicket = yield tickets_model_1.TicketModel.findOneAndUpdate({ _id: ticketId }, { $set: { assignedAgent: newAgentId }, $push: { history: logData._id } }, { new: true }).populate([
                { path: "createdBy", select: "email" },
                { path: "assignedAgent", select: "email" },
            ]);
            if (!updatedTicket) {
                throw new httpExceptions_1.HttpException(404, `Ticket with the id ${ticketId} not found`);
            }
            return updatedTicket;
        });
    }
    closeTicket(ticketId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (user.role == "support") {
                const ticket = yield tickets_model_1.TicketModel.findOne({
                    _id: ticketId,
                    assignedAgent: user._id,
                });
                if (!ticket) {
                    throw new httpExceptions_1.HttpException(404, "Ticket not found or Unauthorized access");
                }
            }
            // logging the ticket closing
            const updateData = {
                userId: user._id,
                updateType: "closeTicket",
                updateFields: {
                    status: "closed",
                },
            };
            const logData = yield ticketLogs_model_1.TicketLogModel.create(updateData);
            if (!logData) {
                throw new httpExceptions_1.HttpException(500, "Failed to create the log");
            }
            //closing ticket
            const closedTicket = yield tickets_model_1.TicketModel.findOneAndUpdate({ _id: ticketId }, { $set: { status: "closed" }, $push: { history: logData._id } }, { new: true }).populate([
                { path: "createdBy", select: "email" },
                { path: "assignedAgent", select: "email" },
            ]);
            if (!closedTicket) {
                throw new httpExceptions_1.HttpException(404, `Ticket with the id ${ticketId} not found or Unauthorized Agent`);
            }
            return closedTicket;
        });
    }
    createComment(ticketId, commentData, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // logging the comment creation
            const updateData = {
                userId: user._id,
                updateType: "comment",
                updateFields: {
                    comment: commentData,
                },
            };
            const logData = yield ticketLogs_model_1.TicketLogModel.create(updateData);
            if (!logData) {
                throw new httpExceptions_1.HttpException(500, "Failed to create the log");
            }
            //creating comment
            const ticket = yield tickets_model_1.TicketModel.findById(ticketId);
            if (!ticket) {
                throw new httpExceptions_1.HttpException(404, `Ticket with the id ${ticketId} not found`);
            }
            if (!ticket.assignedAgent) {
                throw new httpExceptions_1.HttpException(409, `Ticket not yet assigned to an agent`);
            }
            if (user._id &&
                user.role == "support" &&
                ticket.assignedAgent.toString() != user._id.toString()) {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Operation");
            }
            if (user._id &&
                user.role == "user" &&
                ticket.createdBy.toString() != user._id.toString()) {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Operation");
            }
            const comment = yield comments_model_1.CommentModel.create({
                text: commentData,
                author: user._id,
            });
            if (!comment) {
                throw new httpExceptions_1.HttpException(500, "Failed to create the comment");
            }
            ticket.comments = [new mongoose_1.Types.ObjectId(comment._id)];
            ticket.history = [new mongoose_1.Types.ObjectId(logData._id)];
            yield ticket.save();
            const ticketNew = yield ticket.populate([
                "comments",
                { path: "createdBy", select: "email" },
                { path: "assignedAgent", select: "email" },
            ]);
            if (!ticketNew) {
                throw new httpExceptions_1.HttpException(500, `Failed to retrieve ticket`);
            }
            return ticket;
        });
    }
    getComments(ticketId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticket = yield tickets_model_1.TicketModel.findById(ticketId).populate("comments");
            if (!ticket) {
                throw new httpExceptions_1.HttpException(404, `Ticket with the id ${ticketId} not found`);
            }
            if (user._id &&
                user.role == "support" &&
                ticket.assignedAgent.toString() != user._id.toString()) {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Operation");
            }
            if (user._id &&
                user.role == "user" &&
                ticket.createdBy.toString() != user._id.toString()) {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Operation");
            }
            return ticket.comments;
        });
    }
    findAndDeleteTicket(ticketId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticket = yield tickets_model_1.TicketModel.findById(ticketId);
            if (!ticket) {
                throw new httpExceptions_1.HttpException(404, `Ticket with the id ${ticketId} not found`);
            }
            if (user._id &&
                user.role == "support" &&
                ticket.assignedAgent.toString() != user._id.toString()) {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Operation");
            }
            yield comments_model_1.CommentModel.deleteMany({ _id: { $in: ticket.comments } });
            yield ticketLogs_model_1.TicketLogModel.deleteMany({ _id: { $in: ticket.history } });
            const deletedTicket = yield tickets_model_1.TicketModel.findByIdAndDelete(ticketId).populate({ path: "createdBy", select: "email" });
            if (!deletedTicket) {
                throw new httpExceptions_1.HttpException(500, `Failed to delete ticket`);
            }
            return deletedTicket;
        });
    }
    getLogs(ticketId, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ticket = yield tickets_model_1.TicketModel.findById(ticketId).populate("history");
            if (!ticket) {
                throw new httpExceptions_1.HttpException(404, `Ticket with the id ${ticketId} not found`);
            }
            if (user._id &&
                user.role == "support" &&
                ticket.assignedAgent.toString() != user._id.toString()) {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Operation");
            }
            if (user._id &&
                user.role == "user" &&
                ticket.createdBy.toString() != user._id.toString()) {
                throw new httpExceptions_1.HttpException(403, "Unauthorized Operation");
            }
            return ticket.history;
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], TicketsService);
//# sourceMappingURL=tickets.service.js.map