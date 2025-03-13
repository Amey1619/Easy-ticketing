import { Ticket, UpdateTicket } from "../interfaces/tickets.interface";
import { User } from "../interfaces/users.interface";
import { Comment } from "../interfaces/comments.interface";
import { TicketLog } from "../interfaces/ticketLog.interface";
export declare class TicketsService {
    findAllTickets(user: User, status?: string, priority?: string, category?: string, assigned?: string, sortBy?: string, sortOrder?: string): Promise<Ticket[]>;
    newTicket(ticketData: Ticket): Promise<Ticket>;
    getTicketById(ticketId: string, user: User): Promise<Ticket>;
    updateTicketById(ticketId: string, updateData: UpdateTicket, user: User): Promise<Ticket>;
    assignTicket(ticketId: string, user: User): Promise<Ticket>;
    findTickets(user: User): Promise<Ticket[]>;
    changeAgent(ticketId: string, newAgentId: string, user: User): Promise<Ticket>;
    closeTicket(ticketId: string, user: User): Promise<Ticket>;
    createComment(ticketId: string, commentData: string, user: User): Promise<Ticket>;
    getComments(ticketId: string, user: User): Promise<Comment[]>;
    findAndDeleteTicket(ticketId: string, user: User): Promise<Ticket>;
    getLogs(ticketId: string, user: User): Promise<TicketLog[]>;
}
