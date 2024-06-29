import { Tabs, TabsProps } from 'antd';
import InfinitePosts from '../../components/InfinitePosts';
import UserInfo from './components/UserInfo';

const Profile = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Collections',
      children: <InfinitePosts gridRow={4} action="my-post" />,
    },
    {
      key: '2',
      label: 'Favorites',
      children: <InfinitePosts gridRow={4} action="my-favorite" />,
    },
  ];

  return (
    <div className="grid md:grid-cols-[25%_75%] grid-cols-1 md:p-6 p-3">
      <UserInfo />
      <div className="rounder md:ml-6 md:mt-0 mt-3 bg-white shadow-sm p-3 md:p-6">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Profile;
