import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps, message, Modal } from 'antd';
import { useEffect, useState } from 'react';

import { useUserContext } from '../../context/user';
import useSwithModePost from '../../hooks/useSwithModePost';
import useDeletePost from '../../hooks/useDeletePost';
import { Post } from '../../model/post/types';
import PostThumbnail from '../PostThumbnail';

interface PostDetailProps extends Post {
  likeCount: number;
  isAlreadyLike: boolean;
  open: boolean;
  closeModalHandler: () => void;
}

function PostDetail(props: PostDetailProps) {
  const { isPrivate, open, closeModalHandler, prompt, user, _id } = props;

  const swithModePost = useSwithModePost();
  const deletePost = useDeletePost();
  const [isOpenComfirmDeletePost, setIsOpenComfirmDeletePost] = useState(false);
  const [isOpenSwithModePost, setIsOpenSwithModePost] = useState(false);
  const { userId } = useUserContext();
  const [messageApi, contextHolder] = message.useMessage();

  const confirmSwithModePost = () => {
    swithModePost.mutate({ isPrivate: !isPrivate, postId: _id });
  };

  const cancelSwithModePost = () => {
    setIsOpenSwithModePost(false);
  };

  const confirmDeletePostHandler = () => {
    deletePost.mutate(_id);
  };

  const cancelDeletePostHandler = () => {
    setIsOpenComfirmDeletePost(false);
  };

  useEffect(() => {
    if (swithModePost.isSuccess) {
      messageApi.open({
        type: 'success',
        content: `Success switch post mode to ${
          isPrivate ? 'public' : 'private'
        }`,
      });
      setIsOpenSwithModePost(false);
    }
  }, [swithModePost.isSuccess]);

  useEffect(() => {
    if (deletePost.isSuccess) {
      closeModalHandler();
      messageApi.open({
        type: 'success',
        content: 'Success delete post',
      });
      setIsOpenComfirmDeletePost(false);
    }
  }, [deletePost.isSuccess]);

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    switch (e.key) {
      case '1':
        setIsOpenComfirmDeletePost(true);
        break;
      case '2':
        setIsOpenSwithModePost(true);
        break;
      default:
        break;
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Delete',
      icon: <DeleteOutlined />,
      key: '1',
      style: { fontSize: '16px' },
    },
    {
      icon: isPrivate ? <EyeOutlined /> : <EyeInvisibleOutlined />,
      label: isPrivate ? 'switch to public' : 'switch to private',
      key: '2',
      style: { fontSize: '16px' },
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div>
      <Modal
        open={open}
        title="Detail"
        onCancel={closeModalHandler}
        centered
        footer={[]}
      >
        <PostThumbnail withPreview withHoverAction={false} {...props} />
        <div className="cursor-default group-hover:flex flex-col max-h-[94.5%] mt-3 rounded-md">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              {user.photo ? (
                <Avatar src={user.photo} />
              ) : (
                <Avatar>{user.name?.[0]}</Avatar>
              )}
              <p className="text-black text-md">{user.name}</p>
            </div>
            {userId === user._id && (
              <Dropdown
                menu={menuProps}
                placement="bottomRight"
                trigger={['click']}
                className="cursor-pointer "
                arrow
              >
                <Button
                  icon={<MoreOutlined />}
                  size="middle"
                  className="!flex justify-center items-center !bg-white"
                />
              </Dropdown>
            )}
          </div>
          <p className="mt-3 text-md overflow-y-auto">{prompt}</p>
        </div>
      </Modal>
      <Modal
        title="Are you sure ?"
        open={isOpenComfirmDeletePost}
        onOk={confirmDeletePostHandler}
        onCancel={cancelDeletePostHandler}
        confirmLoading={deletePost.isLoading}
      >
        <p className="text-black text-sm">
          Once you delete this post, it will not be restored again.
        </p>
      </Modal>
      <Modal
        title="Are you sure ?"
        open={isOpenSwithModePost}
        onOk={confirmSwithModePost}
        confirmLoading={swithModePost.isLoading}
        onCancel={cancelSwithModePost}
      >
        <p className="text-black text-sm">
          If you switch to {isPrivate ? 'public' : 'private'} mode, then
          everyone will be able to see this post.
        </p>
      </Modal>
      {contextHolder}
    </div>
  );
}

export default PostDetail;
