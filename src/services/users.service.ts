import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "../exceptions/httpExceptions";
import { User } from "../interfaces/users.interface";
import { UserModel } from "../models/users.model";

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await UserModel.find(
      { role: "user" },
      { id: 1, email: 1, role: 1 }
    );
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser= await UserModel.findOne(
      { _id: userId },
      { id: 1, email: 1, role: 1 }
    );
    // Error: Type 'User | null' is not assignable to type 'User'.Type 'null' is not assignable to type 'User'.ts(2322)
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser as User;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser = await UserModel.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (userData.email) {
      const findUser = await UserModel.findOne({ email: userData.email });
      if (findUser && findUser._id != userId)
        throw new HttpException(
          409,
          `This email ${userData.email} already exists`
        );
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById= await UserModel.findByIdAndUpdate(
      userId,
      userData,
      { new: true }
    );

    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById as User;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById= await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById as User;
  }

  public async findAgents(): Promise<User[]> {
    try {
      const agents: User[] = await UserModel.find(
        { role: "support" },
        { id: 1, email: 1 }
      );
      return agents;
    } catch (error:any) {
      throw new HttpException(
        500,
        `Failed to retrieve agents: ${error.message}`
      );
    }
  }
}