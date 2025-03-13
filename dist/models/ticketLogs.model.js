"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketLogModel = void 0;
const mongoose_1 = require("mongoose");
const LogSchema = new mongoose_1.Schema({
    updateType: {
        type: String,
        required: true,
    },
    updateFields: {
        type: Object,
        required: true,
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: { createdAt: "timestamp", updatedAt: false } });
exports.TicketLogModel = (0, mongoose_1.model)("TicketLog", LogSchema);
//# sourceMappingURL=ticketLogs.model.js.map