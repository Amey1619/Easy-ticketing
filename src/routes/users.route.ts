import { Router } from "express";
import { UserController } from "../controllers/users.controller";
import { Routes } from "../interfaces/routes.interface";
import { ValidationMiddleware } from "../interfaces/middleware/validation.middleware";
import { CreateUserDto } from "../dtos/users.dto";
import { AuthMiddleware } from "../interfaces/middleware/auth.middleware";


export class UserRoutes implements Routes {
  public path = "/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(
      `${this.path}/agents`,
      AuthMiddleware(["admin", "support"]),
      this.user.getAgents
    );
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(
      `${this.path}`,
      ValidationMiddleware(CreateUserDto, true),
      this.user.createUser
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateUserDto, true),
      this.user.updateUser
    );
    this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}