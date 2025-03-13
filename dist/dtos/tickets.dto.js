"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentDto = exports.UpdateTicketDto = exports.CreateTicketDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const categories = [
    "Login/Authentication Issue",
    "UI/UX Feedback",
    "Performance Problem",
    "Broken Links",
    "Error Messages",
    "Compatibility Issue",
    "Missing or Incorrect Data",
    "Feature Malfunction",
    "General Inquiry",
    "Other",
];
// Data transfer object for creating ticket
class CreateTicketDto {
}
exports.CreateTicketDto = CreateTicketDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(32),
    tslib_1.__metadata("design:type", String)
], CreateTicketDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1024),
    tslib_1.__metadata("design:type", String)
], CreateTicketDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["low", "medium", "high"]),
    tslib_1.__metadata("design:type", String)
], CreateTicketDto.prototype, "priority", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(categories),
    tslib_1.__metadata("design:type", String)
], CreateTicketDto.prototype, "category", void 0);
// DTO For updating Ticket
class UpdateTicketDto {
}
exports.UpdateTicketDto = UpdateTicketDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(32),
    tslib_1.__metadata("design:type", String)
], UpdateTicketDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(1024),
    tslib_1.__metadata("design:type", String)
], UpdateTicketDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["low", "medium", "high"]),
    tslib_1.__metadata("design:type", String)
], UpdateTicketDto.prototype, "priority", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["open", "closed"]),
    tslib_1.__metadata("design:type", String)
], UpdateTicketDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(categories),
    tslib_1.__metadata("design:type", String)
], UpdateTicketDto.prototype, "category", void 0);
//DTO For adding a comment
class CreateCommentDto {
}
exports.CreateCommentDto = CreateCommentDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(64),
    tslib_1.__metadata("design:type", String)
], CreateCommentDto.prototype, "text", void 0);
//# sourceMappingURL=tickets.dto.js.map