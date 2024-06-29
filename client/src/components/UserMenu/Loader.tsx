import { Skeleton } from 'antd';

function UserMenuLoader() {
  return (
    <div className="flex justify-center items-center">
      <Skeleton.Button className="!w-[98px] !h-[32px] mr-3" />
      <Skeleton.Avatar className="!w-[46px] !h-[46px]" />
    </div>
  );
}

export default UserMenuLoader;
