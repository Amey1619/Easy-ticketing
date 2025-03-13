"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = AuthMiddleware;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
const httpExceptions_1 = require("../../exceptions/httpExceptions");
const users_model_1 = require("../../models/users.model");
const getAuthorization = (req) => {
    var _a;
    const cookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a["Authorization"];
    if (cookie)
        return cookie;
    const header = req.header("Authorization");
    if (header)
        return header.replace("Bearer ", "");
    return null;
};
function AuthMiddleware(roles) {
    return (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const Authorization = getAuthorization(req);
            if (Authorization) {
                const { _id } = (yield (0, jsonwebtoken_1.verify)(Authorization, `${config_1.SECRET_KEY}`));
                const findUser = yield users_model_1.UserModel.findById(_id);
                if (findUser && roles.includes(findUser.role)) {
                    req.user = findUser;
                    next();
                }
                else {
                    next(new httpExceptions_1.HttpException(401, "Wrong authentication token or Not authorized"));
                }
            }
            else {
                next(new httpExceptions_1.HttpException(404, "Authentication token missing"));
            }
        }
        catch (error) {
            next(new httpExceptions_1.HttpException(401, "Wrong authentication token"));
        }
    });
}
//# sourceMappingURL=auth.middleware.js.map