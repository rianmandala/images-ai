import { useMutation, useQueryClient } from '@tanstack/react-query';
import { swithModePostApi, SwithModePostApiParams } from '../../api/posts';
import { POSTS_QUERY_KEY, MY_COLLECTIONS_QUERY_KEY } from '../../constants';

const useSwithModePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isPrivate, postId }: SwithModePostApiParams) =>
      swithModePostApi({ isPrivate, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries(POSTS_QUERY_KEY);
      queryClient.invalidateQueries(MY_COLLECTIONS_QUERY_KEY);
    },
  });
};

export default useSwithModePost;
