import React, { PropsWithChildren } from "react";
import { Layout, Space, Typography } from "antd";
import styles from "../../app.module.css";
import LogoutButton from "../auth/LogoutButton";
import { currentUserVar } from "../../storage";
import { useReactiveVar } from "@apollo/client";
import TodoSearch from "../todos/TodoSearch";
const { Header, Footer, Content } = Layout;

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const currentUser = useReactiveVar(currentUserVar);

  return (
    <Layout>
      <Header className={styles.header}>
        <Typography.Text className={styles.appName}>
          Todo List App
        </Typography.Text>

        <TodoSearch />
      </Header>
      <Content className={styles.content}>
        <Space size={20} direction="vertical" style={{ width: "100%" }}>
          {children}
        </Space>
      </Content>
      <Footer className={styles.footer}>
        <Space>
          {currentUser ? `Welcome, ${currentUser.name}` : null}
          <LogoutButton />
        </Space>
      </Footer>
    </Layout>
  );
};

export default AppLayout;
