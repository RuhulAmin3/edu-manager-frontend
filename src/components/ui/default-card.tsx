import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { FC, PropsWithChildren } from "react";

const Card = styled.div<{ $padding?: string; $minHeight?: string }>`
  padding: ${(props) => props.$padding || "15px"};
  box-shadow: ${EDU_MANAGER_TOKENS.shadow["edu-card-shadow"]};
  background: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
  border-radius: ${EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-sm"]};
  min-height: ${(props) => props.$minHeight || "100px"} !important;
`;

type CardProps = {
  padding?: string;
  minHeight?: string;
};

const DefaultCard: FC<PropsWithChildren<CardProps>> = ({
  padding,
  minHeight,
  children,
}) => {
  return (
    <Card $padding={padding} $minHeight={minHeight}>
      {children}
    </Card>
  );
};

export default DefaultCard;
