import styled from "styled-components";
import { Layout } from "antd";
import { SiderProps } from "antd";
import { LuArrowRightToLine, LuArrowLeftToLine } from "react-icons/lu";

import { FC, PropsWithChildren, useState } from "react";
import { EDU_MANAGER_TOKENS } from "../../styles/token";

// Styled-component for sidebar with dynamic hover and trigger button positioning
const Sider = styled(Layout.Sider)<{
  triggerposition: number;
}>`
  &.ant-layout-sider {
    background: ${EDU_MANAGER_TOKENS.colors["edu-white"]} !important;
    border-right: 2px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
    .ant-layout-sider-trigger {
      width: 30px !important;
      height: 30px;
      position: absolute;
      top: 20px;
      /* Left position updates dynamically based on sidebar width */
      left: ${(props) => props.triggerposition}px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      color: ${EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]};
      border: 2px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
      border-radius: 7px;
      &:hover {
        color: ${EDU_MANAGER_TOKENS.colors["edu-dark-gray"]};
      }
    }
  }
`;

const Sidebar: FC<PropsWithChildren<SiderProps>> = ({ children, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  const triggerPosition = collapsed ? 75 : 180;

  return (
    <Sider
      {...props}
      collapsible
      collapsed={collapsed}
      triggerposition={triggerPosition}
      trigger={null}
    >
      {/* Custom trigger button */}
      <div
        className="ant-layout-sider-trigger"
        onClick={() => setCollapsed((prev) => !prev)} // Toggle collapsed state on click
      >
        {collapsed ? <LuArrowRightToLine /> : <LuArrowLeftToLine />}{" "}
      </div>
      {children}
    </Sider>
  );
};

export default Sidebar;
