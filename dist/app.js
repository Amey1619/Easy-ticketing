"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const swagger_jsdoc_1 = tslib_1.__importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const loggers_1 = require("./utils/loggers");
const mongoose_1 = require("mongoose");
const compression_1 = tslib_1.__importDefault(require("compression"));
const error_middleware_1 = require("./interfaces/middleware/error.middleware");
const config_1 = require("./config");
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = config_1.PORT || 3000;
        this.env = config_1.NODE_ENV || "development";
        this.connectDB();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            loggers_1.logger.info(`=================================`);
            loggers_1.logger.info(`======= ENV: ${this.env} =======`);
            loggers_1.logger.info(`🚀 App listening on the port ${this.port}`);
            loggers_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    connectDB() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, mongoose_1.connect)(`${config_1.DATABASE_URL}`);
                loggers_1.logger.info("Connected to Database successfully");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)(`${config_1.LOG_FORMAT}`, { stream: loggers_1.stream }));
        this.app.use((0, cors_1.default)({ origin: config_1.ORIGIN, credentials: config_1.CREDENTIALS }));
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        });
    }
    initializeSwagger() {
        const options = {
            failOnErrors: true,
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "REST API",
                    version: "1.0.0",
                    description: "Easy-Ticketing RestApi docs",
                },
            },
            apis: ["swagger.yaml"],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.ErrorMiddleware);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map