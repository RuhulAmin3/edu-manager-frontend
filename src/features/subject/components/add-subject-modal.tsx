import React from "react";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import CustomModal from "~/components/ui/custom-modal";
import { useAddSubjectMutation } from "../subject.api";
import { useForm } from "antd/es/form/Form";
import { ModifiedErrorType } from "~/common/types/response.type";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import { RootState } from "~/redux/store";
import { resetModalName } from "~/redux/slice";

const AddSubjectModal = () => {
  const modalName = useAppSelector(
    (state: RootState) => state.defaultState.modalName
  );
  
  const dispatch = useAppDispatch();
  const [addSubject, {isError, isSuccess, error, isLoading}] = useAddSubjectMutation();
  const [form] = useForm();
  const handleSubmit = (values: Record<string, string>) => {
    addSubject(values);
  };

  const afterSubmit = () => {
    dispatch(resetModalName());
    form.resetFields();
  };

  useShowToastMessage({
    isError: isError,
    isSuccess:isSuccess,
    error:error as ModifiedErrorType,
    successMessage: "Subject Added successfully",
   cb: afterSubmit
  })

  return (
    <CustomModal
      visible={MODEL_CONSTANT.ADD_SUBJECT == modalName}
      onSubmit={handleSubmit}
      loading={isLoading}
      title="Add Subject"
      okText="Add Subject"
      onCancel={() => dispatch(resetModalName())}
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
