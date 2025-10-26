/**
 * External Dependencies
 */
import React, { useEffect } from "react";
import { Form } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

/**
 * Internal Dependencies
 */
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { ModifiedErrorType } from "~/common/types/response.type";
import CustomModal from "~/components/ui/custom-modal";
import { resetFormInitialValues, resetModalName } from "~/redux/slice";
import { RootState } from "~/redux/store";
import { useAddExamMutation, useUpdateExamMutation } from "../exam.api";
import { useForm } from "antd/es/form/Form";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import SelectSubjectField from "~/features/subject/components/select-subject-field";
import SelectClassField from "~/features/class/components/select-class-field";
import SelectTeacherField from "~/components/form/select-teacher-field";
import CustomDatePicker from "~/components/form/custom-date-picker";
import SecondaryButton from "~/components/ui/secondary-button";

/* -------------------------- Styled Components --------------------------- */

const SubjectItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 12px;
  border: 1px solid #e5e5e5;
  padding: 16px;
  border-radius: 8px;
  background-color: #fafafa;

  .anticon-minus-circle {
    font-size: 18px;
    color: #ff4d4f;
    cursor: pointer;
    margin-bottom: 4px;
  }
`;

const SubjectsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #444;

    &::after {
      content: " *";
      color: #ff4d4f;
    }
  }
`;

const AddButton = styled(SecondaryButton)`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
`;

/* ------------------------------------------------------------------------- */

const ExamModal = () => {
    const { modalName, editId, formInitialValues } = useAppSelector(
        (state: RootState) => state.defaultState
    );
    const isEditMode = modalName === MODEL_CONSTANT.EDIT_EXAM;
    const dispatch = useAppDispatch();

    const [addExam, addExamRes] = useAddExamMutation();
    const [updateExam, updateExamRes] = useUpdateExamMutation();
    const [form] = useForm();

    const isError = isEditMode ? updateExamRes.isError : addExamRes.isError;
    const isSuccess = isEditMode ? updateExamRes.isSuccess : addExamRes.isSuccess;
    const error = isEditMode ? updateExamRes.error : addExamRes.error;
    const isLoading = isEditMode ? updateExamRes.isLoading : addExamRes.isLoading;
    const resetMutation = isEditMode ? updateExamRes.reset : addExamRes.reset;

    const handleSubmit = (values: Record<string, any>) => {
        resetMutation();
        if (isEditMode && editId) {
            updateExam({ id: editId, data: values });
        } else {
            addExam(values);
        }
    };

    const afterSubmit = () => {
        dispatch(resetModalName());
        if (isEditMode) dispatch(resetFormInitialValues());
        form.resetFields();
        resetMutation();
    };

    const handleCancel = () => {
        dispatch(resetModalName());
        if (isEditMode) dispatch(resetFormInitialValues());
        form.resetFields();
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
        successMessage: isEditMode
            ? "Exam updated successfully"
            : "Exam added successfully",
        cb: afterSubmit,
    });

    const isVisible =
        modalName === MODEL_CONSTANT.ADD_EXAM ||
        modalName === MODEL_CONSTANT.EDIT_EXAM;

    return (
        <CustomModal
            visible={isVisible}
            onSubmit={handleSubmit}
            loading={isLoading}
            initialValues={formInitialValues}
            title={isEditMode ? "Edit Exam" : "Add Exam"}
            okText={isEditMode ? "Update Exam" : "Add Exam"}
            onCancel={handleCancel}
            destroyOnClose
            afterOpenChange={afterOpenChange}
            styles={{
                body: {
                    maxHeight: "65vh", // 🔥 scrollable modal body
                    overflowY: "auto",
                    paddingRight: "12px",
                },
            }}
            style={{
                top: 20,
            }}
        >
            {/* Exam Title */}
            <CustomFormItem
                label="Exam Name"
                layout="vertical"
                name="title"
                rules={[{ required: true }]}
            >
                <CustomInput placeholder="Enter Exam Name" size="large" />
            </CustomFormItem>

            {/* Class */}
            <CustomFormItem
                label="Class"
                layout="vertical"
                name="classId"
                rules={[{ required: true }]}
            >
                <SelectClassField />
            </CustomFormItem>

            {/* Subjects List */}
            <CustomFormItem
                layout="vertical"
                name="subjects"
                rules={[{ required: true, message: "At least one subject is required" }]}
            >
                <Form.List
                    name="subjects"
                    rules={[
                        {
                            validator: async (_, subjects) => {
                                if (!subjects || subjects.length < 1) {
                                    return Promise.reject(
                                        new Error("At least one subject is required")
                                    );
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            <SubjectsHeader>
                                <label>Subjects</label>
                                <AddButton onClick={() => add()}>
                                    <PlusOutlined /> Add Subject
                                </AddButton>
                            </SubjectsHeader>

                            {fields.map(({ key, name, ...restField }) => (
                                <SubjectItemWrapper key={key}>
                                    <CustomFormItem
                                        {...restField}
                                        name={[name, "subjectId"]}
                                        label="Subject"
                                        rules={[
                                            { required: true, message: "Subject is required" },
                                        ]}
                                        style={{ flex: 1 }}
                                    >
                                        <SelectSubjectField size="large" />
                                    </CustomFormItem>

                                    <CustomFormItem
                                        {...restField}
                                        name={[name, "totalMark"]}
                                        label="Total Mark"
                                        rules={[{ required: true }]}
                                        style={{ flex: 1 }}
                                    >
                                        <CustomInput placeholder="Mark" type="number" size="large" />
                                    </CustomFormItem>

                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </SubjectItemWrapper>
                            ))}
                        </>
                    )}
                </Form.List>
            </CustomFormItem>

            {/* Teacher */}
            <CustomFormItem
                label="Teacher"
                layout="vertical"
                name="authorId"
                rules={[{ required: true }]}
            >
                <SelectTeacherField />
            </CustomFormItem>

            {/* Exam Date */}
            <CustomFormItem
                label="Exam Date"
                layout="vertical"
                name="date"
                rules={[{ required: true }]}
            >
                <CustomDatePicker showTime size="large" format="YYYY-MM-DD HH:mm" />
            </CustomFormItem>
        </CustomModal>
    );
};

export default ExamModal;
