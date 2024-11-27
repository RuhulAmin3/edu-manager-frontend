import { Col, Row } from "antd";
import React from "react";
import { CiSquareInfo } from "react-icons/ci";

import {
  bloodGroupSelectList,
  genderSelectList,
  studentStatusSelectList,
} from "~/common/constants";
import CustomDatePicker from "~/components/form/custom-date-picker";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import CustomSelect from "~/components/form/custom-select";
import UploadFile from "~/components/form/upload-file";
import DefaultCard from "~/components/ui/default-card";
import FormSectionTopbar from "~/components/ui/form-section-topbar";
import SelectClassField from "~/features/class/components/select-class-field";

const PersonalInformation = () => {
  return (
    <>
      <FormSectionTopbar title="Personal Information" icon={<CiSquareInfo />} />
      <DefaultCard>
        {/* Upload File */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <CustomFormItem
              name="file"
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
              rules={[{ required: true }]}
            >
              <UploadFile name="file" listType="picture" maxCount={1} />
            </CustomFormItem>
          </Col>
        </Row>
        {/* Form Inputs */}

        {/* First Row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="First Name"
              name="firstName"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Middle Name"
              layout="vertical"
              name="middleName"
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Last Name"
              name="lastName"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Class"
              name="className"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <SelectClassField filterMode />
            </CustomFormItem>
          </Col>
        </Row>

        {/* Second row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Class Roll"
              name="classRoll"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Section"
              layout="vertical"
              name="section"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Date of Birth"
              layout="vertical"
              name="dateOfBirth"
              rules={[{ required: true }]}
            >
              <CustomDatePicker size="large" />
            </CustomFormItem>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Gender"
              name="gender"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomSelect
                placeholder="select"
                size="large"
                options={genderSelectList}
              />
            </CustomFormItem>
          </Col>
        </Row>

        {/* third row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem label="Email" name="email" layout="vertical">
              <CustomInput type="email" />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Contact No"
              layout="vertical"
              name="contactNo"
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem label="Status" name="status" layout="vertical">
              <CustomSelect
                placeholder="select"
                size="large"
                options={studentStatusSelectList}
              />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={6}>
            <CustomFormItem
              label="Blood Group"
              name="bloodGroup"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomSelect
                placeholder="select"
                size="large"
                options={bloodGroupSelectList}
              />
            </CustomFormItem>
          </Col>
        </Row>

        {/* fourth row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CustomFormItem
              label="Admission Year"
              name="admissionYear"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CustomFormItem
              label="School Name"
              name="schoolName"
              layout="vertical"
              rules={[{ required: true }]}
            >
              <CustomInput />
            </CustomFormItem>
          </Col>
        </Row>
      </DefaultCard>
    </>
  );
};

export default PersonalInformation;
