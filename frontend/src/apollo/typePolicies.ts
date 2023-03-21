import { TypePolicies } from "@apollo/client";

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      feed: {
        keyArgs: ["orderBy"],
        merge(existing, incoming, { args, mergeObjects }) {
          if (!existing) {
            return incoming;
          }
          if (incoming?.todos?.length) {
            const existingTodos = existing?.todos?.length ? existing.todos : [];
            const mergedTodos = Array.from(
              new Set(
                [...existingTodos, ...incoming.todos].map((item) => item.__ref)
              )
            ).map((item) => ({ __ref: item }));
            return mergeObjects(incoming, {
              todos: mergedTodos,
            });
          }
        },
      },
    },
  },
};
