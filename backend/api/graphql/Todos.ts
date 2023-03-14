import { Prisma } from "@prisma/client";
import {
  arg,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { authGuard } from "../utils/auth";

export const TodoFeed = objectType({
  name: "TodoFeed",
  definition(t) {
    t.nonNull.list.nonNull.field("todos", { type: "Todo" });
    t.int("count");
    t.id("id");
  },
});

export const TodoOrderByInput = inputObjectType({
  name: "TodoOrderByInput",
  definition(t) {
    t.field("title", { type: "Sort" });
    t.field("isDone", { type: "Sort" });
    t.field("createdAt", { type: "Sort" });
    t.field("updatedAt", { type: "Sort" });
  },
});

export const TodosQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("feed", {
      type: "TodoFeed",
      args: {
        filter: stringArg({ description: "Filter by title" }),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({ type: list(nonNull(TodoOrderByInput)) }),
      },
      async resolve(parent, args, ctx) {
        const { filter, skip, take, orderBy } = args || {};
        authGuard(ctx);

        const filterWhere = filter ? { title: { contains: filter } } : {};

        const where = { ...filterWhere, userId: ctx.userId };

        const todos = await ctx.prisma.todo.findMany({
          where,
          skip: skip as number | undefined,
          take: take as number | undefined,
          orderBy: orderBy as
            | Prisma.Enumerable<Prisma.TodoOrderByWithRelationInput>
            | undefined,
        });
        const count = await ctx.prisma.todo.count({ where });
        const id = `todo-feed:${JSON.stringify(args)}`;
        return {
          count,
          todos,
          id,
        };
      },
    });
  },
});
