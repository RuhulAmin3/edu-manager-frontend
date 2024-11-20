
/**
 * Internal Dependencies
*/
import { useForm } from "antd/es/form/Form";
import React from "react";

/**
 * Internal Dependencies
*/
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { ModifiedErrorType } from "~/common/types/response.type";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import CustomModal from "~/components/ui/custom-modal"; 
import { resetModalName } from "~/redux/slice";
import { RootState } from "~/redux/store";
import { useAddClassMutation } from "../class.api";
import SelectSubjectField from "~/features/subject/components/select-subject-field";

const AddClassModal = () => {
  const modalName = useAppSelector(
    (state: RootState) => state.defaultState.modalName
  );
  
  const dispatch = useAppDispatch();
  const [addClass, {isError, isSuccess, error, isLoading}] = useAddClassMutation();
  const [form] = useForm();
  const handleSubmit = (values: Record<string, string>) => { 
    addClass(values);

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
      visible={MODEL_CONSTANT.ADD_CLASS == modalName}
      onSubmit={handleSubmit}
      loading={isLoading}
      title="Add Class"
      okText="Add Class"
      onCancel={() => dispatch(resetModalName())}
    >
      <CustomFormItem
        label="Class Name"
        layout="vertical"
        name="className"
        rules={[{ required: true }]}
      >
        <CustomInput placeholder={"Enter Class Name"} size="large" />
      </CustomFormItem> 
      <CustomFormItem
        label="Subjects"
        layout="vertical"
        name="subjectIds"
        rules={[{ required: true }]}
      >
        <SelectSubjectField mode="multiple" size="large" />
      </CustomFormItem>
    </CustomModal>
  );
};

export default AddClassModal;
