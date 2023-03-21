import { makeVar, ReactiveVar } from "@apollo/client";
import { PER_PAGE } from "./config";
import { Sort, TodosQueryVariables, User } from "./graphql/generated";

const userFromSttorage = window.localStorage.getItem("user");
const currentUserVarInitialValue = userFromSttorage
  ? JSON.parse(userFromSttorage)
  : null;

export const currentUserVar: ReactiveVar<User | null> = makeVar<User | null>(
  currentUserVarInitialValue
);

export const OrderByAsc = "asc" as Sort;
export const OrderByDesc = "desc" as Sort;

const todosFeedSortByFromStorage =
  window.localStorage.getItem("todosFeedSortBy");

const todosFeedQueryVarInitialValue: TodosQueryVariables = {
  skip: 0,
  take: PER_PAGE,
  orderBy: [
    todosFeedSortByFromStorage
      ? JSON.parse(todosFeedSortByFromStorage)
      : { updatedAt: OrderByDesc },
  ],
};

export const todosFeedQueryVar: ReactiveVar<TodosQueryVariables> =
  makeVar<TodosQueryVariables>(todosFeedQueryVarInitialValue);
