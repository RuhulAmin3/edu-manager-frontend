import { Input } from "antd";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../styles/token";
import { InputProps as AntInputProps } from "antd";

const TextInput = styled(Input)`
  &.ant-input-outlined {
    border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
    padding: 8px 15px;
    &:focus {
      box-shadow: none;
      border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-primary"]};
    }
  }
`;

const CustomInput = (rest: AntInputProps) => {
  return <TextInput {...rest} />;
};

export default CustomInput;
