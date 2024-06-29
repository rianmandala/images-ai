import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getMyCollectionsApi,
  getMyFavoritesApi,
  getPostsApi,
  getSearchPostApi,
} from '../../api/posts';
import {
  LIMIT_POST_PER_PAGE,
  MY_COLLECTIONS_QUERY_KEY,
  MY_FAVORITES_QUERY_KEY,
  POSTS_QUERY_KEY,
} from '../../constants';

export type Action = 'posts' | 'my-post' | 'my-favorite' | 'search';

interface UseGetPostsParams {
  userId: string;
  action: Action;
  searchPrompt: string;
}

const useGetPosts = (params: UseGetPostsParams) => {
  const getQueryKey = () => {
    switch (params.action) {
      case 'posts':
        return POSTS_QUERY_KEY;
      case 'my-favorite':
        return MY_FAVORITES_QUERY_KEY;
      case 'my-post':
        return MY_COLLECTIONS_QUERY_KEY;
      case 'search':
        return ['search', params.searchPrompt];
      default:
        return POSTS_QUERY_KEY;
    }
  };

  return useInfiniteQuery({
    queryKey: getQueryKey(),
    queryFn: ({ pageParam = 1 }) => {
      switch (params.action) {
        case 'posts':
          return getPostsApi({ pageParam, limit: LIMIT_POST_PER_PAGE });
        case 'my-post':
          return getMyCollectionsApi({
            limit: LIMIT_POST_PER_PAGE,
            pageParam,
            userId: params.userId,
          });
        case 'my-favorite':
          return getMyFavoritesApi({
            limit: LIMIT_POST_PER_PAGE,
            pageParam,
            userId: params.userId,
          });
        case 'search':
          return getSearchPostApi(params.searchPrompt);
        default:
          return getPostsApi({ pageParam, limit: LIMIT_POST_PER_PAGE });
      }
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < LIMIT_POST_PER_PAGE) {
        return null;
      }
      return pages.length + 1;
    },
  });
};

export default useGetPosts;
