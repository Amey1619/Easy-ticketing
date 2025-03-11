import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { HttpException } from "../../exceptions/httpExceptions";
import { DataStoredInToken, RequestWithUser } from "../auth.interface";
import { UserModel } from "../../models/users.model";

const getAuthorization = (req: Request): string | null => {
  const cookie = req.cookies?.["Authorization"];
  if (cookie) return cookie;

  const header = req.header("Authorization");
  if (header) return header.replace("Bearer ", "");

  return null;
};
export function AuthMiddleware(roles: string[]) {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization = getAuthorization(req);

      if (Authorization) {
        const { _id } = (await verify(
          Authorization,
          `${SECRET_KEY}`
        )) as DataStoredInToken;
        const findUser = await UserModel.findById(_id);

        if (findUser && roles.includes(findUser.role)) {
          req.user = findUser;
          next();
        } else {
          next(
            new HttpException(
              401,
              "Wrong authentication token or Not authorized"
            )
          );
        }
      } else {
        next(new HttpException(404, "Authentication token missing"));
      }
    } catch (error) {
      next(new HttpException(401, "Wrong authentication token"));
    }
  };
}
