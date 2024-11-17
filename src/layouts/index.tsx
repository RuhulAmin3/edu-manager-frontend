/**
 * External Dependencies
 */
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Layout } from "antd";

/**
 * Internal Dependencies
 */

import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";
import { sidebarItems } from "~/common/constants/sidebarItems"; 
import SidebarBrand from "./components/sidebar-brand";
import LayoutFooter from "./components/footer";
import LayoutHeader from "./components/header";
import { CustomLayout } from "./layout.style";
import CustomMenu from "./components/menu";
import Sidebar from "./components/sidebar";

const { Content } = Layout;

const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [dynamicMargin, setDynamicMargin] = useState<number>(220);
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  return (
    <CustomLayout contentmarginleft={dynamicMargin}>
      <Sidebar
        collapsible
        theme="light"
        style={{
          overflow: "auto",
          scrollbarWidth: "none",
        }}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setDynamicMargin={setDynamicMargin}
        trigger={null}
      >
        <SidebarBrand />
        <CustomMenu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sidebarItems(role)}
        />
      </Sidebar>
      <Layout>
        <LayoutHeader />
        <Content>
          <div>{<Outlet />}</div>
        </Content>
        <LayoutFooter />
      </Layout>
    </CustomLayout>
  );
};

export default RootLayout;
