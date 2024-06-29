import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Form, Input, Button, Typography, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useCreateUser from "../../hooks/useCreateUser";
import { PROVIDER_ID } from "../../constants";
import normalizeFirebaseAuthError from "../../helper/normalizeFirebaseAuthError";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm<FormData>();
  const [messageApi, contextHolder] = message.useMessage();
  const createUser = useCreateUser();
  const [registerLoading, setRegisterLoading] = useState(false);

  const signupWithGoogleHandler = () => {
    setRegisterLoading(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (res) => {
        createUser.mutate({
          name: res.user.displayName || "",
          email: res.user.email || "",
          photo: res.user.photoURL || "",
          providerId: PROVIDER_ID.GOOGLE,
          userId: res.user.uid || "",
        });
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: normalizeFirebaseAuthError(error),
        });
      })
      .finally(() => setRegisterLoading(false));
  };

  useEffect(() => {
    switch (createUser.data?.providerId) {
      case PROVIDER_ID.PASSWORD:
        navigate("/verify-email");
        break;
      case PROVIDER_ID.GOOGLE:
        navigate("/");
        break;
      default:
        break;
    }
  }, [createUser.isSuccess]);

  const onFinish = async () => {
    setRegisterLoading(true);
    const formData = form.getFieldsValue();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        createUser.mutate({
          name: formData.name,
          email: res.user.email || "",
          photo: res.user.photoURL || "",
          userId: res.user.uid || "",
          providerId: PROVIDER_ID.PASSWORD,
        });
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: normalizeFirebaseAuthError(error),
        });
      })
      .finally(() => setRegisterLoading(false));
  };

  return (
    <div className="flex">
      <div
        className="font-bold text-3xl text-white justify-center items-center w-[80%] md:flex hidden bg-blend-multiply bg-center bg-cover bg-[rgba(0,0,0,0.6)]"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dgtcoctbo/image/upload/v1719603543/DALL-E-AI/wbjvz1oq9zzr6uphagvg.webp)",
        }}
      >
        <span className="w-[80%]">
          Create endless possibilities with AI generated images, Powered by Open
          AI DALL-E model
        </span>
      </div>

      <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
        <div className="shadow-sm bg-white rounded p-10 w-[90%] lg:w-[60%]">
          <p className="text-[#222328] font-bold text-[22px] text-center mb-[24px]">
            Create your account
          </p>
          <Form form={form} name="basic" onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Button
              className="w-[50%] mx-auto !block"
              type="primary"
              htmlType="submit"
              loading={createUser.isLoading || registerLoading}
              disabled={createUser.isLoading || registerLoading}
            >
              Submit
            </Button>
            <div className="flex justify-center gap-2 mt-3">
              <Button
                onClick={signupWithGoogleHandler}
                className="!flex justify-center items-center"
                icon={<GoogleOutlined />}
              >
                Continue with google
              </Button>
              {/**NOTE: will coming soon **/}
              {/* <Button
                onClick={signupWithTwitterkHandler}
                className="!flex !justify-center !items-center"
                icon={<TwitterOutlined />}
              />
              <Button
                onClick={signupWithFacebookHandler}
                className="!flex !justify-center !items-center"
                icon={<FacebookOutlined />}
              /> */}
            </div>
          </Form>
          <Typography.Text className="text-center block mt-6">
            Already have an account ?{" "}
            <Link className="!text-[#222328] !font-bold !underline" to="/login">
              Log in
            </Link>
          </Typography.Text>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Register;
