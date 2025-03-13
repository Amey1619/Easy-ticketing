import { NextFunction, Response } from "express";
import { RequestWithUser } from "../auth.interface";
export declare function AuthMiddleware(roles: string[]): (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
