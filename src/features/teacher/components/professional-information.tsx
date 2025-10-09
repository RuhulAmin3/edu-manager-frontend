/**
 * External dependencies
 */
import { Col, Row } from "antd";
import { FC } from "react";
import { TbUserShield } from "react-icons/tb";

/**
 * Internal dependencies
 */
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import CustomSelect from "~/components/form/custom-select";
import DefaultCard from "~/components/ui/default-card";
import FormSectionTopbar from "~/components/ui/form-section-topbar";

const ProfessionalInformation: FC = () => {
  return (
    <div style={{ marginBlock: "20px" }}>
      <FormSectionTopbar title="Professional Information" icon={<TbUserShield />} />
      <DefaultCard>
        <Row gutter={[16, 16]}>
          {/* Designation */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name="designation"
              label="Designation"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>

          {/* Subject */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name="subject"
              label="Subject"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>

          {/* Employment Type */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name="type"
              label="Employment Type"
              rules={[{ required: true }]}
            >
              <CustomSelect
                options={[
                  { label: "Monthly", value: "Monthly" },
                  { label: "Contractual", value: "Contractual" },
                  { label: "Daily", value: "Daily" },
                ]}
              />
            </CustomFormItem>
          </Col>

          {/* Salary */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name="salary"
              label="Monthly Salary"
              rules={[{ required: true }]}
            >
              <CustomInput type="number" />
            </CustomFormItem>
          </Col>

          {/* Password */}
          <Col xs={24} md={8}>
            <CustomFormItem
              name="password"
              label="Password"
            >
              <CustomInput type="password" />
            </CustomFormItem>
          </Col>
        </Row>
      </DefaultCard>
    </div>
  );
};

export default ProfessionalInformation;