import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import useGetUser from '../../hooks/useGetUser';

const userIdFromLocalStorage = window.localStorage.getItem('userId');

const initialValue = {
  userId: '',
  isLogin: Boolean(userIdFromLocalStorage),
  email: '',
  name: '',
  photo: '',
};

const UserContext = createContext<typeof initialValue>(initialValue);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const auth = getAuth();
  const [userId, setUserId] = useState('');

  const { data: user } = useGetUser(userIdFromLocalStorage || userId || '');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        setUserId(user?.uid || '');
        window.localStorage.setItem('userId', user?.uid || '');
      } else {
        setUserId('');
        window.localStorage.removeItem('userId');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const userNormalizer = useMemo(
    () => ({
      userId: userId || userIdFromLocalStorage || '',
      isLogin: Boolean(userId || userIdFromLocalStorage),
      email: userId ? user?.email || '' : '',
      name: userId ? user?.name || '' : '',
      photo: userId ? user?.photo || '' : '',
    }),
    [userId, userIdFromLocalStorage, user]
  );

  return (
    <UserContext.Provider value={userNormalizer}>
      {children}
    </UserContext.Provider>
  );
};
