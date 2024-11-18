import React, { FC } from "react";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import CustomModal from "~/components/ui/custom-modal";
import { useAddSubjectMutation } from "./subject.api";
import { useForm } from "antd/es/form/Form";
import { ModifiedErrorType } from "~/common/types/response.type";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";

const AddSubjectModal: FC<{ open: boolean; setOpen: (x: boolean) => void }> = ({
  open,
  setOpen,
}) => {
  const [addSubject, result] = useAddSubjectMutation();
  const [form] = useForm();

  const handleSubmit = (values: Record<string, string>) => {
    addSubject(values);
  };

  const afterSubmit = () => {
    setOpen(false);
    form.resetFields();
  };

  useShowToastMessage(
    result.isError,
    result.isSuccess,
    result.error as ModifiedErrorType,
    "Subject Added successfully",
    afterSubmit
  );

  return (
    <CustomModal
      onSubmit={handleSubmit}
      loading={result.isLoading}
      visible={open}
      title="Add Subject"
      onCancel={() => setOpen(false)}
    >
      <CustomFormItem
        label="Title"
        layout="vertical"
        name="title"
        rules={[{ required: true }]}
      >
        <CustomInput placeholder={"Enter Title"} size="large" />
      </CustomFormItem>

      <CustomFormItem
        label="Code"
        layout="vertical"
        name="code"
        rules={[{ required: true }]}
      >
        <CustomInput placeholder={"Enter subject code"} size="large" />
      </CustomFormItem>
    </CustomModal>
  );
};

export default AddSubjectModal;
