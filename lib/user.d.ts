import NextAuth, {
  DefaultSession,
  Session as SessionModel,
  JWT as JWTModel,
} from "next-auth";
import { User as UserModel } from "@prisma/client";
import { DefaultJWT } from "next-auth/jwt";
import { SessionUser } from "@/lib/auth_options";

declare module "next-auth" {
  interface Session extends SessionModel {
    userId: string;
    user: SessionUser;
  }

  interface JWT extends JWTModel {
    userId: string;
  }
}
