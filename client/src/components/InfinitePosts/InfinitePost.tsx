import React, { useEffect, useMemo, PropsWithChildren, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

import { useUserContext } from '../../context/user';
import { Empty } from 'antd';
import useGetPosts from '../../hooks/useGetPosts';
import { LoadingOutlined } from '@ant-design/icons';
import { Action } from '../../hooks/useGetPosts/useGetPosts';
import PostPreview from '../PostPreview';
import Loader from '../Loader';

interface InfinitePostsPosts {
  action: Action;
  searchPrompt?: string;
  gridRow?: 6 | 4;
}

const InfinitePosts = ({
  action,
  searchPrompt = '',
  gridRow = 6,
}: PropsWithChildren<InfinitePostsPosts>) => {
  const { userId } = useUserContext();

  const {
    data: allPost,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPosts({ action, userId, searchPrompt });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const normalizeAllPost = useMemo(() => {
    return allPost?.pages.flatMap((data) => data) || [];
  }, [allPost]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {searchPrompt.trim() && (
            <h1 className="mt-[-30px] mb-[30px] text-[18px]">
              Search result: <span className="font-bold">{searchPrompt}</span>
            </h1>
          )}
          {normalizeAllPost.length > 0 ? (
            <div
              className={`min-h-[50vh] grid lg:grid-cols-${gridRow} md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3`}
            >
              {normalizeAllPost.map((post, idx) => (
                <React.Fragment key={idx}>
                  <Suspense fallback={null}>
                    <PostPreview
                      withCardStyle={searchPrompt ? false : true}
                      isAlreadyLike={post.likes.includes(userId)}
                      likeCount={post.likes.length}
                      key={idx}
                      {...post}
                    />
                  </Suspense>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="flex !w-full justify-center">
              <Empty description="No post found" />
            </div>
          )}
          {normalizeAllPost.length > 0 && (
            <div ref={ref}>
              {isFetchingNextPage && (
                <div className="mt-6 flex justify-center items-center text-md md:text-lg">
                  <p className="mr-2">Loading</p>
                  <LoadingOutlined />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InfinitePosts;
