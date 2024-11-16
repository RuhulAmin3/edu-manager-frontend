import { Layout } from "antd";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

const {Sider, Header} = Layout;

export const CustomLayout = styled(Layout)<{
    contentmarginleft?: number;
    collapsed?: boolean;
  }>`
    .ant-layout {
      min-height: 100vh;
      background: ${EDU_MANAGER_TOKENS.colors["edu-body-bg"]} !important;
    }
    .ant-layout-sider {
      background: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
      position: fixed;
      height: 100vh;
    }
    .ant-layout-content,
    .ant-layout-footer,
    .ant-layout-header {
      margin-left: ${(props) => props.contentmarginleft}px !important;
      transition: all 0.4s ease;
      width: calc(100% - ${(props) => props.contentmarginleft}px);
      padding-right: 20px;
    }
    .ant-layout-content {
      margin-top: 80px !important;
    }
  `;
  

  export const CustomSider = styled(Sider)<{
    triggerposition: number;
  }>`
    .ant-layout-sider-trigger {
      width: 30px !important;
      height: 30px;
      position: absolute;
      top: 25px;
      left: ${(props) => props.triggerposition}px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      color: ${EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]};
      border: 2px solid ${EDU_MANAGER_TOKENS.colors["edu-border-color"]};
      border-radius: 7px;
  
      // Smooth color and border transition for the trigger button
      transition: all 0.6s ease;
      &:hover {
        color: ${EDU_MANAGER_TOKENS.colors["edu-dark-gray"]};
      }
    }
  `;
  

  // Styled component for the header
export const CustomHeader = styled(Header)<{ isscrolled: boolean }>`
&.ant-layout-header {
  background: ${(props) =>
    props.isscrolled
      ? `${EDU_MANAGER_TOKENS.colors["edu-body-bg"]}`
      : "transparent"};
  box-shadow: ${(props) =>
    props.isscrolled ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none"};
  height: 90px;
  padding: ${(props) => (props.isscrolled ? "0 20px" : "0px 10px 0px 0px")}; 
  border-radius: ${(props) => (props.isscrolled ? "5px" : "0px")};
  position: fixed;
  top: 0;
  z-index: 1000;
}
`;
