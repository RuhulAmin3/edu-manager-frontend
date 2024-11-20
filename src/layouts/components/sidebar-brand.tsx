import { Image } from "antd";
import styled from "styled-components";
import logo from "../../assets/edu-manger-logo.png"; 
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";

const Brand = styled.div`
  margin-block: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-image-img {
    cursor:pointer;
    height: 60px !important;
  }
`;

const SidebarBrand = () => { 
  const {role}:Record<string, string> = getFromLocalStorage(USER) || {};
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    navigate(role? `/${role?.toLowerCase() }`: "/")
  }
  return (
    <Brand onClick={handleNavigate}>
      <Image src={logo} preview={false} />
    </Brand>
  );
};

export default SidebarBrand;
