import { FC } from "react";
import { EDU_MANAGER_TOKENS } from "../../../styles/token";
import { Divider } from "antd";

type AdminTopCardProps = {
  total?: number;
  active?: number;
  inactive?: number;
  icon: string;
  title: string;
  color?: string;
};

const AdminTopCard: FC<AdminTopCardProps> = ({
  total = 0,
  active = 0,
  inactive = 0,
  icon,
  title,
  color,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Image and Title Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={icon}
            alt=" Icon"
            style={{
              width: 80,
              height: 80,
              marginRight: 12,
              padding: 5,
              background: color
                ? color
                : EDU_MANAGER_TOKENS.colors["edu-primary-bg-opacity"],
              borderRadius:
                EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-sm"],
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: EDU_MANAGER_TOKENS.fontSize["edu-font-xl"],
                fontWeight: "bold",
                color: EDU_MANAGER_TOKENS.colors["edu-text-primary-color"],
              }}
            >
              {total}
            </span>
            <span
              style={{
                fontSize: EDU_MANAGER_TOKENS.fontSize["edu-font-base"],
                color: EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"],
              }}
            >
              {title}
            </span>
          </div>
        </div>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      {/* Active and Inactive Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: EDU_MANAGER_TOKENS.fontSize["edu-font-base"],
        }}
      >
        <span
          style={{
            color: EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"],
          }}
        >
          Active:{" "}
          <strong
            style={{
              color: EDU_MANAGER_TOKENS.colors["edu-text-primary-color"],
            }}
          >
            {active}
          </strong>
        </span>
        <span
          style={{
            color: EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"],
          }}
        >
          Inactive:{" "}
          <strong
            style={{
              color: EDU_MANAGER_TOKENS.colors["edu-text-primary-color"],
            }}
          >
            {inactive}
          </strong>
        </span>
      </div>
    </>
  );
};

export default AdminTopCard;
