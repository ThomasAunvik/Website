import { Session as SessionModel, JWT as JWTModel } from "next-auth";
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
