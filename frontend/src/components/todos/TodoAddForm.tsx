import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, message } from "antd";
import React, { useCallback, useEffect } from "react";
import {
  AddTodoDocument,
  AddTodoMutationVariables,
  NewTodoFragmentDoc,
} from "../../graphql/generated";

export const TodoAddForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [addTodo, { loading, error }] = useMutation(AddTodoDocument, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          feed(existing) {
            const newTodoRef = cache.writeFragment({
              data: data?.addTodo,
              fragment: NewTodoFragmentDoc,
            });
            return {
              ...existing,
              todos: [newTodoRef, ...(existing.todos || [])],
            };
          },
        },
      });
    },
  });

  const onFinish = useCallback(
    async (values: AddTodoMutationVariables) => {
      await addTodo({ variables: values });
      form.resetFields();
    },
    [addTodo, form]
  );

  useEffect(() => {
    if (error) {
      messageApi.open({
        key: "add-todo-error",
        type: "error",
        content: "Can't add todo!",
        duration: 10,
      });
    }
  }, [error, messageApi]);

  return (
    <>
      {contextHolder}

      <Form
        form={form}
        name="todo-add"
        layout="inline"
        onFinish={onFinish}
        autoComplete="off"
        style={{ gap: "10px 0" }}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input your todo!" }]}
        >
          <Input placeholder="Write new todo" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={loading}
          >
            Create Todo
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TodoAddForm;
