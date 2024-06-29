import { useMutation } from '@tanstack/react-query';
import { createUserApi, CreateUserApiParams } from '../../api/users';

const useCreateUser = () => {
  return useMutation({
    mutationFn: (params: CreateUserApiParams) => createUserApi(params),
  });
};

export default useCreateUser;
