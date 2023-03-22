import { useReactiveVar } from "@apollo/client";
import { Input } from "antd";
import React, { useCallback } from "react";
import { todosFeedQueryVar } from "../../storage";
const { Search } = Input;

export const TodoSearch: React.FC = () => {
  const todosFeedQueryOptions = useReactiveVar(todosFeedQueryVar);

  const onSearch = useCallback(
    (value: string) => {
      todosFeedQueryVar({
        ...todosFeedQueryOptions,
        filter: value || undefined,
      });
    },
    [todosFeedQueryOptions]
  );
  return (
    <Search
      style={{ maxWidth: 200 }}
      placeholder="Search todos"
      onSearch={onSearch}
    />
  );
};

export default TodoSearch;
