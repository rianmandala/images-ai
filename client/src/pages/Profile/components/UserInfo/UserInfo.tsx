import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useState } from 'react';
import { useUserContext } from '../../../../context/user';
import getBase64 from '../../../../helper/getBase64';
import useUpdateProfile from '../../hooks/useUpdateProfile';
import UserInfoLoader from './Loader';

function UserInfo() {
  const [openModalUpdateProfile, setOpenModalUpdateProfile] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<FormData>();

  const user = useUserContext();
  const updateProfile = useUpdateProfile();

  const handleChangeUploadImage: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url);
    });
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const updateProfileHandler = async () => {
    const name = form.getFieldValue('name');
    if (name !== user.name || imageUrl) {
      updateProfile.mutate({
        name: form.getFieldValue('name'),
        photo: imageUrl || '',
        userId: user.userId,
      });

      messageApi.open({
        type: 'success',
        content: 'Success update profile',
      });
    }

    setOpenModalUpdateProfile(false);
  };

  if (!user.name) {
    return <UserInfoLoader />;
  }

  return (
    <div className="flex self-start height-[400px] flex-col items-center bg-white shadow-sm rounded text-center p-6">
      {user.photo ? (
        <Avatar size={100} src={user.photo} />
      ) : (
        <Avatar
          size={100}
          style={{
            color: 'white',
            fontSize: '32px',
          }}
        >
          {user.name[0]}
        </Avatar>
      )}
      <Typography.Title className="!m-0 !mt-1" level={5}>
        {user.name}
      </Typography.Title>
      <Typography.Text type="secondary">{user.email}</Typography.Text>
      <Button
        onClick={() => setOpenModalUpdateProfile(true)}
        className="mt-5"
        type="primary"
      >
        Update profile
      </Button>
      <Modal
        title="Update profile"
        centered
        open={openModalUpdateProfile}
        confirmLoading={updateProfile.isLoading}
        onOk={updateProfileHandler}
        onCancel={() => setOpenModalUpdateProfile(false)}
        width={400}
      >
        <Form form={form} initialValues={{ name: user.name }} name="basic">
          <Upload
            name="avatar"
            listType="picture-circle"
            className="!flex !justify-center"
            showUploadList={false}
            onChange={handleChangeUploadImage}
            beforeUpload={beforeUpload}
          >
            <div className="relative rounded-full w-[100px] h-[100px] overflow-hidden">
              {imageUrl || user.photo ? (
                <Avatar size={100} src={imageUrl || user.photo || ''} />
              ) : (
                <Avatar size={100}>{user.name[0]}</Avatar>
              )}
              <span className="flex items-center justify-center bg-[rgba(0,0,0,0.5)] absolute bottom-0 left-0 w-[100px] h-[32px]">
                <CameraOutlined style={{ color: '#fff', fontSize: '18px' }} />
              </span>
            </div>
          </Upload>
          <Form.Item
            name="name"
            className="w-[80%] block mt-3 !mx-auto mb-6"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="name"
            />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </div>
  );
}

export default UserInfo;
