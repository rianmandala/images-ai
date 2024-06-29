import axios from "axios";
import User from "../model/user/types";
import { HOSTNAME_API } from "../model/constants";

interface UpdateProfileMutationParams {
  userId: string;
  name: string;
  photo: string;
}

export interface CreateUserApiParams {
  name: string;
  email: string;
  photo: string;
  userId: string;
  providerId: string;
}

export const updateProfileApi = (params: UpdateProfileMutationParams) => {
  return axios
    .post<User>(
      `${HOSTNAME_API}api/v1/user/update`,
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

export const getUserApi = (userId: string) => {
  return axios
    .get<User>(`${HOSTNAME_API}api/v1/user/${userId}`)
    .then((res) => res.data);
};

export const createUserApi = (params: CreateUserApiParams) => {
  return axios
    .post<User>(
      `${HOSTNAME_API}api/v1/user/create`,
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
