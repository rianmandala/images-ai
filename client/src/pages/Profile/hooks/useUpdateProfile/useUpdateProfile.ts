import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileApi } from '../../../../api/users';
import {
  MY_COLLECTIONS_QUERY_KEY,
  MY_FAVORITES_QUERY_KEY,
  USER_QUERY_KEY,
} from '../../../../constants';

interface UpdateProfileMutationParams {
  userId: string;
  name: string;
  photo: string;
}

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateProfileMutationParams) =>
      updateProfileApi(params),
    onSuccess: () => {
      queryClient.invalidateQueries(USER_QUERY_KEY);
      queryClient.invalidateQueries(MY_COLLECTIONS_QUERY_KEY);
      queryClient.invalidateQueries(MY_FAVORITES_QUERY_KEY);
    },
  });
};

export default useUpdateProfile;
