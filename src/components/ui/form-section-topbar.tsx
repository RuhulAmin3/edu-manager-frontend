import { Flex } from "antd";
import React, { FC, ReactNode } from "react";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import NormalText from "./normal-text";

type FormSectionTopbarProps = {
  title: string;
  icon: ReactNode;
};

const FormSectionTopbar: FC<FormSectionTopbarProps> = ({ title, icon }) => {
  return (
    <Flex
      gap={5}
      align="center"
      style={{
        boxShadow: EDU_MANAGER_TOKENS.shadow["edu-card-shadow"],
        background: EDU_MANAGER_TOKENS.colors["edu-white"],
        borderTopLeftRadius:
          EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-sm"],
        borderTopRightRadius:
          EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-sm"],
        padding: "15px",
        backgroundColor: EDU_MANAGER_TOKENS.colors["edu-secondary"],
      }}
    >
      <Flex
        style={{
          background: EDU_MANAGER_TOKENS.colors["edu-white"],
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        {icon}
      </Flex>
      <NormalText
        textColor={EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]}
        textType="middle"
        fontSize={EDU_MANAGER_TOKENS.fontSize["edu-font-md"]}
      >
        {title}
      </NormalText>
    </Flex>
  );
};

export default FormSectionTopbar;
