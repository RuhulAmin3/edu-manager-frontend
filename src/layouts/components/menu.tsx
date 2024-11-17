import { Menu, MenuProps } from "antd";
import styled from "styled-components";
import { FC } from "react";

const ModifiedMenu = styled(Menu)`
  &.ant-menu {
    border: none !important; 
  }
`;

const CustomMenu: FC<MenuProps> = (props) => {
  return <ModifiedMenu {...props} />;
};

export default CustomMenu;
