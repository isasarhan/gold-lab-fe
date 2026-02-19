import { DefaultSession, DefaultUser } from "next-auth";
import { IUser } from "./user";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: IUser & DefaultSession["user"];
  }

  interface User extends IUser, DefaultUser {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: IUser;
  }
}
