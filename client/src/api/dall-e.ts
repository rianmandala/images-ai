import axios from "axios";

import { HOSTNAME_API } from "../model/constants";

interface GenerateImageApiResponse {
  photo: string;
}

export const generateImageApi = (prompt: string) =>
  axios
    .post<GenerateImageApiResponse>(
      `${HOSTNAME_API}api/v1/dalle`,
      {
        prompt,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data);
