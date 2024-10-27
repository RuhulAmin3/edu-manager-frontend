import { Form } from "antd";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../styles/token";
import { ComponentProps, FC, PropsWithChildren } from "react";

const FormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    color: ${EDU_MANAGER_TOKENS.colors["edu-form-label-color"]};
  }
`;

const CustomFormItem: FC<
  PropsWithChildren<ComponentProps<typeof Form.Item>>
> = (props) => {
  return <FormItem {...props} />;
};

export default CustomFormItem;
