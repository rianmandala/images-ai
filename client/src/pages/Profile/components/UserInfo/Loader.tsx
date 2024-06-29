import { Skeleton } from 'antd';

function UserInfoLoader() {
  return (
    <div className="flex self-start height-[400px] flex-col items-center bg-white shadow-sm rounded text-center p-6">
      <Skeleton.Avatar className="!w-[100px] !h-[100px]" />
      <Skeleton.Button className="!w-[120px] !h-[16px] mt-1" />
      <Skeleton.Button className="!w-[120px] !h-[16px] mt-1" />
      <Skeleton.Button className="!w-[90px] !h-[28px] mt-2" />
    </div>
  );
}

export default UserInfoLoader;
