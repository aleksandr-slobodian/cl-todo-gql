import { Button, Checkbox, Input, InputRef, List } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { Todo, UpdateTodoMutationVariables } from "../../graphql/generated";
import { DeleteFilled } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
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
  const inputRef = useRef<InputRef>(null);
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

  const handleIsDoneValChange = useCallback(
    (event: CheckboxChangeEvent) => {
      let isDone = event.target.checked;
      setIsDoneValue(isDone);
      onItemChange(isDone);
    },
    [onItemChange]
  );

  const handleTitleValChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitleValue(event.target.value);
    },
    []
  );

  const [editable, setEditable] = useState(false);
  const handleFocus = useCallback(() => setEditable(true), []);
  const handleBlur = useCallback(() => {
    setEditable(false);
    if (title !== titleValue) {
      onItemChange();
    }
  }, [onItemChange, title, titleValue]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === "Enter" || event.code === "Escape") {
        if (inputRef?.current?.blur) {
          inputRef?.current?.blur();
        }
      }
    },
    []
  );
  return (
    <List.Item
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
      <Checkbox
        checked={isDoneValue}
        onChange={handleIsDoneValChange}
        style={{ marginInlineEnd: 10 }}
      />
      <Input
        ref={inputRef}
        value={titleValue}
        bordered={editable}
        readOnly={!editable}
        onChange={handleTitleValChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          textDecoration: isDoneValue && !editable ? "line-through" : undefined,
        }}
      />
    </List.Item>
  );
};

export default TodoListItem;
