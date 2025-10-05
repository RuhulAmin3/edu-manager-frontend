/**
 * External Dependencies
 */
import { Flex, Descriptions } from "antd";
import { FC, ReactNode } from "react";
import styled from "styled-components";

/**
 * Internal Dependencies
 */
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import DefaultCard from "./default-card";
import NormalText from "./normal-text";

type InfoItem = {
  label: string;
  value?: string | number | ReactNode;
  span?: number;
};

export type InfoCardProps = {
  title: string;
  icon?: ReactNode;
  items: InfoItem[];
  columns?: 1 | 2 | 3 | 4;
  loading?: boolean;
  showBorder?: boolean;
  size?: "default" | "middle" | "small";
};

const StyledDescriptions = styled(Descriptions)`
  .ant-descriptions-item-label {
    color: ${EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]};
    font-weight: 500;
    width: 35%;
  }
  
  .ant-descriptions-item-content {
    color: ${EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]};
    font-weight: 400;
  }
`;

const InfoCard: FC<InfoCardProps> = ({
  title,
  icon,
  items,
  columns = 2,
  showBorder = true,
  size = "default",
}) => {
  const descriptionItems = items.map((item, index) => ({
    key: index,
    label: item.label,
    children: item.value || "-",
    span: item.span || 1,
  }));

  return (
    <DefaultCard minHeight="auto">
      <Flex
        gap={8}
        align="center"
        style={{
          marginBottom: "20px",
          paddingBottom: "12px",
          borderBottom: showBorder ? `1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]}` : "none",
        }}
      >
        {icon && (
          <Flex
            style={{
              background: EDU_MANAGER_TOKENS.colors["edu-primary-less-opacity"],
              padding: "8px",
              borderRadius: "6px",
              color: EDU_MANAGER_TOKENS.colors["edu-primary"],
            }}
          >
            {icon}
          </Flex>
        )}
        <NormalText
          textType="middle"
          fontSize={EDU_MANAGER_TOKENS.fontSize["edu-font-md"]}
          style={{ fontWeight: 600 }}
        >
          {title}
        </NormalText>
      </Flex>

      <StyledDescriptions
        column={columns}
        size={size}
        items={descriptionItems}
        labelStyle={{
          color: EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"],
          fontWeight: 500,
        }}
        contentStyle={{
          color: EDU_MANAGER_TOKENS.colors["edu-text-primary-color"],
        }}
      />
    </DefaultCard>
  );
};

export default InfoCard;
