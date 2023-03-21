import { useApolloClient, useReactiveVar } from "@apollo/client";
import { Button } from "antd";
import React, { useCallback } from "react";
import { currentUserVar } from "../../storage";

export const LogoutButton: React.FC = () => {
  const client = useApolloClient();
  const handleClick = useCallback(() => {
    client.resetStore();
    currentUserVar(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
  }, [client]);

  const currentUser = useReactiveVar(currentUserVar);
  if (!currentUser) {
    return null;
  }

  return <Button onClick={handleClick}>Logout</Button>;
};

export default LogoutButton;
