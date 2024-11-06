import { Select, SelectProps as AntSelectProps } from "antd";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { FC } from "react";

const StyledSelect = styled(Select)`
  .ant-select-outlined {
    outline: none !important;
  }
  .ant-select-selector {
    border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
    transition: border-color 0.3s ease;

    &:hover {
      border-color: ${EDU_MANAGER_TOKENS.colors["edu-border-color"]} !important;
      outline: none !important;
    }

    &:focus-visible,
    &:focus-within {
      box-shadow: none !important;
      border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-primary"]} !important;
      outline: none !important;
    }
  }

  &.ant-select-status-error .ant-select-selector {
    border: 1px solid
      ${EDU_MANAGER_TOKENS.colors["edu-form-invalid-border-color"]} !important;

    &:focus {
      box-shadow: none !important;
    }
  }
`;

const CustomSelect: FC<AntSelectProps> = ({ ...rest }) => {
  return <StyledSelect {...rest} />;
};

export default CustomSelect;
