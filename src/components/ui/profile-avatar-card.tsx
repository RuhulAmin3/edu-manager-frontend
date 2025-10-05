/**
 * External Dependencies
 */
import { Flex, Avatar, Tag } from "antd";
import { FC } from "react";
import { UserOutlined } from "@ant-design/icons";

/**
 * Internal Dependencies
 */
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import DefaultCard from "./default-card";
import NormalText from "./normal-text";

export type ProfileAvatarCardProps = {
  name: string;
  id: string;
  image?: string;
  status: string;
  role?: string;
  loading?: boolean;
  size?: number;
};

const ProfileAvatarCard: FC<ProfileAvatarCardProps> = ({
  name,
  id,
  image,
  status,
  role,
  loading = false,
  size = 120,
}) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return EDU_MANAGER_TOKENS.colors["edu-success"];
      case "inactive":
        return EDU_MANAGER_TOKENS.colors["edu-danger"];
      case "blocked":
      case "block":
        return EDU_MANAGER_TOKENS.colors["edu-danger"];
      case "pending":
        return EDU_MANAGER_TOKENS.colors["edu-info"];
      default:
        return EDU_MANAGER_TOKENS.colors["edu-secondary"];
    }
  };

  if (loading) {
    return (
      <DefaultCard>
        <Flex vertical align="center" gap={16}>
          <Avatar size={size} icon={<UserOutlined />} />
          <div style={{ width: "150px", height: "20px", background: "#f0f0f0", borderRadius: "4px" }} />
          <div style={{ width: "100px", height: "16px", background: "#f0f0f0", borderRadius: "4px" }} />
          <div style={{ width: "80px", height: "24px", background: "#f0f0f0", borderRadius: "4px" }} />
        </Flex>
      </DefaultCard>
    );
  }

  return (
    <DefaultCard>
      <Flex vertical align="center" gap={16}>
        <Avatar
          size={size}
          src={image}
          icon={!image ? <UserOutlined /> : undefined}
          style={{
            boxShadow: EDU_MANAGER_TOKENS.shadow["edu-card-shadow"],
          }}
        />
        
        <Flex vertical align="center" gap={8}>
          <NormalText
            textType="middle"
            fontSize={EDU_MANAGER_TOKENS.fontSize["edu-font-lg"]}
            style={{ fontWeight: 600, textAlign: "center" }}
          >
            {name}
          </NormalText>
          
          <NormalText
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]}
            fontSize={EDU_MANAGER_TOKENS.fontSize["edu-font-base"]}
            style={{ textAlign: "center" }}
          >
            ID: {id}
          </NormalText>
          
          {role && (
            <Tag 
              color={EDU_MANAGER_TOKENS.colors["edu-primary"]}
              style={{ fontSize: EDU_MANAGER_TOKENS.fontSize["edu-font-sm"] }}
            >
              {role}
            </Tag>
          )}
          
          <Tag 
            color={getStatusColor(status)}
            style={{ fontSize: EDU_MANAGER_TOKENS.fontSize["edu-font-sm"] }}
          >
            {status}
          </Tag>
        </Flex>
      </Flex>
    </DefaultCard>
  );
};

export default ProfileAvatarCard;
