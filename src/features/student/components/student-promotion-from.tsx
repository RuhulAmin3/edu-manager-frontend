import { Flex } from "antd";
import React, { FC } from "react";
import CustomInput from "~/components/form/custom-input";
import NormalText from "~/components/ui/normal-text";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

const StudentPromotionFrom: FC<{
  className: string;
  session: number;
  section: string;
  studentId:string;
}> = ({ className, section, session, studentId }) => {
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
      <Flex align="center" justify="space-between">
        <div>
          <NormalText
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]}
          >
            {" "}
            Current Session
          </NormalText>
          <NormalText
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]}
          >
            {" "}
            {session}
          </NormalText>
        </div>
        <div>
          <NormalText
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]}
          >
            {" "}
            Student Id
          </NormalText>
          <NormalText
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]}
          >
            {" "}
            {studentId}
          </NormalText>
        </div>
      </Flex>

      <NormalText
        textColor={EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]}
      >
        {" "}
        Promotion from
      </NormalText>
      <Flex align="center" gap={10} justify="space-between">
        <Flex gap={4} vertical style={{ width: "100%" }}>
          <span
            style={{
              color: EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"],
            }}
          >
            Class
          </span>
          <CustomInput value={className} readOnly />
        </Flex>
        <Flex gap={4} vertical style={{ width: "100%" }}>
          <span
            style={{
              color: EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"],
            }}
          >
            Section
          </span>
          <CustomInput value={section} readOnly />
        </Flex>
      </Flex>
    </div>
  );
};

export default StudentPromotionFrom;
