/**
 * External Dependencies
 * */
import { Col, Row, UploadFile as UploadFileProps } from "antd";
import { CiSquareInfo } from "react-icons/ci";
import React, { FC } from "react";
/**
 * Internal Dependencies
 * */

import SelectClassField from "~/features/class/components/select-class-field";
import CustomDatePicker from "~/components/form/custom-date-picker";
import FormSectionTopbar from "~/components/ui/form-section-topbar";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomSelect from "~/components/form/custom-select";
import CustomInput from "~/components/form/custom-input";
import UploadFile from "~/components/form/upload-file";
import DefaultCard from "~/components/ui/default-card";
import {
  bloodGroupSelectList,
  genderSelectList,
  studentStatusSelectList,
} from "~/common/constants";

const PersonalInformation: FC<{
  initialFileList?: UploadFileProps[];
  form?: unknown; 
}> = ({ initialFileList, form }) => {
  const onRemoveFile = () => {
    if (form && typeof form === "object" && "setFieldValue" in form) {
      (
        form as { setFieldValue: (field: string, value: unknown) => void }
      ).setFieldValue("image", undefined);
    }
  };

  return (
    <>
      <FormSectionTopbar title="Personal Information" icon={<CiSquareInfo />} />
      <DefaultCard>
        {/* Upload File */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <CustomFormItem
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList || [];
              }}
              rules={[{ required: true, message: "please upload an image" }]}
            >
              <UploadFile
                name="image"
                listType="picture"
                maxCount={1}
                initialFileList={initialFileList ?? undefined}
                onRemoveFile={onRemoveFile}
              />
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
