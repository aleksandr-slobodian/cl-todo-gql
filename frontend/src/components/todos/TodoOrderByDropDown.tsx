import React, { useCallback, useMemo } from "react";
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
    key: "isDone-asc",
    label: "Not done first",
    icon: <SortAscendingOutlined />,
  },
  {
    key: "isDone-desc",
    label: "Done first",
    icon: <SortDescendingOutlined />,
  },
];

export const TodoOrderByDropDown: React.FC = () => {
  const todosFeedQueryOptions = useReactiveVar(todosFeedQueryVar);

  const sortByOpt = useMemo(() => {
    const orderBy = todosFeedQueryOptions.orderBy;
    if (orderBy && Array.isArray(orderBy) && orderBy.length) {
      return Object.entries(orderBy[0])[0].join("-");
    }
    return "updatedAt-desc";
  }, [todosFeedQueryOptions.orderBy]);

  const onItemClick = useCallback(
    ({ key }: { key: string }) => {
      const values = key.split("-") as [string, string];
      const sortBy = Object.fromEntries(new Map([values]));
      const newOrderByOptions = {
        ...todosFeedQueryOptions,
        orderBy: [sortBy],
      };
      window.localStorage.setItem("todosFeedSortBy", JSON.stringify(sortBy));
      todosFeedQueryVar(newOrderByOptions);
    },
    [todosFeedQueryOptions]
  );

  return (
    <Dropdown
      menu={{
        items,
        onClick: onItemClick,
        selectable: true,
        defaultSelectedKeys: [sortByOpt],
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
