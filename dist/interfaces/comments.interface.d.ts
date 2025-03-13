import { Types } from "mongoose";
import { User } from "../interfaces/users.interface";
export interface Comment {
    _id?: Types.ObjectId;
    comment: string;
    author: Types.ObjectId | User;
    createdAt: Date;
}
