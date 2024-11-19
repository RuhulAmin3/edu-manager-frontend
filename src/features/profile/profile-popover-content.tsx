/**
 * External Dependencies
 */
import { Avatar, Flex, Menu, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import React from "react";
/**
 * Internal Dependencies
 */
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import NormalText from "~/components/ui/normal-text";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import { logout } from "../auth/login/login.slice";

const ProfilePopoverContent = () => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    notification.success({
      message: "logout successfully",
      pauseOnHover: true,
      duration: 2,
      type: "success",
      showProgress: true,
    });
  };

  return (
    <Flex vertical gap={10}>
      <Flex gap={10} align="center">
        <Avatar size="large" shape="circle" icon={<FaRegUserCircle />} />
        <div>
          <NormalText textType="middle">Kevin Larry</NormalText> <br />
          <NormalText
            textType="middle"
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]}
          >
            Admin
          </NormalText>
        </div>
      </Flex>{" "}
      <Menu
        items={[
          {
            key: "profile",
            label: (
              <Flex>
                {/* profile link */}
                <Link
                  to={`/${role.toLowerCase()}/profile`}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <FaRegUserCircle /> My Profile
                </Link>
              </Flex>
            ),
          },
          {
            key: "logout",
            label: (
              <Flex gap={8} align="center" onClick={handleLogout}>
                {" "}
                <BiLogOut /> Logout{" "}
              </Flex>
            ),
          },
        ]}
      />
    </Flex>
  );
};

export default ProfilePopoverContent;
