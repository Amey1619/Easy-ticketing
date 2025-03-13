import { Document, Types } from "mongoose";
import { TicketLog } from "../interfaces/ticketLog.interface";
export declare const TicketLogModel: import("mongoose").Model<TicketLog & Document<unknown, any, any>, {}, {}, {}, Document<unknown, {}, TicketLog & Document<unknown, any, any>> & TicketLog & Document<unknown, any, any> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
