import { Flex } from "antd";
import React from "react";
import CustomFormItem from "~/components/form/custom-form-item";
import CustomInput from "~/components/form/custom-input";
import SelectClassField from "~/features/class/components/select-class-field";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

const StudentPromotionTo = () => {
  return (
    <div
      style={{
        boxShadow: EDU_MANAGER_TOKENS.shadow["edu-card-shadow"],
        border: `1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]}`,
        borderRadius: EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-sm"],
        padding: "10px",
        flexBasis: "46%",
      }}
    >
      <CustomFormItem
        name="admissionYear"
        label="Promote To Session"
        layout="vertical"
        rules={[{ required: true, message: "session is required" }]}
      >
        <CustomInput />
      </CustomFormItem>
      <Flex gap={10} align="center" justify="space-between">
        <CustomFormItem
          style={{ width: "100%", margin: "0" }}
          label="Class"
          name="className"
          layout="vertical"
          rules={[{ required: true, message: "class is required" }]}
        >
          <SelectClassField filterMode />
        </CustomFormItem>
        <CustomFormItem
          style={{ width: "100%", margin: "0" }}
          label="Section"
          name="section"
          layout="vertical"
          rules={[{ required: true, message: "section is required" }]}
        >
          <CustomInput />
        </CustomFormItem>
      </Flex>
    </div>
  );
};

export default StudentPromotionTo;
