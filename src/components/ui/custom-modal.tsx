import React, { FC, PropsWithChildren } from "react";
import { Modal, Button, Form, ModalProps, Divider } from "antd";
import PrimaryButton from "./primary-button";
import LoadingSpin from "./loading-spin";

interface CustomModalProps extends ModalProps {
  visible: boolean;
  title: string;
  onCancel: () => void;
  onSubmit: (values: Record<string, string>) => void;
  okText?: string;
  cancelText?: string;
  loading?: boolean;
  initialValues?: Record<string, string>;
}

const CustomModal: FC<PropsWithChildren<CustomModalProps>> = ({
  visible,
  title,
  onCancel,
  onSubmit,
  children,
  okText = "Submit",
  cancelText = "Cancel",
  initialValues,
  loading = false,
  ...props
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };
  
  return (
    <Modal
      {...props} 
      open={visible}
      title={
        <>
          {title}
          <Divider style={{ margin: "15px 0px" }} />
        </>
      }
      onCancel={onCancel}
      centered
      destroyOnClose
      footer={[
        <Divider style={{ margin: "15px 0px" }} />,
        <Button key="cancel" onClick={onCancel}>
          {cancelText}
        </Button>,
        <PrimaryButton key="submit" onClick={handleOk} disabled={loading} htmlType="submit">
          {loading && <LoadingSpin fontSize={12} color="white" size="small" />}{" "}
          {okText}
        </PrimaryButton>,
      ]}
    >
      <Form
        form={form}
        initialValues={initialValues}
        preserve={false}
        layout="vertical"
      >
        {children}
      </Form>
    </Modal>
  );
};

export default CustomModal;
