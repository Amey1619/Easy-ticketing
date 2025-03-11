import { Types } from 'mongoose';

export interface User {
  _id?: Types.ObjectId | string;
  email: string;
  password: string;
  role: string;
}
