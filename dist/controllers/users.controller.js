"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const users_service_1 = require("../services/users.service");
class UserController {
    constructor() {
        this.user = typedi_1.Container.get(users_service_1.UserService);
        this.getUsers = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const findAllUsersData = yield this.user.findAllUser();
                res.status(200).json({ data: findAllUsersData, message: "findAll", count: findAllUsersData.length });
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserById = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const findOneUserData = yield this.user.findUserById(userId);
                res.status(200).json({ data: findOneUserData, message: "findOne" });
            }
            catch (error) {
                next(error);
            }
        });
        this.createUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const createUserData = yield this.user.createUser(userData);
                res.status(201).json({ data: createUserData, message: "created" });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const userData = req.body;
                const updateUserData = yield this.user.updateUser(userId, userData);
                res.status(200).json({ data: updateUserData, message: "updated" });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteUser = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const deleteUserData = yield this.user.deleteUser(userId);
                res.status(200).json({ data: deleteUserData, message: "deleted" });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAgents = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const agents = yield this.user.findAgents();
                res.status(200).json({ data: agents, message: "Agents Fetched" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map