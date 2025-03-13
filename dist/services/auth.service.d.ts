import { User } from "../interfaces/users.interface";
export declare class AuthService {
    signup(userData: User): Promise<User>;
    login(userData: User): Promise<{
        cookie: string;
        findUser: User;
    }>;
    logout(userData: User): Promise<User>;
}
