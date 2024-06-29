import { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Button } from 'antd';

import { useUserContext } from './context/user';
import UserMenu from './components/UserMenu';
import Home from './pages/Home';
import { HeartFilled } from '@ant-design/icons';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Loader from './components/Loader';

function App() {
  const { isLogin } = useUserContext();

  return (
    <Router>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-3 border-b border-b-[#e6ebf4]">
        <Link to="/" className="font-bold text-xl">
          Images AI
        </Link>
        <div>
          {isLogin ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="mr-3">
                <Button size="middle" type="primary" ghost htmlType="button">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="middle" type="primary" htmlType="button">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" Component={Home} />
          <Route
            path="/register"
            element={
              isLogin ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<Loader />}>
                  <Register />
                </Suspense>
              )
            }
          />
          <Route
            path="/login"
            element={
              isLogin ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              )
            }
          />
          <Route
            path="/create"
            element={
              isLogin ? (
                <Suspense fallback={<Loader />}>
                  <CreatePost />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLogin ? (
                <Suspense fallback={<Loader />}>
                  <Profile />
                </Suspense>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/verify-email"
            element={
              isLogin ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<Loader />}>
                  <VerifyEmail />
                </Suspense>
              )
            }
          />
        </Routes>
      </main>
      <footer className="flex justify-center items-center p-3">
        Made with <HeartFilled style={{ color: '#F94D63', margin: '0 4px' }} />{' '}
        from rian mandala putra
      </footer>
    </Router>
  );
}

export default App;
