/* eslint-disable @typescript-eslint/no-unused-expressions */
import Sider, { SiderProps } from "antd/es/layout/Sider";
import { FC, PropsWithChildren, useEffect } from "react";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { Dispatch, SetStateAction } from "react";

const CustomSider = styled(Sider)<{
  triggerposition: number;
}>`
  .ant-layout-sider-trigger {
    width: 30px !important;
    height: 30px;
    position: absolute;
    top: 25px;
    left: ${(props) => props.triggerposition}px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    color: ${EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]};
    border: 2px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
    border-radius: 7px;

    // Smooth color and border transition for the trigger button
    transition: all 0.6s ease;
    &:hover {
      color: ${EDU_MANAGER_TOKENS.colors["edu-dark-gray"]};
    }
  }
`;

interface CustomSiderProps extends SiderProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setDynamicMargin: Dispatch<SetStateAction<number>>;
}

const Sidebar: FC<PropsWithChildren<CustomSiderProps>> = ({
  collapsed,
  setCollapsed,
  setDynamicMargin,
  children,
  ...props
}) => {
  const triggerPosition = collapsed ? 70 : 255;
  // const isMobile = useScreenSize();
  useEffect(() => {
    collapsed ? setDynamicMargin(100) : setDynamicMargin(290);
  }, [collapsed, setDynamicMargin]);
  return (
    <CustomSider
      width={270}
      {...props}
      triggerposition={triggerPosition}
      collapsed={collapsed}
    >
      <div
        className="ant-layout-sider-trigger"
        onClick={() => {
          setCollapsed((prev: boolean) => !prev);
        }}
      >
        {collapsed ? <LuArrowRightToLine /> : <LuArrowLeftToLine />}
      </div>
      {children}
    </CustomSider>
  );
};

export default Sidebar;
