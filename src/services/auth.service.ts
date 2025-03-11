import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Service } from "typedi";
import { HttpException } from "../exceptions/httpExceptions";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import { SECRET_KEY } from "../config";
import { User } from "../interfaces/users.interface";
import { UserModel } from "../models/users.model";
import { sendMail } from "../utils/notification";

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id as string,
  };
  const expiresIn: number = 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, `${SECRET_KEY}`, { expiresIn }),
  };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser = await UserModel.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );
     await sendMail(
       userData.email,
       "Welcome to Ticketing Application",
       `<h3>Welcome to Ticketing Application!<h3>`
     );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(
    userData: User
  ): Promise<{ cookie: string; findUser: User }> {
    const findUser = await UserModel.findOne({
      email: userData.email,
      role: userData.role,
    });
    if (!findUser)
      throw new HttpException(
        404,
        `User with email ${userData.email} / role ${userData.role}  was not found`
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(401, "Password is not matching");

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
  }

    public async logout(userData: User): Promise<User> {
      const findUser = await UserModel.findOne({
        email: userData.email,
        password: userData.password,
      });
      if (!findUser)
        throw new HttpException(
          409,
          `This email ${userData.email} was not found`
        );

      return findUser;
    }
}
