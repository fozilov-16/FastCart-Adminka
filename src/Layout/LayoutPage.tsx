import { Layout, Menu, Input, Avatar, Dropdown, Space, Badge } from "antd"
import { HomeOutlined, ShoppingCartOutlined, AppstoreOutlined, PlusOutlined, BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons"
import { Outlet, useNavigate } from "react-router-dom"

const { Header, Content, Footer, Sider } = Layout

const LayoutPage: React.FC = () => {
  const navigate = useNavigate()

  const items = [
    { key: "/dashboard", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "/orders", icon: <ShoppingCartOutlined />, label: "Orders" },
    { key: "/products", icon: <AppstoreOutlined />, label: "Products" },
    { key: "/others", icon: <PlusOutlined />, label: "Others" }
  ]

  
  const userMenu = {
    items: [
      { key: "login", label: "Login" },
      { key: "logout", label: "Logout" }
    ],
    onClick: ({ key }) => {
      if (key === "logout") {
        console.log("Logging out...")
      } else if (key === "login") {
        navigate("/login")
      }
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div style={{ color: "white", padding: 16, fontWeight: "bold" }}>
          ADMIN PANEL
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Header className="!bg-white px-6 flex items-center justify-between shadow-sm">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="max-w-xs"
          />

          <Space size="large">
            <Badge count={4}>
              <BellOutlined className="text-xl text-gray-600" />
            </Badge>

            <Dropdown menu={userMenu}>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <span className="font-medium text-gray-700">Admin</span>
              </div>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Admin © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
