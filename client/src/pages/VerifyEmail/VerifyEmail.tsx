import { Typography, Button, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

import { verifyEmail } from '../../assets';
import { useUserContext } from '../../context/user';
import normalizeFirebaseAuthError from '../../helper/normalizeFirebaseAuthError';
import { SEND_VERIFICATION_EMAIL_INFO } from '../../constants';

const VerifyEmail = () => {
  const userAuth = getAuth();
  const { currentUser } = userAuth;
  const { email } = useUserContext();
  const initSendEmailVerf = useRef(true);
  const navigate = useNavigate();

  const [resendEmailTime, setResendEmailTime] = useState(60);
  const [resendEmailLoading, setResendEmailLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const disableResendEmail = resendEmailTime > 0;

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | number = 0;
    if (resendEmailTime > 0) {
      timerInterval = setInterval(() => {
        setResendEmailTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [resendEmailTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const resendEmailVerf = async () => {
    if (currentUser && !currentUser?.emailVerified) {
      setResendEmailLoading(true);
      await sendEmailVerification(currentUser)
        .then(() => {
          messageApi.open({
            type: 'success',
            content: 'Success resend email verification',
          });
        })
        .catch((error) => {
          messageApi.open({
            type: 'error',
            content: error.message,
          });
        })
        .finally(() => {
          setResendEmailLoading(false);
          setResendEmailTime(60);
        });
    }
  };

  useEffect(() => {
    if (
      initSendEmailVerf.current &&
      currentUser &&
      !currentUser?.emailVerified
    ) {
      initSendEmailVerf.current = false;
      sendEmailVerification(currentUser)
        .then(() => {
          messageApi.open({
            type: 'success',
            content: SEND_VERIFICATION_EMAIL_INFO,
          });
        })
        .catch((error) => {
          messageApi.open({
            type: 'error',
            content: normalizeFirebaseAuthError(error),
          });
        });
    }

    if (currentUser?.emailVerified) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col items-center">
      <Typography.Title level={2} className="block pt-6 !text-gray-800">
        Verify you email
      </Typography.Title>
      <Typography.Text className="mb-12 !text-gray-500">
        You will need to verify your email to complete registration
      </Typography.Text>
      <img
        className="w-[90%] h-[200px] md:w-[60%]"
        src={verifyEmail}
        alt="verify email"
      />
      <Typography.Text className="block mt-6 w-[80%] text-center !text-gray-500">
        an email has been sent to {email} with a link to verify your account. if
        you have not received the email after a few minute, please check your
        spam folder. If you already verify email, you can refresh this page or
        you can directly go to home page
      </Typography.Text>
      <Typography.Text className="mt-10">
        {formatTime(resendEmailTime)}
      </Typography.Text>
      <Button
        onClick={resendEmailVerf}
        disabled={disableResendEmail}
        type="primary"
        className="mt-3"
        loading={resendEmailLoading}
      >
        Resend email
      </Button>
      {contextHolder}
    </div>
  );
};

export default VerifyEmail;
