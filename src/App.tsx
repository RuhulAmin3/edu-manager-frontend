import React from "react";
import styled from "styled-components";
import { Button, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

// Styled Components
const ComingSoonWrapper = styled.div`
  height: 100vh;
  overflow: hidden; /* Prevent overflow */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #40a9ff, #87e8de);
  color: #fff;
  text-align: center;
  padding: 0;  
  margin: 0;
`;


const ContentContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin-bottom: 30px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  background-color: #fff !important;
  color: #1890ff !important;
  font-weight: bold;
  &:hover {
    background-color: #f0f0f0 !important;
    color: #40a9ff !important;
  }
`;

const CountdownContainer = styled.div`
  margin-top: 30px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const LoginInfoCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
`;

const LoginInfoContainer = styled.div`
  text-align: center;
  color: #000;
`;

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  return (
    <ComingSoonWrapper>
      <ContentContainer>
        <Title level={2}>🚀 Something Amazing is Coming Soon!</Title>
        <Text style={{ fontSize: "1.2rem" }}>
          We're working hard to bring you a great experience. Stay tuned!
        </Text>
        <CountdownContainer>Launching in 10 days</CountdownContainer>
        <StyledButton type="primary" onClick={handleLoginNavigate}>
          Go to Login
        </StyledButton>
      </ContentContainer>
      
      {/* Login Information Section */}
      <LoginInfoCard>
        <LoginInfoContainer>
          <Title level={4} style={{ color: "#1890ff" }}>
            Test Login Information as an Admin
          </Title>
          <Text style={{ fontSize: "1rem" }}>User ID: <strong>A-00001</strong></Text>
          <br />
          <Text style={{ fontSize: "1rem" }}>Password: <strong>123123</strong></Text>
        </LoginInfoContainer>
      </LoginInfoCard>
    </ComingSoonWrapper>
  );
};

export default App;
