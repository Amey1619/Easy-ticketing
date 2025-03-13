import { Document } from "mongoose";
import { Ticket } from "../interfaces/tickets.interface";
export declare const TicketModel: import("mongoose").Model<Ticket & Document<unknown, any, any>, {}, {}, {}, Document<unknown, {}, Ticket & Document<unknown, any, any>> & Ticket & Document<unknown, any, any> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
