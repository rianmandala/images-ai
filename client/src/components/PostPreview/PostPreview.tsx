import { Suspense, useState } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Post } from '../../model/post/types';
import PostDetail from '../PostDetail';
import PostThumbnail from '../PostThumbnail';

interface CardPPostThumbnailProps extends Post {
  likeCount: number;
  isAlreadyLike: boolean;
  withCardStyle?: boolean;
}

const PostPreview = (props: CardPPostThumbnailProps) => {
  const { withCardStyle = true } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModalHandler = () => {
    setIsOpenModal(true);
  };

  const closeModalHandler = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={withCardStyle ? 'card' : ''}>
      <PostThumbnail
        onClickThumbnail={openModalHandler}
        withPreview={false}
        withHoverAction
        {...props}
      />
      <Suspense fallback={null}>
        <PostDetail
          open={isOpenModal}
          closeModalHandler={closeModalHandler}
          {...props}
        />
      </Suspense>
    </div>
  );
};

export default PostPreview;
