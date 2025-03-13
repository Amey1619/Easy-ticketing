import { Routes } from "../interfaces/routes.interface";
export declare class DefaultRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    constructor();
    private initializeRoutes;
}
