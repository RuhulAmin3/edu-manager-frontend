/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * External dependencies
 * */ 

import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { Flex } from "antd";

/**
 * Internal dependencies
 * */ 
import GuardianInformation from "~/features/student/components/guardian-information";
import PersonalInformation from "~/features/student/components/personal-information";
import OtherInformation from "~/features/student/components/other-information";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import useShowToastMessage from "~/common/hooks/use-show-toast-message"; 
import { getStudentObj } from "~/features/student/student.utils";
import { USER } from "~/common/constants/local-storage.constant";
import SecondaryButton from "~/components/ui/secondary-button";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import PrimaryButton from "~/components/ui/primary-button";
import CustomForm from "~/components/form/custom-form";
import LoadingSpin from "~/components/ui/loading-spin";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import { useCreateStudentMutation } from "~/features/user/user.api";

const AddStudentPage = () => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  const [form] = useForm();
  const [createStudent, res] = useCreateStudentMutation();
  const navigate = useNavigate();

  const handleSubmit = (values: Record<string, unknown>) => {
    const studentObj = getStudentObj(values);
    const formData = new FormData();
    formData.append("student", JSON.stringify(studentObj));
    
    if (values?.password)
      formData.append("password", JSON.stringify(values?.password));
    if (
      (values.image as Array<any>)?.length > 0 &&
      (values.image as any)[0].originFileObj
    ) {
     formData.append("image", (values.image as any)[0].originFileObj as File);
    }
    createStudent(formData);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const afterSubmit = () => {
    form.resetFields();
    navigate(`/${role.toLowerCase()}/students`, { replace: true });
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    successMessage: "Student added successfully",
    cb: afterSubmit,
  });

  return (
    <>
      <CustomBreadCrumb
        items={[
          {
            label: "Student List",
            link: `/${role ? role?.toLocaleLowerCase() : "admin"}/students`,
          },
          {
            label: "Add Student",
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

        <GuardianInformation />

        <OtherInformation />

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

export default AddStudentPage;
