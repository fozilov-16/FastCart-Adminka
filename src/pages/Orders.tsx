import { Table, Input, Select, Button, Tag, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { userProfile } from "../api/api";

type Order = {
  key: string;
  order: string;
  date: string;
  customer: string;
  paymentStatus: "Paid" | "Pending";
  orderStatus: "Ready" | "Shipped" | "Received";
  total: string;
};

const paymentTag = (status: string) => (
  <Tag className="px-3 py-1 rounded-lg" color={status === "Paid" ? "green" : "default"}>
    {status}
  </Tag>
);

const orderTag = (status: string) => {
  const colors: any = {
    Ready: "orange",
    Shipped: "default",
    Received: "blue",
  };
  return (
    <Tag className="px-3 py-1 rounded-lg" color={colors[status]}>
      {status}
    </Tag>
  );
};

const columns: ColumnsType<Order> = [
  {
    title: <Checkbox />,
    dataIndex: "order",
    render: (text) => (
      <div className="flex items-center gap-3">
        <Checkbox />
        <span className="font-medium text-blue-600">{text}</span>
      </div>
    ),
  },
  { title: "Date", dataIndex: "date" },
  { title: "Customer", dataIndex: "customer" },
  {
    title: "Payment status",
    dataIndex: "paymentStatus",
    render: paymentTag,
  },
  {
    title: "Order Status",
    dataIndex: "orderStatus",
    render: orderTag,
  },
  {
    title: "Total",
    dataIndex: "total",
    align: "right",
  },
];

const Orders = () => {
  const { dataSwagger } = useSelector((state: RootState) => state.todo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userProfile())
  }, [dispatch])

  return (
    <div className="p-6 bg-white rounded-xl">
        { dataSwagger.map((e) => {
          return (
          <div>
            <h1>{e.firstname}</h1>
          </div>
        )
      })}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <Button type="primary" icon={<PlusOutlined />} className="rounded-lg">
          Add order
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Input.Search placeholder="Search..." className="max-w-xs" />
        <Select
          defaultValue="Newest"
          options={[
            { value: "Newest", label: "Newest" },
            { value: "Oldest", label: "Oldest" },
          ]}
          className="w-40"
        />

        <div className="ml-auto flex gap-2">
          <Button icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        className="rounded-xl"
      />
    </div>
  );
};

export default Orders;
