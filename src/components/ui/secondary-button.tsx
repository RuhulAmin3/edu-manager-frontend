import { Button, ButtonProps as AntButtonProps } from "antd";
import styled from "styled-components";
import { FC, PropsWithChildren } from "react";
import { EDU_MANAGER_TOKENS } from "../../styles/token";

interface SecondaryButtonProps extends AntButtonProps {
  bgColor?: string;
  bgHoverColor?: string;
  hoverColor?:string;
  textColor?:string;
}

const CustomButton = styled(Button)<{
  bgColor?: string;
  bgHoverColor?: string;
  hoverColor?:string;
  textColor?:string;
}>`
  &.ant-btn-default {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    background: ${(props) =>
      props.bgColor || EDU_MANAGER_TOKENS.colors["edu-white"]};
    color: ${(props) =>
      props.textColor || EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]};
    &:hover {
      border-color: transparent !important;

      background: ${(props) =>
        props.bgHoverColor ||
        EDU_MANAGER_TOKENS.colors["edu-secondary-bg-opacity"]} !important;

      color: ${(props) =>
        props.hoverColor ||
        EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]} !important;
    }
  }
`;

const SecondaryButton: FC<PropsWithChildren<SecondaryButtonProps>> = (
  props
) => {
  return <CustomButton type="default" {...props} />;
};

export default SecondaryButton;
