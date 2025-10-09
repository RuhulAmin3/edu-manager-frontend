/**
 * External dependencies
 */
import { Col, Row } from "antd";
import { FC } from "react";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

/**
 * Internal dependencies
 */
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import CustomTextarea from "~/components/form/custom-textarea";
import DefaultCard from "~/components/ui/default-card";
import FormSectionTopbar from "~/components/ui/form-section-topbar";

const EducationalInformation: FC = () => {
  return (
    <div style={{ marginBlock: "20px" }}>
      <FormSectionTopbar title="Educational Information" icon={<HiOutlineBuildingLibrary />} />
      <DefaultCard>
        <Row gutter={[16, 16]}>
          {/* University Name */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name={["educationalQualification", "universityName"]}
              label="University Name"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>

          {/* Subject/Field */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name={["educationalQualification", "subject"]}
              label="Subject/Field"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>

          {/* Degree */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name={["educationalQualification", "graduation"]}
              label="Degree"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>

          {/* Result/Grade */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name={["educationalQualification", "result"]}
              label="Result/Grade"
            >
              <CustomInput />
            </CustomFormItem>
          </Col>

          {/* Completion Year */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name={["educationalQualification", "completedYear"]}
              label="Completion Year"
            >
              <CustomInput type="number" />
            </CustomFormItem>
          </Col>

          {/* Short Description */}
          <Col xs={24}>
            <CustomFormItem
              name="shortDescription"
              label="Short Description"
            >
              <CustomTextarea rows={4} />
            </CustomFormItem>
          </Col>
        </Row>
      </DefaultCard>
    </div>
  );
};

export default EducationalInformation;