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

import PersonalInformation from "~/features/guardian/components/personal-information";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { useAddGuardianMutation } from "~/features/guardian/guardian.api";
import { ModifiedErrorType } from "~/common/types/response.type";
import { USER } from "~/common/constants/local-storage.constant";
import SecondaryButton from "~/components/ui/secondary-button";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import PrimaryButton from "~/components/ui/primary-button";
import CustomForm from "~/components/form/custom-form";
import LoadingSpin from "~/components/ui/loading-spin";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

const AddGuardianPage = () => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  const [form] = useForm();
  const [addGuardian, res] = useAddGuardianMutation();
  const navigate = useNavigate();

  const handleSubmit = (values: Record<string, unknown>) => {
    const formData = new FormData();
    if (
      (values.image as Array<any>)?.length > 0 &&
      (values.image as any)[0].originFileObj
    ) {
      formData.append("image", (values.image as any)[0].originFileObj as File);
    }
    delete values.image;
    formData.append("guardian", JSON.stringify(values));
    addGuardian(formData);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const afterSubmit = () => {
    form.resetFields();
    navigate(`/${role.toLowerCase()}/guardians`, { replace: true });
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res?.error as ModifiedErrorType,
    successMessage: "Guardian added successfully",
    cb: afterSubmit,
  });

  return (
    <>
      <CustomBreadCrumb
        items={[
          {
            label: "Guardian List",
            link: `/${role ? role?.toLocaleLowerCase() : "admin"}/guardians`,
          },
          {
            label: "Add Guardian",
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

export default AddGuardianPage;
