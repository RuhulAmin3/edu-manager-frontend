// Internal Import
import logo from "../../assets/edu-manger-logo.png";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import CustomInput from "../../components/Form/CustomInput";
import CustomFormItem from "../../components/Form/CustomFormItem";
import PrimaryButton from "../../components/ui/PrimaryButton";
import CustomForm from "../../components/Form/CustomForm";
import { LoginStyle } from "../../features/auth/Login.style";

// external Import
import { Form, Image } from "antd";
import { PiSignInBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import NormalText from "../../components/ui/NormalText";

const LoginPage = () => {
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
          <NormalText
            level={3}
            textType="large"
            textColor={EDU_MANAGER_TOKENS.colors["edu-yellow"]}
            fontSize={EDU_MANAGER_TOKENS.fontSize["edu-font-xl"]}
          >
            Let's Get Started With Edu Manager
          </NormalText>
          <NormalText
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]}
          >
            Sign in to continue to Edu Manager
          </NormalText>
        </LoginStyle.FlexBoxTop>
        <CustomForm
          style={{ padding: "24px" }}
          layout="vertical"
          validateMessages={{
            required: "please provide ${label}!",
          }}
          form={form}
          onFinish={handleSubmit}
        >
          <CustomFormItem
            label="UserId"
            layout="vertical"
            name="userId"
            rules={[{ required: true }]}
          >
            <CustomInput placeholder={"Enter userId"} size="large" />
          </CustomFormItem>

          <CustomFormItem
            label="Password"
            layout="vertical"
            name="password"
            required
            rules={[{ required: true }]}
          >
            <CustomInput
              type="password"
              isPassword={true}
              placeholder="Enter password"
              size="large"
            />
          </CustomFormItem>
          <Link to={"/forgot-password"}>
            <NormalText textColor={EDU_MANAGER_TOKENS.colors["edu-secondary"]}>
              Forgot Password
            </NormalText>
          </Link>
          <PrimaryButton type="primary" size="large" block htmlType="submit">
            Log In <PiSignInBold />
          </PrimaryButton>
        </CustomForm>
      </LoginStyle.FlexBox>
    </LoginStyle.Wrapper>
  );
};

export default LoginPage;
