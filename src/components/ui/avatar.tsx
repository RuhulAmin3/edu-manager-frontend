import { Avatar, AvatarProps } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token"; 

const ModifiedAvatar = styled(Avatar)`
  background: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
  color: ${EDU_MANAGER_TOKENS.colors["edu-secondary"]};
  border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
  padding: 10px !important;
  cursor: pointer;
  &:hover {
    background: ${EDU_MANAGER_TOKENS.colors["edu-secondary"]};
    color: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
    transition: all 0.3s ease;
  }
`;

const CustomAvatar: FC<AvatarProps> = (props) => { 
  return <ModifiedAvatar {...props} />;
};

export default CustomAvatar;
