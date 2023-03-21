import React, { useCallback } from "react";
import {
  DownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useReactiveVar } from "@apollo/client";
import { todosFeedQueryVar } from "../../storage";

const items: MenuProps["items"] = [
  {
    key: "updatedAt-asc",
    label: "Oldest first",
    icon: <SortAscendingOutlined />,
  },
  {
    key: "updatedAt-desc",
    label: "Newest first",
    icon: <SortDescendingOutlined />,
  },
  {
    key: "title-asc",
    label: "Title [a-z]",
    icon: <SortAscendingOutlined />,
  },
  {
    key: "title-desc",
    label: "Title [z-a]",
    icon: <SortDescendingOutlined />,
  },
  {
    key: "isDone-desc",
    label: "Done first",
    icon: <SortAscendingOutlined />,
  },
  {
    key: "isDone-asc",
    label: "Not done first",
    icon: <SortDescendingOutlined />,
  },
];

export const TodoOrderByDropDown: React.FC = () => {
  const todosFeedQueryOptions = useReactiveVar(todosFeedQueryVar);

  const onItemClick = useCallback(
    ({ key }: { key: string }) => {
      const orderBy = key.split("-") as [string, string];
      todosFeedQueryVar({
        ...todosFeedQueryOptions,
        orderBy: [Object.fromEntries(new Map([orderBy]))],
      });
    },
    [todosFeedQueryOptions]
  );

  return (
    <Dropdown
      menu={{
        items,
        onClick: onItemClick,
        selectable: true,
        defaultSelectedKeys: ["updatedAt-desc"],
      }}
    >
      <Button>
        <Space>
          <SortAscendingOutlined />
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default TodoOrderByDropDown;
