import { Dropdown, DropDownProps } from "antd";
import { FC, ReactNode } from "react";
import styled from "styled-components";

const StyledDropdown = styled(Dropdown)``;

interface CustomDropdownProps extends DropDownProps {
  children: ReactNode;
}

const CustomDropdown: FC<CustomDropdownProps> = (props) => {
  return <StyledDropdown {...props} />;
};

export default CustomDropdown;
