import { decorateType } from "nexus";
import { GraphQLDate, GraphQLDateTime } from "graphql-scalars";

export const GQLDate = decorateType(GraphQLDate, {
  sourceType: "Date",
  asNexusMethod: "date",
});
export const GQLDateTime = decorateType(GraphQLDateTime, {
  sourceType: "Date",
  asNexusMethod: "dateTime",
});

export * from "./Todo";
export * from "./Todos";
export * from "./User";
export * from "./Auth";
export * from "./Other";
