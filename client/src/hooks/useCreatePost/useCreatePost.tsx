import { useMutation } from '@tanstack/react-query';
import { createPostApi, CreatePostApiParams } from '../../api/posts';

const useCreatePost = () => {
  return useMutation({
    mutationFn: (params: CreatePostApiParams) => createPostApi(params),
  });
};

export default useCreatePost;
