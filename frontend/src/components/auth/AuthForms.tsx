import { useReactiveVar } from "@apollo/client";
import { Tabs, TabsProps } from "antd";
import React from "react";
import { currentUserVar } from "../../storage";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const authTabs: TabsProps["items"] = [
  {
    key: "tab-1",
    label: "Login",
    children: <LoginForm />,
  },
  {
    key: "tab-2",
    label: "Register",
    children: <RegisterForm />,
  },
];

export const AuthForms: React.FC = () => {
  const currentUser = useReactiveVar(currentUserVar);

  if (currentUser) {
    return null;
  }

  return <Tabs centered defaultActiveKey="1" items={authTabs} />;
};

export default AuthForms;
