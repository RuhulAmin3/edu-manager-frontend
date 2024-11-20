/**
 * External Dependencies
*/
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { resetFormInitialValues, resetModalName } from "~/redux/slice";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { ModifiedErrorType } from "~/common/types/response.type";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import { useEditSubjectMutation } from "../subject.api"; 
import CustomModal from "~/components/ui/custom-modal"; 
import { RootState } from "~/redux/store";


const EditSubjectModal = () => {
  const dispatch = useAppDispatch(); 

  const { editId:id, formInitialValues, modalName } = useAppSelector(
  (state: RootState) => state.defaultState
  );

  const [editSubject, { isError, isSuccess, error, isLoading }] =
    useEditSubjectMutation();

  const handleSubmit = (values: Record<string, string>) => {
    editSubject({ id, data:values });
  };

  const handleCancel = () => { 
    dispatch(resetModalName());
  };

  const afterSubmit = () => {
    dispatch(resetModalName());  
    dispatch(resetFormInitialValues());
  };
  
  const afterOpenChange = ()=>{ 
    dispatch(resetFormInitialValues())
  }

  useShowToastMessage({
    isError: isError,
    isSuccess: isSuccess,
    error: error as ModifiedErrorType,
    successMessage: "Subject updated successfully",
    cb: afterSubmit,
  });

  return (
    <CustomModal 
      initialValues={formInitialValues} 
      destroyOnClose
      afterOpenChange={afterOpenChange}
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
