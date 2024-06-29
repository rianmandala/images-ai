import {
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Image } from "antd";
import number from "numeral";
import {
  LazyComponentProps,
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { downloadImage } from "../../utils";
import { useUserContext } from "../../context/user";
import useLikePost from "../../hooks/useLikePost";
import { Post } from "../../model/post/types";
import { styPostImage } from "./styles";
import { useNavigate } from "react-router-dom";

interface CardPPostThumbnailProps extends Post, LazyComponentProps {
  likeCount: number;
  isAlreadyLike: boolean;
  withPreview: boolean;
  withHoverAction: boolean;
  onClickThumbnail?: () => void;
}

const PostThumbnail = (props: CardPPostThumbnailProps) => {
  const {
    photo,
    _id,
    isAlreadyLike,
    likeCount,
    thumbnail,
    placeholder,
    scrollPosition,
    prompt,
    user,
    withPreview,
    withHoverAction,
    onClickThumbnail,
  } = props;

  const navigate = useNavigate();
  const likePostMutate = useLikePost();

  const likePostHandler = async () => {
    if (userId) {
      likePostMutate.mutate({ userId, postId: _id });
    } else {
      navigate("/login");
    }
  };

  const downloadImageHandler = () => {
    downloadImage(prompt, photo);
  };

  const { userId } = useUserContext();

  return (
    <div className="relative overflow-hidden cursor-pointer group shadow-card hover:shadow-cardhover card">
      <div className={styPostImage}>
        {withPreview ? (
          <Image
            style={{ aspectRatio: "1 / 1", height: "100%", width: "100%" }}
            src={thumbnail}
            alt=""
          />
        ) : (
          <LazyLoadImage
            alt={prompt}
            loading="lazy"
            style={{ aspectRatio: "1 / 1", height: "100%", width: "100%" }}
            onClick={onClickThumbnail}
            effect="blur"
            scrollPosition={scrollPosition}
            placeholderSrc={placeholder}
            src={thumbnail}
          />
        )}
      </div>
      <div
        className={`flex md:group-hover:flex ${
          withHoverAction ? "sm:hidden" : ""
        } absolute gap-2 top-[10px] right-[10px]`}
      >
        <Button
          icon={isAlreadyLike ? <HeartFilled /> : <HeartOutlined />}
          size="middle"
          onClick={likePostHandler}
          className="!flex justify-center items-center !bg-white !text-black !border-white"
        >
          <>
            Like{" "}
            {likeCount > 0
              ? likeCount > 999
                ? number(likeCount).format("0.0a")
                : likeCount
              : null}
          </>
        </Button>
        <Button
          icon={<DownloadOutlined />}
          size="middle"
          shape="circle"
          onClick={downloadImageHandler}
          className="!flex justify-center items-center !bg-white !text-black !border-white"
        />
      </div>
      {!withPreview && (
        <div
          className={`flex md:group-hover:flex ${
            withHoverAction ? "sm:hidden" : ""
          } items-center gap-2 absolute gap-2 bottom-[10px] left-[10px]`}
        >
          {user?.photo ? (
            <Avatar className="!w-[22px] !h-[22px]" src={user?.photo} />
          ) : (
            <Avatar className="!flex justify-center items-center !w-[18px] !h-[18px] !text-[12px] !bg-[rgba(0,0,0,0.5)]">
              {user?.name?.[0]}
            </Avatar>
          )}
          <p className="text-white text-[12px]">{user?.name}</p>
        </div>
      )}
    </div>
  );
};

export default trackWindowScroll(PostThumbnail);
