import styled from "styled-components";
import { Layout } from "antd";
import { SiderProps } from "antd";
import { LuArrowRightToLine, LuArrowLeftToLine } from "react-icons/lu";

import { FC, PropsWithChildren, useState } from "react";
import { EDU_MANAGER_TOKENS } from "../../styles/token";

// Styled-component for sidebar with dynamic hover and trigger button positioning
const Sider = styled(Layout.Sider)<{
  triggerposition: number;
  ishovered: boolean;
}>`
  position: ${(props) => (props.ishovered ? "fixed" : "relative")};
  left: 0;
  height: 100vh;
  transition: all 0.3s ease;

  &.ant-layout-sider {
    background: ${EDU_MANAGER_TOKENS.colors["edu-white"]} !important;
    border-right: 2px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
    box-shadow: ${EDU_MANAGER_TOKENS.shadow["edu-card-shadow"]};
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

     &:hover {
    ${(props) =>
      props.ishovered &&
      `
      width: 200px !important;
      max-width: 200px !important;
      min-width: 200px !important;
      z-index: 1000;
    `}

  }
`;

const Sidebar: FC<PropsWithChildren<SiderProps>> = ({ children, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [triggerCollapsed, setTriggerCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const triggerPosition = collapsed ? 60 : 180;

  return (
    <Sider
      {...props}
      collapsible
      collapsed={collapsed}
      ishovered={isHovered}
      triggerposition={triggerPosition}
      trigger={null}
      onMouseEnter={() => {
        if (triggerCollapsed) {
          setCollapsed(false);
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (triggerCollapsed) {
          setCollapsed(true);
          setIsHovered(false);
        }
      }}
    >
      {/* Custom trigger button */}
      <div
        className="ant-layout-sider-trigger"
        onClick={() => {
          setIsHovered((prev) => !prev);
          setTriggerCollapsed((prev) => !prev);
        }}
      >
        {triggerCollapsed ? <LuArrowRightToLine /> : <LuArrowLeftToLine />}{" "}
      </div>
      {children}
    </Sider>
  );
};

export default Sidebar;
