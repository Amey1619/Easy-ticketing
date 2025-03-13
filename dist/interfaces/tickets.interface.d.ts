import { Types } from "mongoose";
import { User } from "../interfaces/users.interface";
import { TicketLog } from "../interfaces/ticketLog.interface";
import { Comment } from "../interfaces/comments.interface";
export interface Ticket {
    _id?: Types.ObjectId;
    title: string;
    description: string;
    status?: string;
    priority: string;
    createdBy: Types.ObjectId | User;
    category: string;
    assignedAgent: Types.ObjectId | User;
    comments: Comment[] | Types.ObjectId[];
    history: TicketLog[] | Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export interface UpdateTicket {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    category?: string;
}
