import { Dropdown, DropdownProps, Flex, MenuProps } from "antd"; 
import React, { FC, PropsWithChildren, ReactNode } from "react";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

interface CustomDropdownProps extends DropdownProps {
  items: MenuProps["items"];
}

const CustomDropdown: FC<PropsWithChildren<CustomDropdownProps>> = ({
  children,
  items,
  ...props
}) => {

  const menuProps = { items };

  const contentStyle = {
    backgroundColor: EDU_MANAGER_TOKENS.colors["edu-white"],
    borderRadius: EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-sm"],
    boxShadow: EDU_MANAGER_TOKENS.shadow["edu-filter-box-shadow"],
  };

  const menuStyle = {
    boxShadow:"none"
  }

  return (
    <Dropdown
      menu={menuProps}
      {...props}
      trigger={["click"]}
      dropdownRender={(menu: ReactNode) => {
        return (
          <Flex
            gap={5}
            vertical
            style={{ padding: "10px", ...contentStyle }}
          >
            {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          </Flex>
        );
      }}
    >
      <span>{children}</span> 
    </Dropdown>
  );
};

export default CustomDropdown;
