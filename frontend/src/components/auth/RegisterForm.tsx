import { useMutation } from "@apollo/client";
import { Button, Form, Input, message } from "antd";
import React, { useCallback, useEffect } from "react";
import {
  SignupDocument,
  SignupMutationVariables,
} from "../../graphql/generated";
import { currentUserVar } from "../../storage";

export const RegisterForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [signup, { data, loading, error }] = useMutation(SignupDocument);

  const onFinish = useCallback(
    (values: SignupMutationVariables) => {
      signup({ variables: values });
    },
    [signup]
  );

  useEffect(() => {
    const { token, user } = data?.signup || {};
    if (token && user) {
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", JSON.stringify(user));
      currentUserVar(user);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      messageApi.open({
        key: "signup-error",
        type: "error",
        content: "Something wrong!",
        duration: 10,
      });
      form.setFieldsValue({ password: "" });
    }
  }, [error, form, messageApi]);

  return (
    <Form
      name="signup"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 3, message: "Name must be at least 3 characters" },
          { max: 50, message: "Name cannot be longer than 50 characters" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: "email", message: "Please input valid e-mail!" },
          { required: true, message: "Please input your e-mail" },
        ]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
