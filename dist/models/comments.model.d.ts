import { Document } from "mongoose";
import { Comment } from "../interfaces/comments.interface";
export declare const CommentModel: import("mongoose").Model<Comment & Document<unknown, any, any>, {}, {}, {}, Document<unknown, {}, Comment & Document<unknown, any, any>> & Comment & Document<unknown, any, any> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
