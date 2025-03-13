import { UserController } from "../controllers/users.controller";
import { Routes } from "../interfaces/routes.interface";
export declare class UserRoutes implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    user: UserController;
    constructor();
    private initializeRoutes;
}
