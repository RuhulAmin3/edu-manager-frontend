// external Import
import { Form, Image } from "antd";
import { PiSignInBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

// Internal Import
import logo from "../../assets/edu-manger-logo.png";
import { WholeResponseType } from "../../features/auth/login/login.type";
import { useLoginUserMutation } from "../../features/auth/login/login.api";
import { useAppDispatch } from "../../common/hooks/redux.hooks";
import useShowToastMessage from "../../common/hooks/use-show-toast-message";
import { decodeToken } from "../../common/utils";
import { setCredentials } from "../../features/auth/login/login.slice";
import { LoginStyle } from "../../features/auth/login/login.style";
import NormalText from "../../components/ui/normal-text";
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import CustomForm from "../../components/form/custom-form";
import CustomFormItem from "../../components/form/custom-form-item";
import CustomInput from "../../components/form/custom-input";
import PrimaryButton from "../../components/ui/primary-button";
import LoadingSpin from "../../components/ui/loading-spin";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [
    loginUser,
    { isSuccess, isError, isLoading, data, error },
  ]: WholeResponseType = useLoginUserMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values: unknown) => {
    loginUser(values);
  };

  useShowToastMessage(isError, isSuccess, error, "Login Successful", () => {
    const token: string = data.accessToken;
    const decodedToken: Record<string, string> = decodeToken(token);
    const payload = {
      user: {
        userId: decodedToken.userId,
        role: decodedToken.role,
      },
      token,
    };
    // set userId, role and token into redux and local storage;
    dispatch(setCredentials(payload));
    form.resetFields();
    navigate(`/${decodedToken?.role.toLowerCase()}`, { replace: true });
  });

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
          form={form}
          style={{ padding: "24px" }}
          layout="vertical"
          validateMessages={{
            required: "please provide ${label}!",
          }}
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
            <NormalText
              textColor={EDU_MANAGER_TOKENS.colors["edu-secondary"]}
              style={{ display: "inline-block" }}
            >
              Forgot Password
            </NormalText>
          </Link>
          {isLoading ? (
            <PrimaryButton
              disabled
              type="primary"
              size="large"
              block
              htmlType="submit"
            >
              <LoadingSpin color={EDU_MANAGER_TOKENS.colors["edu-white"]} />
            </PrimaryButton>
          ) : (
            <PrimaryButton type="primary" size="large" block htmlType="submit">
              Log In <PiSignInBold />
            </PrimaryButton>
          )}
        </CustomForm>
        <NormalText
          textColor={EDU_MANAGER_TOKENS.colors["edu-secondary"]}
          style={{ textAlign: "center" }}
        >
          {"Don't have an account ? "}
          <Link to={"/register"}>
            <NormalText
              textType="middle"
              textColor={EDU_MANAGER_TOKENS.colors["edu-primary"]}
            >
              {"Register "}
            </NormalText>
          </Link>
          as Guradian
        </NormalText>
      </LoginStyle.FlexBox>
    </LoginStyle.Wrapper>
  );
};

export default LoginPage;
