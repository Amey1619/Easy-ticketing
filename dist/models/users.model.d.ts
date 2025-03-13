import { Document } from "mongoose";
import { User } from "../interfaces/users.interface";
export declare const UserModel: import("mongoose").Model<User & Document<unknown, any, any>, {}, {}, {}, Document<unknown, {}, User & Document<unknown, any, any>> & User & Document<unknown, any, any> & Required<{
    _id: string | import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
