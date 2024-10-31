import { Image } from "antd";
import styled from "styled-components";
import logo from "../../assets/edu-manger-logo.png";

const Brand = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-image-img {
    height: 60px !important;
  }
`;

const SidebarBrand = () => {
  return (
    <Brand>
      <Image src={logo} preview={false} />
    </Brand>
  );
};

export default SidebarBrand;
