import { useMutation } from "@apollo/client";
import { Empty, List, Modal, Typography } from "antd";
import React, { useCallback, useState } from "react";
import {
  DeleteTodoDocument,
  Todo,
  TodoFeed,
  UpdateTodoDocument,
  UpdateTodoMutationVariables,
} from "../../graphql/generated";
import TodoListItem from "./TodoListItem";

const { Text } = Typography;

interface TodosListProps {
  todos?: Todo[];
  loadMore?: React.ReactNode;
}

export const TodosList: React.FC<TodosListProps> = ({ todos, loadMore }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState<number>();

  const [updateTodo] = useMutation(UpdateTodoDocument);
  const [deleteTodo, { loading: deleteLoading }] = useMutation(
    DeleteTodoDocument,
    {
      //refetchQueries: ["Todos"],
      optimisticResponse(vars) {
        return {
          deleteTodo: {
            __typename: "Todo" as const,
            id: vars.todoId,
            title: `${vars.todoId}`,
          },
        };
      },
      update(cache, { data }) {
        if (!data?.deleteTodo) {
          return;
        }
        const deletedTodo = cache.identify(data.deleteTodo);
        cache.modify({
          fields: {
            feed(existing: TodoFeed) {
              const todo = existing.todos.filter(
                (todo) => cache.identify(todo) !== deletedTodo
              );
              return {
                ...existing,
                todo,
                count: existing?.count ? existing.count - 1 : 0,
              };
            },
          },
        });
        cache.evict({ id: deletedTodo });
      },
    }
  );

  const handleDelete = useCallback((id: number) => {
    setDialogOpen(true);
    setDeleteTodoId(id);
  }, []);

  const handleDialogCancel = useCallback(() => {
    setDialogOpen(false);
    setDeleteTodoId(undefined);
  }, []);

  const handleDeleteOk = useCallback(async () => {
    if (!deleteTodoId) {
      return;
    }
    await deleteTodo({ variables: { todoId: deleteTodoId } });
    handleDialogCancel();
  }, [deleteTodo, deleteTodoId, handleDialogCancel]);

  const handleChange = useCallback(
    (totdo: UpdateTodoMutationVariables) => {
      updateTodo({ variables: totdo });
    },
    [updateTodo]
  );

  if (!todos?.length) {
    return <Empty />;
  }
  return (
    <>
      <List loadMore={loadMore}>
        {todos.map((todo, index) => (
          <TodoListItem
            key={`td-itm-${todo.id}-${index}`}
            todo={todo}
            onDelete={handleDelete}
            onChange={handleChange}
          />
        ))}
      </List>
      <Modal
        title="Deletion"
        open={dialogOpen}
        onOk={handleDeleteOk}
        confirmLoading={deleteLoading}
        onCancel={handleDialogCancel}
      >
        <Text>Are you sure to want to delete todo?</Text>
      </Modal>
    </>
  );
};

export default TodosList;
