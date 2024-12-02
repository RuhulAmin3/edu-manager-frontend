import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";

import { EDU_MANAGER_TOKENS } from "../../styles/token";

// Styled component for custom styling
const StyledDatePicker = styled(DatePicker)`
  &.ant-picker {
    border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
    transition: border-color 0.3s ease;
    width: 100%;

    &:hover {
      border-color: ${EDU_MANAGER_TOKENS.colors["edu-border-color"]} !important;
    }

    &:focus-visible,
    &:focus-within {
      box-shadow: none !important;
      border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-primary"]} !important;
    }
  }

  &.ant-picker-status-error {
    .ant-picker {
      border: 1px solid
        ${EDU_MANAGER_TOKENS.colors["edu-form-invalid-border-color"]} !important;

      &:focus {
        box-shadow: none !important;
      }
    }
  }
`;
const CustomDatePicker: FC<ComponentProps<typeof DatePicker>> = ({
  ...props
}) => {
  // Explicitly type props to fix type error with ref
  return <StyledDatePicker {...(props as ComponentProps<typeof StyledDatePicker>)} />;
};

export default CustomDatePicker;
