import { Input } from "antd";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { InputProps as AntInputProps } from "antd";
import { FC } from "react";

interface CustomInputProps extends AntInputProps {
  isPassword?: boolean;
  padding?:string
}

const StyledInput = styled(Input)<CustomInputProps>`
  &.ant-input-outlined {
    border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
    padding: ${(props)=>props.padding ? props.padding: "8px 15px"};
    &:focus {
      box-shadow: none;
      border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-primary"]};
    }
  }

  &.ant-input-status-error {
    border: 1px solid
      ${EDU_MANAGER_TOKENS.colors["edu-form-invalid-border-color"]} !important;
    &:focus {
      box-shadow: none !important;
    }
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  &.ant-input-password {
    border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]} !important;
    padding: 8px 15px;

    &:focus-within {
      box-shadow: none;
      border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-primary"]} !important;
    }
  }

  &.ant-input-status-error {
    border: 1px solid
      ${EDU_MANAGER_TOKENS.colors["edu-form-invalid-border-color"]} !important;

    &:focus-within {
      box-shadow: none !important;
    }
  }
`;

const CustomInput: FC<CustomInputProps> = ({ isPassword, ...rest }) => {
  return isPassword ? (
    <StyledPasswordInput {...rest} />
  ) : (
    <StyledInput {...rest} />
  );
};

export default CustomInput;
