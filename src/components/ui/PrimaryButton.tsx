import { Button, ButtonProps as AntButtonProps } from "antd";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { FC, PropsWithChildren } from "react";

const CustomButton = styled(Button)`
  &.ant-btn-primary {
    background: ${EDU_MANAGER_TOKENS.colors["edu-primary"]};
    box-shadow: 0 1px 2px 0 rgba(34, 197, 94, 0.35) !important;
    &:hover {
      background: ${EDU_MANAGER_TOKENS.colors[
        "edu-primary-hover-color"
      ]} !important;
      box-shadow: none !important;
    }
  }
`;

const PrimaryButton: FC<PropsWithChildren<AntButtonProps>> = (props) => {
  return <CustomButton {...props} />;
};

export default PrimaryButton;
