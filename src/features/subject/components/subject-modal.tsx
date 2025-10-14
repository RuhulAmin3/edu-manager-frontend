/**
 * Internal Dependencies
 */
import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";

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
import {
  useAddSubjectMutation,
  useEditSubjectMutation,
} from "../subject.api";
import {
  resetModalName,
  resetFormInitialValues,
  resetEditId,
} from "~/redux/slice";
import { RootState } from "~/redux/store";

const SubjectModal = () => {
  const { modalName, editId, formInitialValues } = useAppSelector(
    (state: RootState) => state.defaultState
  );

  const isEditMode = modalName === MODEL_CONSTANT.EDIT_SUBJECT;
  const dispatch = useAppDispatch();
  const [form] = useForm();

  // 🧭 Mutations
  const [addSubject, addRes] = useAddSubjectMutation();
  const [editSubject, editRes] = useEditSubjectMutation();

  const isError = isEditMode ? editRes.isError : addRes.isError;
  const isSuccess = isEditMode ? editRes.isSuccess : addRes.isSuccess;
  const error = isEditMode ? editRes.error : addRes.error;
  const isLoading = isEditMode ? editRes.isLoading : addRes.isLoading;

  const resetMutation = isEditMode ? editRes.reset : addRes.reset;

  // 📌 Submit handler
  const handleSubmit = (values: Record<string, any>) => {
    // Optional: reset previous mutation state before new submission
    resetMutation();

    if (isEditMode && editId) {
      editSubject({ id: editId, data: values });
    } else {
      addSubject(values);
    }
  };

  // 🧹 Cleanup after submit
  const afterSubmit = () => {
    dispatch(resetModalName());
    if (isEditMode) {
      dispatch(resetEditId());
      dispatch(resetFormInitialValues());
    }
    form.resetFields();
    resetMutation();
  };

  // ❌ Handle cancel
  const handleCancel = () => {
    dispatch(resetModalName());
    if (isEditMode) {
      dispatch(resetEditId());
      dispatch(resetFormInitialValues());
    }
    form.resetFields();
    resetMutation();
  };

  // 🧭 Reset form when modal closes (especially on Add mode)
  const afterOpenChange = (open: boolean) => {
    if (!open && !isEditMode) {
      form.resetFields();
    }
  };

  // ✍️ Set initial form values on edit
  useEffect(() => {
    if (isEditMode && formInitialValues) {
      form.setFieldsValue(formInitialValues);
    }
  }, [isEditMode, formInitialValues, form]);

  // ✅ Toast messages
  useShowToastMessage({
    isError,
    isSuccess,
    error: error as ModifiedErrorType,
    successMessage: isEditMode
      ? "Subject updated successfully"
      : "Subject added successfully",
    cb: afterSubmit,
  });

  const isVisible =
    modalName === MODEL_CONSTANT.ADD_SUBJECT ||
    modalName === MODEL_CONSTANT.EDIT_SUBJECT;
    
  return (
    <CustomModal
      visible={isVisible}
      onSubmit={handleSubmit}
      loading={isLoading}
      initialValues={formInitialValues}
      title={isEditMode ? "Edit Subject" : "Add Subject"}
      okText={isEditMode ? "Update Subject" : "Add Subject"}
      onCancel={handleCancel}
      destroyOnClose
      afterOpenChange={afterOpenChange}
    >
      <CustomFormItem
        label="Title"
        layout="vertical"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <CustomInput placeholder="Enter Subject Title" size="large" />
      </CustomFormItem>

      <CustomFormItem
        label="Code"
        layout="vertical"
        name="code"
        rules={[{ required: true, message: "Code is required" }]}
      >
        <CustomInput placeholder="Enter Subject Code" size="large" />
      </CustomFormItem>
    </CustomModal>
  );
};

export default SubjectModal;
