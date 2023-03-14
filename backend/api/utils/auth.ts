import * as jwt from "jsonwebtoken";
import { Context } from "../context";

export const APP_SECRET = "d8578edf8458ce06fbc5bb76a58c5ca4";

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token found");
  }
  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}

export function authGuard(ctx: Context) {
  const { userId } = ctx;

  if (!userId) {
    throw new Error("You are not login in!");
  }
}
