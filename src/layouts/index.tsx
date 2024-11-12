import type { MenuProps } from "antd";
import { Breadcrumb, Layout } from "antd";
import { Outlet } from "react-router-dom";
import SidebarBrand from "./components/sidebar-brand";
import CustomMenu from "./components/menu";
import LayoutHeader from "./components/header";
import { EDU_MANAGER_TOKENS } from "../styles/token";
import styled from "styled-components";
import { useState } from "react";
import Sidebar from "./components/sidebar";
import { FaPeopleArrows } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import { IoMdPeople } from "react-icons/io";
import { GoDot } from "react-icons/go";
import { SiGoogleclassroom } from "react-icons/si";

import { IoBook } from "react-icons/io5";
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
  getItem("Students", "students", <FaPeopleArrows />, [
    getItem("All Student", "all_student", <GoDot />),
    getItem("Student Details", "student_details", <GoDot />),
    getItem("Add New Student", "add_new_student", <GoDot />),
    getItem("Student Promotion", "student_promotion", <GoDot />),
  ]),
  getItem("Teachers", "teachers", <FaPeopleRoof />, [
    getItem("All Teacher", "all_teacher", <GoDot />),
    getItem("Teacher Details", "teacher_details", <GoDot />),
    getItem("Add New Teacher", "add_new_teacher", <GoDot />),
    getItem("payment", "payment", <GoDot />),
  ]),
  getItem("Guardians", "guardians", <IoMdPeople />, [
    getItem("All Guardian", "all_guardians", <GoDot />),
    getItem("Guardian Details", "guardian_details", <GoDot />),
    getItem("Add New Guardian", "add_new_guardian", <GoDot />),
  ]),
  getItem("Subjects", "subjects", <IoBook />),
  getItem("Classes", "classes", <SiGoogleclassroom />),
  getItem("Examination", "examination", <IoMdPeople />, [
    getItem("All Exams", "all_exams", <GoDot />),
    getItem("Exam Details", "exam_details", <GoDot />),
    getItem("Add New Exam", "add_new_exam", <GoDot />),
  ]),
];

const CustomLayout = styled(Layout)<{
  contentmarginleft?: number;
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
    margin-left: ${(props) => props.contentmarginleft}px !important;
    transition: all 0.4s ease;
    width: calc(100% - ${(props) => props.contentmarginleft}px);
    padding-right: 20px;
  }
  .ant-layout-content {
    margin-top: 80px !important;
  }
`;

const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [dynamicMargin, setDynamicMargin] = useState<number>(220);

  return (
    <CustomLayout contentmarginleft={dynamicMargin}>
      <Sidebar
        collapsible
        theme="light"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        setDynamicMargin={setDynamicMargin}
        trigger={null}
      >
        <SidebarBrand />
        <CustomMenu defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sidebar>
      <Layout>
        <LayoutHeader />
        <Content>
          <Breadcrumb
            style={{ margin: "15px 0" }}
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
