// Internal Import
import logo from "../../assets/edu-manger-logo.png";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import CustomInput from "../../components/Form/CustomInput";
import CustomFormItem from "../../components/Form/CustomFormItem";
import PrimaryButton from "../../components/ui/PrimaryButton";
import CustomForm from "../../components/Form/CustomForm";
import { LoginStyle } from "../../features/auth/Login.style";

// external Import
import { Form, Image, Typography } from "antd";
import { PiSignInBold } from "react-icons/pi";
import { loginSchema } from "../../features/auth/Login.schema";

const LoginPage = () => {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();

  const handleSubmit = (values: unknown) => {
    console.log(values);
    form.resetFields();
  };

  return (
    <LoginStyle.Wrapper>
      <LoginStyle.FlexBox vertical gap={"large"}>
        <LoginStyle.FlexBoxTop
          direction="vertical"
          align="center"
          content="center"
        >
          <Image src={logo} width={90} preview={false} />
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
        </LoginStyle.FlexBoxTop>
        <CustomForm
          style={{ padding: "24px" }}
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <CustomFormItem
            label="UserId"
            layout="vertical"
            name="userId"
            rules={[loginSchema.userId]}
          >
            <CustomInput placeholder={"Enter userId"} size="large" />
          </CustomFormItem>

          <CustomFormItem
            label="Password"
            layout="vertical"
            name="password"
            rules={[loginSchema.password]}
          >
            <CustomInput
              type="password"
              isPassword={true}
              placeholder="Enter password"
              size="large"
            />
          </CustomFormItem>
          <PrimaryButton type="primary" size="large" block htmlType="submit">
            Log In <PiSignInBold />
          </PrimaryButton>
        </CustomForm>
      </LoginStyle.FlexBox>
    </LoginStyle.Wrapper>
  );
};

export default LoginPage;
