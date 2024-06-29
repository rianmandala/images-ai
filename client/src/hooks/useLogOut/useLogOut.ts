import { signOut, getAuth } from 'firebase/auth';

const useLogOut = () => {
  window.localStorage.removeItem('userId');
  return signOut(getAuth());
};

export default useLogOut;
