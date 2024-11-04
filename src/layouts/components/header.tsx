import { Header } from "antd/es/layout/layout";
import styled from "styled-components";
import { FC, PropsWithChildren } from "react";
import { Flex } from "antd";
import NormalText from "../../components/ui/normal-text";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoScreenFull } from "react-icons/go";
import { MdLightMode } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import { getGreeting, toggleFullscreen } from "../../common/utils";
import useScreenSize from "../../common/hooks/use-screen-size";
import CustomAvatar from "../../components/ui/avatar";
import useScrollPosition from "../../common/hooks/use-scroll-position";
import { IoIosAdd } from "react-icons/io";

// Styled component for the header
const CustomHeader = styled(Header)<{ isScrolled: boolean }>`
  &.ant-layout-header {
    background: ${(props) =>
      props.isScrolled
        ? `${EDU_MANAGER_TOKENS.colors["edu-body-bg"]}`
        : "transparent"};
    box-shadow: ${(props) =>
      props.isScrolled ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none"};
    height: 90px;
    padding: ${(props) => (props.isScrolled ? "0 20px" : "0px")};
    border-radius: ${(props) => (props.isScrolled ? "5px" : "0px")};
    position: fixed;
    top: 0;
    z-index: 1000;
  }
`;

const LayoutHeader: FC<PropsWithChildren> = ({ ...props }) => {
  const isScrolled = useScrollPosition();
  const isMobile = useScreenSize();

  return (
    <CustomHeader isScrolled={isScrolled} {...props}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={5}>
          {isMobile ? (
            <RxHamburgerMenu style={{ fontSize: "20px" }} />
          ) : (
            <NormalText
              fontSize={EDU_MANAGER_TOKENS.fontSize["edu-font-2xl"]}
              textType="middle"
              style={{ marginBottom: "0px" }}
            >
              {getGreeting()} James!
            </NormalText>
          )}
        </Flex>
        <Flex gap={10} style={{ paddingBlock: "20px" }}>
          <CustomAvatar size="large" shape="square" icon={<IoIosAdd />} />
          <CustomAvatar
            size="large"
            shape="square"
            icon={<GoScreenFull />}
            onClick={toggleFullscreen}
          />
          {/* <CustomAvatar size="large" shape="square" icon={<CiDark />} /> */}
          <CustomAvatar size="large" shape="square" icon={<MdLightMode />} />
          <CustomAvatar size="large" shape="square" icon={<UserOutlined />} />
        </Flex>
      </Flex>
    </CustomHeader>
  );
};

export default LayoutHeader;
