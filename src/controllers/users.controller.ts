import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/users.interface";
import { UserService } from "../services/users.service";

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: "findAll", count: findAllUsersData.length });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

  public getAgents = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const agents: User[] = await this.user.findAgents();
      res.status(200).json({ data: agents, message: "Agents Fetched" });
    } catch (error) {
      next(error);
    }
  };
}
