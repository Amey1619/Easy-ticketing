import { User } from "../interfaces/users.interface";
export declare class UserService {
    findAllUser(): Promise<User[]>;
    findUserById(userId: string): Promise<User>;
    createUser(userData: User): Promise<User>;
    updateUser(userId: string, userData: User): Promise<User>;
    deleteUser(userId: string): Promise<User>;
    findAgents(): Promise<User[]>;
}
