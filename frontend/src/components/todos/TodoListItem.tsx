import { Button, Checkbox, List, Typography } from "antd";
import React, { useCallback, useState } from "react";
import { Todo, UpdateTodoMutationVariables } from "../../graphql/generated";
import { DeleteFilled } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useUpdateEffect } from "react-use";
const { Text } = Typography;
interface TodoListItemProps {
  todo: Todo;
  onDelete?: (id: number) => void;
  onChange?: (todo: UpdateTodoMutationVariables) => void;
}

type IsDone = UpdateTodoMutationVariables["isDone"];
type Title = UpdateTodoMutationVariables["title"];

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onDelete,
  onChange,
}) => {
  const { title, id, isDone } = todo;
  const [isDoneValue, setIsDoneValue] = useState<IsDone>(isDone as IsDone);
  const [titleValue, setTitleValue] = useState<Title>(title as Title);

  const onItemChange = useCallback(
    (isDone?: boolean) => {
      onChange &&
        onChange({
          todoId: id,
          title: titleValue,
          isDone: isDone !== undefined ? isDone : isDoneValue,
        });
    },
    [id, isDoneValue, onChange, titleValue]
  );

  const onTitleChange = useCallback((value: string) => {
    if (!value) {
      return;
    }
    setTitleValue(value);
  }, []);

  useUpdateEffect(() => {
    onItemChange();
  }, [titleValue]);

  const handleIsDoneValChange = useCallback(
    (event: CheckboxChangeEvent) => {
      let isDone = event.target.checked;
      setIsDoneValue(isDone);
      onItemChange(isDone);
    },
    [onItemChange]
  );

  return (
    <List.Item
      style={{ gap: 20 }}
      actions={[
        <Button
          onClick={() => onDelete && onDelete(id)}
          type="text"
          size="small"
        >
          <DeleteFilled />
        </Button>,
      ]}
    >
      <Checkbox checked={isDoneValue} onChange={handleIsDoneValChange} />
      <div style={{ flexGrow: 1 }}>
        <Text
          style={{
            marginBottom: 0,
            textDecoration: isDoneValue ? "line-through" : undefined,
          }}
          editable={{
            onChange: onTitleChange,
          }}
        >
          {titleValue}
        </Text>
      </div>
    </List.Item>
  );
};

export default TodoListItem;
