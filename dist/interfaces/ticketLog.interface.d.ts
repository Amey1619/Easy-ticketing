import { Types } from "mongoose";
import { User } from "../interfaces/users.interface";
export interface TicketLog {
    _id?: Types.ObjectId;
    userId: Types.ObjectId | User;
    updateFields: object;
    updateType: string;
}
