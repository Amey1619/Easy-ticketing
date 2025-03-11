import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { Routes } from "../interfaces/routes.interface";
import { ValidationMiddleware } from "../interfaces/middleware/validation.middleware";
import { CreateUserDto } from "../dtos/users.dto";
import { AuthMiddleware } from "../interfaces/middleware/auth.middleware";

export class AuthRoutes implements Routes {
  public path = "/";
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`,ValidationMiddleware(CreateUserDto, true),this.auth.signUp);
    this.router.post(`${this.path}login`,ValidationMiddleware(CreateUserDto, true),this.auth.logIn);
    this.router.post(`${this.path}logout`,AuthMiddleware(["admin", "support", "user"]),this.auth.logOut);
  }
}
