import { TicketController } from "../controllers/tickets.controller";
import { Routes } from "../interfaces/routes.interface";
export declare class TicketRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    ticket: TicketController;
    constructor();
    private initializeRoutes;
}
