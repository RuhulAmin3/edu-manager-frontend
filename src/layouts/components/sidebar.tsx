/* eslint-disable @typescript-eslint/no-unused-expressions */
import { SiderProps } from "antd/es/layout/Sider";
import { FC, PropsWithChildren, useEffect } from "react";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu"; 
import { Dispatch, SetStateAction } from "react";
import { CustomSider } from "../layout.style";

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
