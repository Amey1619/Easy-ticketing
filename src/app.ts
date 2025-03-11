import "reflect-metadata";
import hpp from "hpp";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { logger, stream } from "./utils/loggers";
import { connect } from "mongoose";
import { Routes } from "./interfaces/routes.interface";
import compression from "compression";
import { ErrorMiddleware } from "./interfaces/middleware/error.middleware";
import {
  NODE_ENV,
  DATABASE_URL,
  LOG_FORMAT,
  PORT,
  CREDENTIALS,
  ORIGIN,
} from "./config";

export class App {
  private app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 3000;
    this.env = NODE_ENV || "development";
    this.connectDB();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }
  public getServer() {
    return this.app;
  }

  private async connectDB() {
    try {
      await connect(`${DATABASE_URL}`);
      logger.info("Connected to Database successfully");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(`${LOG_FORMAT}`, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeSwagger() {
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

    const specs = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
