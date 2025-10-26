/**
 * Internal Dependencies
*/
import React, { useEffect } from "react";

/**
 * Internal Dependencies
*/
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { ModifiedErrorType } from "~/common/types/response.type";
import CustomModal from "~/components/ui/custom-modal";
import { resetFormInitialValues, resetModalName, } from "~/redux/slice";
import { RootState } from "~/redux/store";
import { useAddClassMutation, useEditClassMutation } from "../class.api";
import { useForm } from "antd/es/form/Form";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import SelectSubjectField from "~/features/subject/components/select-subject-field";

const ClassModal = () => {
  const { modalName, editId, formInitialValues } = useAppSelector(
    (state: RootState) => state.defaultState
  );

  const isEditMode = modalName === MODEL_CONSTANT.EDIT_CLASS;
  const dispatch = useAppDispatch();
  
  // Destructure reset for both mutations
  const [addClass, addClassRes] = useAddClassMutation();
  const [editClass, editClassRes] = useEditClassMutation();
  const [form] = useForm();

  const isError = isEditMode ? editClassRes.isError : addClassRes.isError;
  const isSuccess = isEditMode ? editClassRes.isSuccess : addClassRes.isSuccess;
  const error = isEditMode ? editClassRes.error : addClassRes.error;
  const isLoading = isEditMode ? editClassRes.isLoading : addClassRes.isLoading;

  // Get the appropriate reset function
  const resetMutation = isEditMode ? editClassRes.reset : addClassRes.reset;

  const handleSubmit = (values: Record<string, string>) => {
    // Optional: reset before new submission to clear old state
    resetMutation();
    
    if (isEditMode && editId) {
      editClass({ id: editId, data: values });
    } else {
      addClass(values);
    }
  };

  const afterSubmit = () => {
    dispatch(resetModalName());
    if (isEditMode) {
      dispatch(resetFormInitialValues());
    }
    form.resetFields();
    // Reset mutation state after successful close
    resetMutation();
  };

  const handleCancel = () => {
    dispatch(resetModalName());
    if (isEditMode) {
      dispatch(resetFormInitialValues());
    }
    form.resetFields();
    // 👇 Critical: reset mutation state on cancel
    resetMutation();
  };

  const afterOpenChange = (open: boolean) => {
    if (!open && !isEditMode) {
      form.resetFields();
    } 
  };

  useEffect(() => {
    if (isEditMode && formInitialValues) {
      form.setFieldsValue(formInitialValues);
    }
  }, [isEditMode, formInitialValues, form]);

  useShowToastMessage({
    isError,
    isSuccess,
    error: error as ModifiedErrorType,
    successMessage: isEditMode ? "Class updated successfully" : "Class added successfully",
    cb: afterSubmit
  });

  const isVisible = modalName === MODEL_CONSTANT.ADD_CLASS || modalName === MODEL_CONSTANT.EDIT_CLASS;

  return (
    <CustomModal
      visible={isVisible}
      onSubmit={handleSubmit}
      loading={isLoading}
      initialValues={formInitialValues}
      title={isEditMode ? "Edit Class" : "Add Class"}
      okText={isEditMode ? "Update Class" : "Add Class"}
      onCancel={handleCancel}
      destroyOnClose
      afterOpenChange={afterOpenChange}
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


export default ClassModal;