import { FC, PropsWithChildren } from "react";
import { Form, FormProps as AntFormProps } from "antd";
import styled from "styled-components"; 

const ModifiedForm = styled(Form)``;

const CustomForm: FC<PropsWithChildren<AntFormProps>> = (props) => {
  return <ModifiedForm  {...props} />;
};

export default CustomForm;
