// Internal Import
import logo from "../../assets/edu-manger-logo.png";
import bg from "../../assets/auth-bg.png";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import CustomInput from "../../components/CustomInput";
import CustomFormItem from "../../components/CustomFormItem";

// external Import
import styled from "styled-components";
import { Flex, Form, Image, Space, Typography } from "antd";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: url(${bg}) center / cover no-repeat;
`;

const FlexBox = styled(Flex)`
  background: ${EDU_MANAGER_TOKENS.colors["edu-white"]};
  box-shadow: ${EDU_MANAGER_TOKENS.shadow["edu-card-shadow"]};
  border-radius: ${EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-base"]};
  min-width: 90%; /* Mobile default */
  margin: 15px;
  /* Tablet */
  @media (min-width: 768px) {
    min-width: 50%;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    min-width: 33%;
  }
`;

const LoginPage = () => {
  const { Title, Text } = Typography;

  return (
    <Wrapper>
      <FlexBox vertical gap={"large"}>
        <Space
          direction="vertical"
          align="center"
          content="center"
          style={{
            padding: "24px",
            borderTopLeftRadius: `${EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-base"]}`,
            borderTopRightRadius: `${EDU_MANAGER_TOKENS.borderRadius["edu-border-radius-base"]}`,
            background: `${EDU_MANAGER_TOKENS.colors["edu-dark-gray"]}`,
          }}
        >
          <Image src={logo} width={80} preview={false} />
          <Title
            level={4}
            style={{
              color: `${EDU_MANAGER_TOKENS.colors["edu-white"]}`,
            }}
          >
            Let's Get Started With Edu Manager
          </Title>
          <Text
            style={{
              color: `${EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]}`,
            }}
          >
            Sign in to continue to Edu Manager
          </Text>
        </Space>
        <Form style={{ padding: "24px" }} layout="vertical">
          <CustomFormItem label="UserId" layout="vertical" name="userId">
            <CustomInput placeholder={"Enter userId"} size="large" />
          </CustomFormItem>

          <CustomFormItem label="Password" layout="vertical" name="password">
            <CustomInput
              type="password"
              placeholder="Enter password"
              size="large"
            />
          </CustomFormItem>
          {/* <Form.Item label="UserId" layout="vertical" name="userId">
            <CustomInput placeholder={"Enter userId"} size="large" />
          </Form.Item> */}
        </Form>
      </FlexBox>
    </Wrapper>
  );
};

export default LoginPage;
