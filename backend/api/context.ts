import { ContextFunction } from "@apollo/server";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { PrismaClient } from "@prisma/client";
import { decodeAuthHeader } from "./utils/auth";

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

const prisma = new PrismaClient();

export const createContext: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  Context
> = async ({ req }) => {
  const { authorization } = req?.headers || {};
  const token = authorization ? decodeAuthHeader(authorization) : null;
  return {
    prisma: prisma,
    userId: token?.userId,
  };
};
