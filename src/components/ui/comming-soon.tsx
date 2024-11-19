import React from "react";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";

const { Title } = Typography;

// Styled Components
const ComingSoonWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #40a9ff, #87e8de);
  color: #fff;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  padding: 0 30px;
  background-color: #ffffff !important;
  color: #1890ff !important;
  font-weight: bold;
  border-radius: 8px;
  &:hover {
    background-color: #f0f0f0 !important;
    color: #096dd9 !important;
  }
`;

const ComingSoon: React.FC = () => {
  const navigate = useNavigate();
  const {role}:Record<string, string>  = getFromLocalStorage(USER) || {};
  
  const handleDashboardNavigate = () => {
    navigate(role ? `/${role.toLowerCase()}`: "/login");
  };

  return (
    <ComingSoonWrapper>
      <Title level={2} style={{ marginBottom: "10px" }}>
        🚀 Coming Soon!
      </Title>
      <StyledButton type="primary" onClick={handleDashboardNavigate}>
        Go to Dashboard
      </StyledButton>
    </ComingSoonWrapper>
  );
};

export default ComingSoon;
