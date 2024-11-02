import { Header } from "antd/es/layout/layout";
import styled from "styled-components";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Avatar, Flex } from "antd";
import NormalText from "../../components/ui/normal-text";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoScreenFull } from "react-icons/go";
import { CiDark } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import { getGreeting } from "../../common/utils";
import useScreenSize from "../../common/hooks/use-screen-size";

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
    padding: ${(props) => (props.isScrolled ? "0 20px" : "0px 20px")};
    border-radius: ${(props) => (props.isScrolled ? "5px" : "0px")};
    position: fixed;
    top: 0;
    z-index: 1000;
  }
`;

const LayoutHeader: FC<PropsWithChildren> = ({ ...props }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useScreenSize();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <Avatar size="large" icon={<GoScreenFull />} />
          <Avatar size="large" icon={<CiDark />} />
          <Avatar size="large" icon={<MdLightMode />} />
          <Avatar size="large" icon={<UserOutlined />} />
        </Flex>
      </Flex>
    </CustomHeader>
  );
};

export default LayoutHeader;
