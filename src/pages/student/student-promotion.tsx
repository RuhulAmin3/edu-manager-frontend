/**
 * External Dependencies
 * */ 

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { Flex, Form} from "antd";

/**
 * Internal Dependencies
 * */ 

import StudentPromotionLoadingContent from "~/features/student/components/student-promotion-loading-content";
import StudentPromotionFrom from "~/features/student/components/student-promotion-from";
import StudentPromotionTo from "~/features/student/components/student-promotion-to";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import useShowToastMessage from "~/common/hooks/use-show-toast-message";
import FormSectionTopbar from "~/components/ui/form-section-topbar";
import { USER } from "~/common/constants/local-storage.constant";
import { ModifiedErrorType } from "~/common/types/response.type";
import SecondaryButton from "~/components/ui/secondary-button";
import PrimaryButton from "~/components/ui/primary-button";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import DefaultCard from "~/components/ui/default-card";
import LoadingSpin from "~/components/ui/loading-spin";
import {
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "~/features/student/student.api";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

const StudentPromotionPage = () => {
  const { id } = useParams();
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  const [updateStudent, res] = useUpdateStudentMutation();
  const { data, isLoading } = useGetStudentQuery(id);
  const navigate = useNavigate();
  const [form] = useForm();
  const { className, admissionYear, section, studentId } = data?.data || {};

  const handleSubmit = (values: Record<string, unknown>) => {
    values["studentId"] = studentId;
    if ("admissionYear" in values) {
      values["admissionYear"] = +(values["admissionYear"] as string);
    }
    updateStudent({ id, data: values });
  };

  const afterHandleSubmit = () => {
    navigate(`/${role?.toLowerCase()}/students`);
  };

  const handleResetFields = () => {
    form.resetFields();
  };

  useShowToastMessage({
    isError: res.isError,
    isSuccess: res.isSuccess,
    error: res.error as ModifiedErrorType,
    successMessage: "Student Promoted successfully",
    cb: afterHandleSubmit,
  });

  const loadingContent = <StudentPromotionLoadingContent />;
  return (
    <>
      <CustomBreadCrumb
        items={[
          {
            label: "Student List",
            link: `/${role ? role?.toLocaleLowerCase() : "admin"}/students`,
          },
          {
            label: "Student Promotion",
          },
        ]}
      />
      <FormSectionTopbar title="Student Promotion" />
      <Form layout="vertical" onFinish={handleSubmit}>
        <DefaultCard>
          {isLoading ? (
            loadingContent
          ) : (
            <>
              <Flex align="center" justify="space-between">
                <StudentPromotionFrom
                  className={className}
                  section={section}
                  session={admissionYear}
                  studentId={studentId}
                />
                <PrimaryButton style={{ paddingBlock: "20px" }}>
                  {" "}
                  <MdOutlineKeyboardDoubleArrowRight />{" "}
                </PrimaryButton>
                <StudentPromotionTo />
              </Flex>
              <Flex
                gap={10}
                align="center"
                justify="center"
                style={{ marginTop: "20px", marginBottom: "10px" }}
              >
                <SecondaryButton
                  htmlType="reset"
                  size="middle"
                  onClick={handleResetFields}
                >
                  Reset Promotion
                </SecondaryButton>
                <PrimaryButton
                  htmlType="submit"
                  size="middle"
                  disabled={res?.isLoading}
                >
                  {res?.isLoading && (
                    <LoadingSpin
                      fontSize={14}
                      color={EDU_MANAGER_TOKENS.colors["edu-white"]}
                    />
                  )}
                  Submit Promotion
                </PrimaryButton>
              </Flex>
            </>
          )}
        </DefaultCard>
      </Form>
    </>
  );
};

export default StudentPromotionPage;

