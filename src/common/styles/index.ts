import { EDU_MANAGER_TOKENS } from "~/styles/token";

// action menu style in table
export const styles = {
    item: {
      display: "flex",
      alignItems: "center",
      gap: "8px", // Add spacing between icon and text
      padding: "8px 12px",
      fontSize: "14px",
      color: "#333",
    },
    icon: {
      fontSize: "16px",
      color: EDU_MANAGER_TOKENS.colors["edu-primary"], // Use Ant Design's primary color
    },
  };