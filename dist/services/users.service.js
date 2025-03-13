"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const typedi_1 = require("typedi");
const httpExceptions_1 = require("../exceptions/httpExceptions");
const users_model_1 = require("../models/users.model");
let UserService = class UserService {
    findAllUser() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield users_model_1.UserModel.find({ role: "user" }, { id: 1, email: 1, role: 1 });
            return users;
        });
    }
    findUserById(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findUser = yield users_model_1.UserModel.findOne({ _id: userId }, { id: 1, email: 1, role: 1 });
            // Error: Type 'User | null' is not assignable to type 'User'.Type 'null' is not assignable to type 'User'.ts(2322)
            if (!findUser)
                throw new httpExceptions_1.HttpException(409, "User doesn't exist");
            return findUser;
        });
    }
    createUser(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findUser = yield users_model_1.UserModel.findOne({ email: userData.email });
            if (findUser)
                throw new httpExceptions_1.HttpException(409, `This email ${userData.email} already exists`);
            const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
            const createUserData = yield users_model_1.UserModel.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            return createUserData;
        });
    }
    updateUser(userId, userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (userData.email) {
                const findUser = yield users_model_1.UserModel.findOne({ email: userData.email });
                if (findUser && findUser._id != userId)
                    throw new httpExceptions_1.HttpException(409, `This email ${userData.email} already exists`);
            }
            if (userData.password) {
                const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
                userData = Object.assign(Object.assign({}, userData), { password: hashedPassword });
            }
            const updateUserById = yield users_model_1.UserModel.findByIdAndUpdate(userId, userData, { new: true });
            if (!updateUserById)
                throw new httpExceptions_1.HttpException(409, "User doesn't exist");
            return updateUserById;
        });
    }
    deleteUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleteUserById = yield users_model_1.UserModel.findByIdAndDelete(userId);
            if (!deleteUserById)
                throw new httpExceptions_1.HttpException(409, "User doesn't exist");
            return deleteUserById;
        });
    }
    findAgents() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const agents = yield users_model_1.UserModel.find({ role: "support" }, { id: 1, email: 1 });
                return agents;
            }
            catch (error) {
                throw new httpExceptions_1.HttpException(500, `Failed to retrieve agents: ${error.message}`);
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], UserService);
//# sourceMappingURL=users.service.js.map