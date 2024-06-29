import User from '../user/types';

export interface Post {
  _id: string;
  user: User;
  name: string;
  prompt: string;
  photo: string;
  thumbnail: string;
  placeholder: string;
  isPrivate: boolean;
  likes: string[];
}
