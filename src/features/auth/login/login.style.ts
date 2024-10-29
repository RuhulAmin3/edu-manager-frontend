// External Import
import { EDU_MANAGER_TOKENS } from "../../../styles/token";
import bg from "../../../assets/auth-bg.png";

// Internal Import
import { Flex, Space } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: url(${bg}) center / cover no-repeat;
`;

const FlexBox = styled(Flex)`
  background: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
  box-shadow: ${EDU_MANAGER_TOKENS.shadow["edu-card-shadow"]};
  border-radius: ${EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-base"]};
  min-width: 90%; /* Mobile default */
  margin: 15px;
  /* Tablet */
  @media (min-width: 768px) {
    min-width: 50%;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    min-width: 33%;
  }
`;

const FlexBoxTop = styled(Space)`
  padding: 24px;
  border-top-left-radius: ${EDU_MANAGER_TOKENS.borderRadius[
    "edu-border-radius-base"
  ]};
  border-top-right-radius: ${EDU_MANAGER_TOKENS.borderRadius[
    "edu-border-radius-base"
  ]};
  background: ${EDU_MANAGER_TOKENS.colors["edu-dark-gray"]};
`;

export const LoginStyle = { Wrapper, FlexBox, FlexBoxTop };
