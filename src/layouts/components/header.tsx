/**
 *  External Dependency
 */
import { RxHamburgerMenu } from "react-icons/rx";
import { UserOutlined } from "@ant-design/icons"; 
import { GoScreenFull } from "react-icons/go";
import { FC, PropsWithChildren } from "react";
import { MdLightMode } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { Flex } from "antd";

/**
 * Internal Dependency
 */

import useScrollPosition from "../../common/hooks/use-scroll-position";
import { getGreeting, toggleFullscreen } from "../../common/utils";
import useScreenSize from "../../common/hooks/use-screen-size";
import NormalText from "../../components/ui/normal-text";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import CustomAvatar from "../../components/ui/avatar";
import { CustomHeader } from "../layout.style";


const LayoutHeader: FC<PropsWithChildren> = ({ ...props }) => {
  const isscrolled = useScrollPosition();
  const isMobile = useScreenSize();

  return (
    <CustomHeader isscrolled={isscrolled} {...props}>
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
