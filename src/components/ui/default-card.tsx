import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { FC, PropsWithChildren } from "react";

const Card = styled.div<{ $padding?: string }>`
  padding: ${(props) => props.$padding || "15px"};
  box-shadow: ${EDU_MANAGER_TOKENS.shadow["edu-card-shadow"]};
  background: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
  border-radius: ${EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-sm"]};
  // &:hover {
  //   transform: translateY(-5px);
  //   transition: all 0.3s ease-in-out;
  // }
`;

type CardProps = {
  padding?: string;
};

const DefaultCard: FC<PropsWithChildren<CardProps>> = (props) => {
  return <Card {...props} />;
};

export default DefaultCard;
