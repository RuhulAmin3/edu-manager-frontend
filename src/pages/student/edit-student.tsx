/**
 * External dependencies
 * */
import type { UploadFile } from "antd/es/upload/interface";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Col, Flex, Skeleton } from "antd";

/**
 * Internal dependencies
 * */
import GuardianInformation from "~/features/student/components/guardian-information";
import PersonalInformation from "~/features/student/components/personal-information";
import OtherInformation from "~/features/student/components/other-information";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import { USER } from "~/common/constants/local-storage.constant";
import { useUploadFileMutation } from "~/features/user/user.api";
import { ModifiedErrorType } from "~/common/types/response.type";
import { getFormObj } from "~/features/student/student.utils";
import RefreshButton from "~/components/ui/refresh-button";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import PrimaryButton from "~/components/ui/primary-button";
import CustomForm from "~/components/form/custom-form";
import LoadingSpin from "~/components/ui/loading-spin";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import {
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "~/features/student/student.api";

const EditStudentPage = () => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  const { id } = useParams();
  const [form] = useForm();
  const [prviewImg, setPreviewImg] = useState<UploadFile[]>();
  const [updateStudent, res] = useUpdateStudentMutation();
  const [uploadFile, fileRes] = useUploadFileMutation();
  const { data, isLoading } = useGetStudentQuery(id);
  const [updatedValues, setUpdatedValues] = useState<Record<string, string>>(
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

    if ("dateOfBirth" in values) {
      setUpdatedValues((prev) => ({
        ...prev,
        dateOfBirth: (values["dateOfBirth"] as Date).toISOString(),
      }));

    } else {
      setUpdatedValues((prev) => ({
        ...prev,
        ...(values as Record<string, string>),
      }));
    }
  };

  const handleSubmit = () => {
    updateStudent({ id, data: updatedValues });
  };

  const afterHandleSubmit = () => {
    navigate(`/${role?.toLowerCase()}/students`);
  };

  useEffect(() => {
    if (data?.data) {
      const initialValues = getFormObj(data?.data);
      setUpdatedValues((prev) => ({
        ...prev,
        studentId: initialValues.studentId as string,
        className: initialValues.className as string,
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
    successMessage: "student information update successfully",
    cb: afterHandleSubmit,
  });

  useShowToastMessage({
    isError: fileRes?.isError,
    isSuccess: fileRes?.isSuccess,
    error: fileRes?.error as ModifiedErrorType,
    successMessage: "file uploaded successfully",
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
              label: "Student List",
              link: `/${role ? role?.toLocaleLowerCase() : "admin"}/students`,
            },
            {
              label: "update Student",
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
          initialFileList={prviewImg ? prviewImg : undefined}
        />

        <GuardianInformation />

        <OtherInformation />

        <Flex gap={10} justify="flex-end" style={{ marginBlock: "20px" }}>
          {/* <SecondaryButton htmlType="reset">Reset</SecondaryButton> */}
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

export default EditStudentPage;
