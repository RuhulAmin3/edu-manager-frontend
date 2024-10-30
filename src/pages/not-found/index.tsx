import { Button } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../common/utils/local-storage.utils";
import { USER } from "../../common/constants/local-storage.constant";

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #282c34, #3c4043);
  color: #f5f5f5;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 10rem;
  margin: 0;
  font-weight: bold;
  color: #ff4d4f;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin: 10px 0 20px;
  font-weight: 400;
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  color: #bfbfbf;
  margin-bottom: 30px;
`;

const BackButton = styled(Button)`
  font-size: 1rem;
  padding: 0 30px;
  border-radius: 25px;
  height: 50px;
  color: #ffffff;
  background-color: #1890ff;
  border: none;

  &:hover {
    background-color: #40a9ff;
  }
`;

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const user: Record<string, string> | null = getFromLocalStorage(USER);
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Description>
        Sorry, the page you were looking for doesn’t exist. Check the URL for
        mistakes or press the button below to return to the homepage.
      </Description>
      <BackButton
        type="primary"
        onClick={() =>
          navigate(`${user?.role ? user?.role.toLowerCase() : "/"}`)
        }
      >
        Go Dashboard
      </BackButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
