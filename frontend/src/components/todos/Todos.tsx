import { useQuery, useReactiveVar } from "@apollo/client";
import { Button, message, Space, Spin } from "antd";
import React, { useCallback, useEffect, useMemo } from "react";
import { TodosDocument } from "../../graphql/generated";
import { currentUserVar, todosFeedQueryVar } from "../../storage";
import TodoAddForm from "./TodoAddForm";
import TodoOrderByDropDown from "./TodoOrderByDropDown";
import TodosList from "./TodosList";

export const Todos: React.FC = () => {
  const currentUser = useReactiveVar(currentUserVar);
  const [messageApi, contextHolder] = message.useMessage();

  const todosQueryVar = useReactiveVar(todosFeedQueryVar);

  const { loading, error, data, fetchMore } = useQuery(TodosDocument, {
    variables: todosQueryVar,
    notifyOnNetworkStatusChange: true,
    skip: !currentUser,
  });

  useEffect(() => {
    if (error) {
      messageApi.open({
        key: "query-todo-error",
        type: "error",
        content: "Can't load todo!",
        duration: 10,
      });
    }
  }, [error, messageApi]);

  const todosCount = data?.feed?.count || 0;
  const todos = useMemo(() => data?.feed?.todos || [], [data?.feed?.todos]);

  const onLoadMore = useCallback(() => {
    fetchMore({ variables: { skip: todos?.length } });
  }, [fetchMore, todos?.length]);

  const loadMore = useMemo(() => {
    return todos.length < todosCount ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
        }}
      >
        <Button onClick={onLoadMore} loading={loading}>
          More
        </Button>
      </div>
    ) : null;
  }, [todos.length, todosCount, onLoadMore, loading]);

  if (!currentUser) {
    return null;
  }

  return (
    <Space size={20} direction="vertical" style={{ width: "100%" }}>
      {contextHolder}
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <TodoAddForm />
        <TodoOrderByDropDown />
      </Space>

      {loading && !data ? (
        <Space
          align="center"
          size="large"
          style={{ width: "100%" }}
          direction="vertical"
        >
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      ) : (
        <TodosList todos={todos} loadMore={loadMore} />
      )}
    </Space>
  );
};

export default Todos;
