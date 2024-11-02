import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout } from "antd";
import { Outlet } from "react-router-dom";
// import Sidebar from "./components/sidebar";
import SidebarBrand from "./components/sidebar-brand";
import CustomMenu from "./components/menu";
import LayoutHeader from "./components/header";
import { EDU_MANAGER_TOKENS } from "../styles/token";
import styled from "styled-components";
import { useState } from "react";
import Sidebar from "./components/sidebar";

const { Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const CustomLayout = styled(Layout)<{
  contentMarginleft?: number;
  collapsed?: boolean;
}>`
  .ant-layout {
    min-height: 100vh;
    background: ${EDU_MANAGER_TOKENS.colors["edu-body-bg"]} !important;
  }
  .ant-layout-sider {
    background: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
    position: fixed;
    height: 100vh;
  }
  .ant-layout-content,
  .ant-layout-footer,
  .ant-layout-header {
    margin-left: ${(props) => props.contentMarginleft}px !important;
    transition: all 0.4s ease;
    width: calc(100% - ${(props) => props.contentMarginleft}px);
  }
  .ant-layout-content {
    margin-top: 80px !important;
  }
`;

const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [dynamicMargin, setDynamicMargin] = useState<number>(220);

  return (
    <CustomLayout contentMarginleft={dynamicMargin}>
      <Sidebar
        collapsible
        theme="light"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setDynamicMargin={setDynamicMargin}
        trigger={null}
      >
        <SidebarBrand />
        <CustomMenu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          theme="light"
        />
      </Sidebar>
      <Layout>
        <LayoutHeader />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "layout" }]}
          />
          <div>{<Outlet />}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </CustomLayout>
  );
};

export default RootLayout;
