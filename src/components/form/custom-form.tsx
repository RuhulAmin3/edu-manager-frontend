import { FC, PropsWithChildren } from "react";
import { Form, FormProps as AntFormProps } from "antd";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";

const ModifiedForm = styled(Form)`
  &.ant-form {
    .ant-form-item-label > label.ant-form-item-required::before {
      color: red;
    }
    .ant-form-item-explain-error {
      color: ${EDU_MANAGER_TOKENS.colors["edu-form-invalid-border-color"]};
    }
  }
`;

const CustomForm: FC<PropsWithChildren<AntFormProps>> = (props) => {
  return <ModifiedForm {...props} />;
};

export default CustomForm;
