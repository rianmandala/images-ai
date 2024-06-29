import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../../assets';
import { getRandomPrompt } from '../../utils';
import FormField from '../../components/FormField';
import { useUserContext } from '../../context/user';
import { Button, message, Image } from 'antd';
import useGenerateImage from '../../hooks/useGenerateImage';
import useCreatePost from '../../hooks/useCreatePost';
import { LoadingOutlined, ShareAltOutlined } from '@ant-design/icons';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    prompt: '',
    photo: '',
  });
  const [messageApi, contextHolder] = message.useMessage();

  const { userId, name } = useUserContext();

  const generateImage = useGenerateImage();
  const sharePostToCommunity = useCreatePost();

  const clickGenerateImageHandler = async () => {
    if (form.prompt) {
      try {
        generateImage.mutate(form.prompt);
      } catch (error) {
        alert(error);
      }
    } else {
      messageApi.open({
        type: 'error',
        content: 'Please enter a prompt',
      });
    }
  };

  useEffect(() => {
    if (generateImage.isSuccess) {
      setForm({
        ...form,
        photo: `data:image/jpeg;base64,${generateImage.data.photo}`,
      });
    }
  }, [generateImage.isSuccess]);

  const shareImageHandler = async () => {
    if (form.photo && form.prompt) {
      sharePostToCommunity.mutate({ ...form, name, userId, isPrivate: false });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Please enter prompt and generate an image',
      });
    }
  };

  useEffect(() => {
    if (sharePostToCommunity.isSuccess) {
      navigate('/');
    }
  }, [sharePostToCommunity.isSuccess]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="flex max-w-7x1">
      <div
        className="font-bold text-3xl text-white justify-center items-center w-[35%] h-[100vh] md:flex hidden bg-blend-multiply bg-center bg-cover bg-[rgba(0,0,0,0.5)]"
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dg6ymnwfn/image/upload/q_50/v1/DALL-E-AI/udqrblrmrsba7jsahnhk)',
        }}
      >
        <span className="w-[80%]">
          Create endless possibilities with AI generated images, Powered by Open
          AI DALL-E model
        </span>
      </div>
      <div className="mx-auto sm:px-8 px-4 pt-6 pb-6 w-[100%] md:w-[60%] lg:w-[50%]">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 mb-9 text-[#666e75] text-[16px] max-w [500px]">
          Create imaginative and visually stunning images through by DALL-E AI
          and share them with community
        </p>

        <form className="mt-6 max-w-3x1">
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A comic book cover of a superhero wearing headphones"
              value={form.prompt}
              handleChange={handleChange}
              handleSurpriseMe={handleSurpriseMe}
              disabled={
                generateImage.isLoading || sharePostToCommunity.isLoading
              }
              isSurpriseMe
            />
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-50 focus:border-blue-50 w-64 overflow-hidden h-64 flex justify-center items-center">
              {form.photo ? (
                <Image
                  src={form.photo}
                  alt=""
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt=""
                  className="w-9/12 h-9/12 object-contain opacity-40"
                />
              )}

              {generateImage.isLoading && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <LoadingOutlined
                    style={{ fontSize: '40px', color: 'white' }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <Button
              type="primary"
              loading={generateImage.isLoading}
              disabled={sharePostToCommunity.isLoading}
              onClick={clickGenerateImageHandler}
            >
              Generate
            </Button>
            {generateImage.isSuccess && (
              <Button
                onClick={shareImageHandler}
                type="primary"
                disabled={generateImage.isLoading}
                ghost
                className="!flex justify-center items-center"
                icon={<ShareAltOutlined />}
                loading={sharePostToCommunity.isLoading}
              >
                Share with the community
              </Button>
            )}
          </div>
        </form>
      </div>
      {contextHolder}
    </section>
  );
};

export default CreatePost;
