import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import CustomModal from "~/components/ui/custom-modal";
import { useForm } from "antd/es/form/Form";
import { ModifiedErrorType } from "~/common/types/response.type";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import { RootState } from "~/redux/store";
import { resetEditId, resetModalName } from "~/redux/slice";
import { useEditSubjectMutation, useGetSubjectQuery } from "../subject.api";
import { useEffect, useState } from "react";

const EditSubjectModal = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const { editId: id, modalName } = useAppSelector(
    (state: RootState) => state.defaultState
  );
  const subjectData = useGetSubjectQuery(id, {
    skip: !id,
  });

  const [initialValues, setInitialValues] = useState({});
  const [editSubject, { isError, isSuccess, error, isLoading }] =
    useEditSubjectMutation();

  const handleSubmit = (values: Record<string, string>) => {
    editSubject({ id, values });
  };

  const handleCancel = () => {
    dispatch(resetEditId());
    dispatch(resetModalName());
  };

  const afterSubmit = () => {
    dispatch(resetModalName());
    dispatch(resetEditId());
    form.resetFields();
  };

  useEffect(() => {
    if (subjectData.isSuccess) {
      setInitialValues(subjectData?.data?.data);
    }
  }, [subjectData.data, subjectData.isSuccess, subjectData.isFetching]);

  console.log("data", subjectData?.data?.data);
  console.log("initialValues", initialValues);
  useShowToastMessage({
    isError: isError,
    isSuccess: isSuccess,
    error: error as ModifiedErrorType,
    successMessage: "Subject Edited successfully",
    cb: afterSubmit,
  });

  return (
    <CustomModal 
      initialValues={initialValues}
      visible={MODEL_CONSTANT.EDIT_SUBJECT == modalName}
      onSubmit={handleSubmit}
      loading={isLoading}
      title="Update Subject"
      okText="Update Subject"
      onCancel={handleCancel}
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

export default EditSubjectModal;
