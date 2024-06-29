import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePostApi } from '../../api/posts';
import {
  POSTS_QUERY_KEY,
  MY_COLLECTIONS_QUERY_KEY,
  MY_FAVORITES_QUERY_KEY,
} from '../../constants';

const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(POSTS_QUERY_KEY);
      queryClient.invalidateQueries(MY_COLLECTIONS_QUERY_KEY);
      queryClient.invalidateQueries(MY_FAVORITES_QUERY_KEY);
    },
  });
};

export default useDeletePost;
