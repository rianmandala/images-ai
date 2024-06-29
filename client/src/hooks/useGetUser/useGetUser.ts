import { useQuery } from '@tanstack/react-query';
import { getUserApi } from '../../api/users';
import { USER_QUERY_KEY } from '../../constants';

const useGetUser = (userId: string) => {
  return useQuery({
    enabled: userId !== '',
    queryKey: USER_QUERY_KEY,
    queryFn: () => getUserApi(userId),
  });
};

export default useGetUser;
