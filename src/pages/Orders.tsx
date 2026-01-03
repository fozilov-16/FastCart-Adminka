import { Table, Input, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userProfile } from "../api/api";
import type { AppDispatch, RootState } from "../store/store";

interface Profile {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

const profileColumns: ColumnsType<Profile> = [
  {
    title: "Username",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (text) => text || "-",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    render: (text) => text || "-",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => text || "-",
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    render: (text) => text || "-",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
    render: (text) => text !== "0001-01-01" ? text : "-",
  },
];

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { profile } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">User Profiles</h1>
        <Button type="primary" icon={<PlusOutlined />} className="rounded-lg">
          Add User
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
        columns={profileColumns}
        dataSource={profile}
        rowKey="userId"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Orders;
