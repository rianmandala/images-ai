import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <LoadingOutlined style={{ fontSize: '40px' }} />
    </div>
  );
};

export default Loader;
