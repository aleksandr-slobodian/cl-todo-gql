import { Button, Form, Input, message } from "antd";
import React, { useCallback, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { currentUserVar } from "../../storage";
import { LoginDocument, LoginMutationVariables } from "../../graphql/generated";

export const LoginForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [login, { data, loading, error }] = useMutation(LoginDocument);

  const onFinish = useCallback(
    (values: LoginMutationVariables) => {
      login({ variables: values });
    },
    [login]
  );

  useEffect(() => {
    const { token, user } = data?.login || {};
    if (token && user) {
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", JSON.stringify(user));
      currentUserVar(user);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      messageApi.open({
        key: "login-error",
        type: "error",
        content: "Something wrong!",
        duration: 10,
      });
      form.setFieldsValue({ password: "" });
    }
  }, [error, form, messageApi]);

  return (
    <Form
      name="login"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {contextHolder}
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

export default LoginForm;
