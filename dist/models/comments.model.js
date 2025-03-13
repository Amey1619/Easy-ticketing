"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.CommentModel = (0, mongoose_1.model)("Comment", CommentSchema);
//# sourceMappingURL=comments.model.js.map