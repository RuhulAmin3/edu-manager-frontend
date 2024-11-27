
import { Input } from "antd";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { TextAreaProps as AntTextAreaProps } from "antd/es/input";
import { FC } from "react";

// Define interface extending Ant Design's TextAreaProps
interface CustomTextareaProps extends AntTextAreaProps {
  padding?: string;
}

// Styled TextArea component
const StyledTextarea = styled(Input.TextArea)<CustomTextareaProps>`
  &.ant-input {
    border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
    padding: ${(props) => (props.padding ? props.padding : "8px 15px")};
    /* resize: ${(props) => (props.resize ? props.resize : "none")}; */
    transition: border-color 0.3s ease;

    &:focus {
      box-shadow: none;
      border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-primary"]};
    }
  }

  &.ant-input-status-error {
    border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-form-invalid-border-color"]} !important;

    &:focus {
      box-shadow: none !important;
    }
  }
`;

const CustomTextarea: FC<CustomTextareaProps> = ({ ...rest }) => {
  return <StyledTextarea {...rest} />;
};

export default CustomTextarea;
