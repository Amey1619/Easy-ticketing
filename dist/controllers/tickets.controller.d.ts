import { NextFunction, Response } from "express";
import { TicketsService } from "../services/tickets.service";
import { RequestWithUser } from "../interfaces/auth.interface";
export declare class TicketController {
    ticket: TicketsService;
    getTickets: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    createTicket: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getTicketById: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    updateTicket: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    claimTicket: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getClaimedTickets: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    reassignTicket: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    resolveTicket: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    addComment: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getCommentsById: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    deleteTicket: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getTicketLogs: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
