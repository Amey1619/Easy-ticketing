"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const mongoose_1 = require("mongoose");
const TicketSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "open",
    },
    priority: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    assignedAgent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    comments: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        default: [],
    },
    history: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "TicketLog",
            },
        ],
        default: [],
    },
}, { timestamps: true });
exports.TicketModel = (0, mongoose_1.model)("Ticket", TicketSchema);
//# sourceMappingURL=tickets.model.js.map