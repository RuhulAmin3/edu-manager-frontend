import React from "react";
import DefaultCard from "~/components/ui/default-card";
import FormSectionTopbar from "~/components/ui/form-section-topbar";
import { TbUserShield } from "react-icons/tb";
import { Col, Row } from "antd";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";

const GuardianInformation = () => {
  return (
    <div style={{ marginBlock: "20px" }}>
      <FormSectionTopbar title="Parents Information" icon={<TbUserShield />} />
      <DefaultCard>
        {/* Father row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8}>
            <CustomFormItem
              label="Father Name"
              name="fatherName"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <CustomFormItem
              label="Father Occupation"
              layout="vertical"
              name="fatherOccupation"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <CustomFormItem
              label="Father Contact No"
              name="fatherContactNo"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
        </Row>
        {/* Mother row  */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8}>
            <CustomFormItem
              label="Mother Name"
              name="motherName"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <CustomFormItem
              label="Mother Occupation"
              layout="vertical"
              name="motherOccupation"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <CustomFormItem
              label="Mother Contact No"
              name="motherContactNo"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
        </Row>
      </DefaultCard>
    </div>
  );
};

export default GuardianInformation;
