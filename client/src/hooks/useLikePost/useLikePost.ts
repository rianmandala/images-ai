import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePostApi } from '../../api/posts';
import {
  MY_COLLECTIONS_QUERY_KEY,
  MY_FAVORITES_QUERY_KEY,
  POSTS_QUERY_KEY,
} from '../../constants';

interface LikePostMutationParams {
  userId: string;
  postId: string;
}

const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, postId }: LikePostMutationParams) =>
      likePostApi({ userId, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries(POSTS_QUERY_KEY);
      queryClient.invalidateQueries(MY_COLLECTIONS_QUERY_KEY);
      queryClient.invalidateQueries(MY_FAVORITES_QUERY_KEY);
    },
  });
};

export default useLikePost;
