/**
 * External dependencies
 * */
import type { UploadFile } from "antd/es/upload/interface";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Col, Flex, Skeleton } from "antd";
import merge from "lodash.merge";

/**
 * Internal dependencies
 * */
import PersonalInformation from "~/features/guardian/components/personal-information";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { USER } from "~/common/constants/local-storage.constant";
import { useUploadFileMutation } from "~/features/user/user.api";
import { ModifiedErrorType } from "~/common/types/response.type";
import { getGuardianFormObj } from "~/features/guardian/guardian.utils";
import RefreshButton from "~/components/ui/refresh-button";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import PrimaryButton from "~/components/ui/primary-button";
import CustomForm from "~/components/form/custom-form";
import LoadingSpin from "~/components/ui/loading-spin";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import {
  useGetGuardianQuery,
  useUpdateGuardianMutation,
} from "~/features/guardian/guardian.api";

const EditGuardianPage = () => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  const { id } = useParams();
  const [form] = useForm();
  const [previewImg, setPreviewImg] = useState<UploadFile[]>();
  const [updateGuardian, res] = useUpdateGuardianMutation();
  const [uploadFile, fileRes] = useUploadFileMutation();
  const { data, isLoading } = useGetGuardianQuery(id as string);
  const [updatedValues, setUpdatedValues] = useState<Record<string, unknown>>(
    {}
  );
  const navigate = useNavigate();
  const handleValueChanges = (values: Record<string, unknown>) => {
    if (
      "image" in values &&
      Array.isArray(values.image) &&
      values.image.length > 0
    ) {
      const imageFile = values.image[0] as { originFileObj?: File };
      if (imageFile.originFileObj) {
        const formData = new FormData();
        formData.append("image", imageFile?.originFileObj);
        uploadFile(formData);
      }
    }

    setUpdatedValues((prev) => merge({}, prev, values));
  };
  
  const handleSubmit = () => {
    updateGuardian({ id: id as string, data: updatedValues });
  };

  const afterHandleSubmit = () => {
    navigate(`/${role?.toLowerCase()}/guardians`);
  };

  useEffect(() => {
    if (data?.data) {
      const initialValues = getGuardianFormObj(data?.data as unknown as Record<string, unknown>);
      setUpdatedValues((prev) => ({
        ...prev,
        guardianId: initialValues.guardianId as string,
        contactNo: initialValues.contactNo as string,
      }));
      form.setFieldsValue(initialValues);
      setPreviewImg(initialValues.image as UploadFile[]);
    }
  }, [data?.data, form]);

  useEffect(() => {
    if (fileRes?.isSuccess && fileRes?.data) {
      const { url, public_id } = fileRes?.data?.data || {};
      setUpdatedValues((prev) => ({
        ...prev,
        image: url,
        imagePublicId: public_id,
      }));
    }
  }, [fileRes?.data, fileRes?.isSuccess]);

  useShowToastMessage({
    isError: res?.isError,
    isSuccess: res?.isSuccess,
    error: res?.error as ModifiedErrorType,
    successMessage: "Guardian information updated successfully",
    cb: afterHandleSubmit,
  });

  useShowToastMessage({
    isError: fileRes?.isError,
    isSuccess: fileRes?.isSuccess,
    error: fileRes?.error as ModifiedErrorType,
    successMessage: "File uploaded successfully",
  });

  if (isLoading) {
    return (
      <Col xs={24}>
        <Skeleton title active paragraph={{ rows: 10 }} />
      </Col>
    );
  }
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        style={{ paddingBlock: "10px" }}
      >
        <CustomBreadCrumb
          items={[
            {
              label: "Guardian List",
              link: `/${role ? role?.toLocaleLowerCase() : "admin"}/guardians`,
            },
            {
              label: "Update Guardian",
            },
          ]}
        />
        <RefreshButton />
      </Flex>
      <CustomForm
        form={form}
        onValuesChange={handleValueChanges}
        scrollToFirstError={{ behavior: "smooth", block: "center" }}
        layout="vertical"
        validateMessages={{
          required: "please provide ${label}!",
        }}
        onFinish={handleSubmit}
      >
        <PersonalInformation
          form={form}
          initialFileList={previewImg ? previewImg : undefined}
        />

        <Flex gap={10} justify="flex-end" style={{ marginBlock: "20px" }}>
          <PrimaryButton
            htmlType="submit"
            disabled={res.isLoading || fileRes?.isLoading}
          >
            {res.isLoading && (
              <LoadingSpin
                fontSize={14}
                color={EDU_MANAGER_TOKENS.colors["edu-white"]}
              />
            )}{" "}
            {res.isLoading ? "Updating" : "Update"}
          </PrimaryButton>
        </Flex>
      </CustomForm>
    </>
  );
};

export default EditGuardianPage;
