import { Divider, Flex, FormProps } from "antd";
import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";
import { FC, PropsWithChildren } from "react";
import CustomForm from "../form/custom-form";
import NormalText from "./normal-text";
import { useForm } from "antd/es/form/Form";

interface ExtendFromProps extends FormProps {
  cb: (value: Record<string, string>) => void;
}

const DefaultFilterBox: FC<PropsWithChildren<ExtendFromProps>> = ({
  children,
  cb,
  ...props
}) => {
  const [form] = useForm();
  const handleFinish = (query: Record<string, string>) => {
    cb(query);
    form.resetFields();
  };
  return (
    <CustomForm form={form} onFinish={handleFinish} {...props}>
      <NormalText textType="middle">Filter</NormalText>
      <Divider style={{ margin: "15px 0px" }} />
      {children}
      <Divider style={{ margin: "15px 0px" }} />
      <Flex justify="flex-end" gap={8}>
        <SecondaryButton htmlType="reset">Reset</SecondaryButton>
        <PrimaryButton type="primary" htmlType="submit">
          Apply
        </PrimaryButton>
      </Flex>
    </CustomForm>
  );
};

export default DefaultFilterBox;
