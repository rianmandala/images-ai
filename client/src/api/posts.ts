import axios from "axios";
import { Post } from "../model/post/types";
import { HOSTNAME_API } from "../model/constants";

interface LikePostApiParams {
  userId: string;
  postId: string;
}

export interface SwithModePostApiParams {
  postId: string;
  isPrivate: boolean;
}

export interface CreatePostApiParams {
  prompt: string;
  photo: string;
  name: string;
  userId: string;
  isPrivate: boolean;
}

export interface GetPostsApiParams {
  pageParam: string;
  limit: number;
}

export interface GetMyCollectionsApiParams {
  pageParam: string;
  limit: number;
  userId: string;
}

export interface GetMyFavoritesApiParams {
  pageParam: string;
  limit: number;
  userId: string;
}

export const likePostApi = (params: LikePostApiParams) => {
  return axios
    .post(
      `${HOSTNAME_API}api/v1/post/like`,
      {
        ...params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
};

export const getMyCollectionsApi = (params: GetMyCollectionsApiParams) => {
  return axios
    .get<Post[]>(
      `${HOSTNAME_API}api/v1/post/user/${params.userId}?page=${params.pageParam}&limit=${params.limit}`
    )
    .then((res) => res.data);
};

export const getMyFavoritesApi = (params: GetMyFavoritesApiParams) => {
  return axios
    .get<Post[]>(
      `${HOSTNAME_API}api/v1/post/liked-by/${params.userId}?page=${params.pageParam}&limit=${params.limit}`
    )
    .then((res) => res.data);
};

export const getSearchPostApi = (prompt: string) => {
  return axios
    .get<Post[]>(`${HOSTNAME_API}api/v1/post/search?prompt=${prompt}`)
    .then((res) => res.data);
};

export const swithModePostApi = (params: SwithModePostApiParams) => {
  return axios
    .post(
      `${HOSTNAME_API}api/v1/post/switch-mode`,
      {
        ...params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
};

export const deletePostApi = (postId: string) => {
  return axios
    .post(`${HOSTNAME_API}api/v1/post/delete/${postId}`)
    .then((res) => res.data);
};

export const createPostApi = (params: CreatePostApiParams) =>
  axios
    .post<Post>(
      `${HOSTNAME_API}api/v1/post`,
      {
        ...params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);

export const getPostsApi = (params: GetPostsApiParams) =>
  axios
    .get<Post[]>(
      `${HOSTNAME_API}api/v1/post?page=${params.pageParam}&limit=${params.limit}`
    )
    .then((res) => res.data);
