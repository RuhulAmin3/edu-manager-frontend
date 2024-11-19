/**
 *  External Dependency
 */
import { RxHamburgerMenu } from "react-icons/rx";
import { UserOutlined } from "@ant-design/icons";
import { GoScreenFull } from "react-icons/go";
import { FC, PropsWithChildren, useState } from "react";
import { MdLightMode } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

import { Flex, Popover } from "antd";

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
import ProfilePopoverContent from "~/features/profile/profile-popover-content";

const LayoutHeader: FC<PropsWithChildren> = ({ ...props }) => {
  const isscrolled = useScrollPosition();
  const isMobile = useScreenSize();
  const [open, setOpen] = useState(false);
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

          <Popover 
            open={open}
            onOpenChange={(val) => setOpen(val)}
            destroyTooltipOnHide
            overlayClassName="profile-popover"
            content={<ProfilePopoverContent setOpen={setOpen} />}
            trigger="click"
            arrow={false} 
          >
            {/* popover button */}
            <CustomAvatar size="large" shape="square" icon={<UserOutlined />} onClick={()=>setOpen(!open)}/>
          </Popover>
        </Flex>
      </Flex>
    </CustomHeader>
  );
};

export default LayoutHeader;
