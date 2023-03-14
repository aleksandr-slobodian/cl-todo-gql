import { Prisma } from "@prisma/client";
import {
  booleanArg,
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { authGuard } from "../utils/auth";

export const Todo = objectType({
  name: "Todo",
  definition(t) {
    t.nonNull.int("id");
    t.string("title");
    t.int("userId");
    t.boolean("isDone");
    t.dateTime("createdAt");
    t.dateTime("updatedAt");
  },
});

export const TodoMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addTodo", {
      type: "Todo",
      args: {
        title: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        authGuard(ctx);
        return ctx.prisma.todo.create({
          data: {
            title: args.title,
            isDone: false,
            user: { connect: { id: ctx.userId } },
          },
        });
      },
    });
    t.nonNull.field("updateTodo", {
      type: "Todo",
      args: {
        todoId: nonNull(intArg()),
        title: nonNull(stringArg()),
        isDone: nonNull(booleanArg()),
      },
      async resolve(_, { todoId, ...todoArgs }, ctx) {
        authGuard(ctx);

        const { userId } = ctx;
        const todo = await ctx.prisma.todo.findFirst({
          where: { id: todoId, userId },
        });
        if (!todo) {
          throw new Error("You can't update this todo!");
        }

        return ctx.prisma.todo.update({
          data: { ...todoArgs, updatedAt: new Date() },
          where: { id: todoId },
        });
      },
    });
    t.nonNull.field("deleteTodo", {
      type: "Todo",
      args: {
        todoId: nonNull(intArg()),
      },
      async resolve(_, { todoId }, ctx) {
        authGuard(ctx);

        const { userId } = ctx;
        const todo = await ctx.prisma.todo.findFirst({
          where: { id: todoId, userId },
        });
        if (!todo) {
          throw new Error("You can't delete this todo!");
        }

        return ctx.prisma.todo.delete({
          where: { id: todoId } as Prisma.TodoWhereUniqueInput,
        });
      },
    });
  },
});
