/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * External dependencies
 */
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { Flex } from "antd";

/**
 * Internal dependencies
 */

import PersonalInformation from "~/features/teacher/components/personal-information";
import ProfessionalInformation from "~/features/teacher/components/professional-information";
import EducationalInformation from "~/features/teacher/components/educational-information";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { useAddTeacherMutation } from "~/features/teacher/teacher.api";
import { ModifiedErrorType } from "~/common/types/response.type";
import { USER } from "~/common/constants/local-storage.constant";
import SecondaryButton from "~/components/ui/secondary-button";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import PrimaryButton from "~/components/ui/primary-button";
import CustomForm from "~/components/form/custom-form";
import LoadingSpin from "~/components/ui/loading-spin";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

const AddTeacherPage = () => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  const [form] = useForm();
  const [addTeacher, res] = useAddTeacherMutation();
  const navigate = useNavigate();

  const handleSubmit = (values: Record<string, unknown>) => {
    const formData = new FormData();

    if (values?.password)
      formData.append("password", JSON.stringify(values?.password));
    if (
      (values.image as Array<any>)?.length > 0 &&
      (values.image as any)[0].originFileObj
    ) {
      formData.append("image", (values.image as any)[0].originFileObj as File);
    }
    delete values.image;
    delete values.password;
    formData.append("teacher", JSON.stringify(values)); 
  
    addTeacher(formData);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const afterSubmit = () => {
    form.resetFields();
    navigate(`/${role.toLowerCase()}/teachers`, { replace: true });
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res?.error as ModifiedErrorType,
    successMessage: "Teacher added successfully",
    cb: afterSubmit,
  });

  return (
    <>
      <CustomBreadCrumb
        items={[
          {
            label: "Teacher List",
            link: `/${role ? role?.toLocaleLowerCase() : "admin"}/teachers`,
          },
          {
            label: "Add Teacher",
          },
        ]}
      />
      <CustomForm
        form={form}
        scrollToFirstError={{ behavior: 'smooth', block: 'center' }}
        layout="vertical"
        validateMessages={{
          required: "please provide ${label}!",
        }}
        onFinish={handleSubmit}
      >
        <PersonalInformation />

        <ProfessionalInformation />

        <EducationalInformation />

        <Flex gap={10} justify="flex-end" style={{ marginBlock: "20px" }}>
          <SecondaryButton htmlType="reset" onClick={handleReset}>
            Reset
          </SecondaryButton>
          <PrimaryButton htmlType="submit" disabled={res.isLoading}>
            {res.isLoading && (
              <LoadingSpin
                fontSize={14}
                color={EDU_MANAGER_TOKENS.colors["edu-white"]}
              />
            )}{" "}
            Submit
          </PrimaryButton>
        </Flex>
      </CustomForm>
    </>
  );
};

export default AddTeacherPage;
