import { Avatar, AvatarProps } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import useScrollPosition from "../../common/hooks/use-scroll-position";

const ModifiedAvatar = styled(Avatar)<{ isScrolled: boolean }>`
  background: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
  color: ${EDU_MANAGER_TOKENS.colors["edu-secondary"]};
  border: 1px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
  padding: 10px !important;
  cursor: pointer;
  shadow: ${(props) =>
    props.isScrolled && EDU_MANAGER_TOKENS.shadow["edu-card-shadow"]};
  &:hover {
    background: ${EDU_MANAGER_TOKENS.colors["edu-secondary"]};
    color: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
    transition: all 0.3s ease;
  }
`;

const CustomAvatar: FC<AvatarProps> = (props) => {
  const isScrolled = useScrollPosition();
  return <ModifiedAvatar isScrolled={isScrolled} {...props} />;
};

export default CustomAvatar;
