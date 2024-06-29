import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Avatar } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useUserContext } from "../../context/user";
import useLogOut from "../../hooks/useLogOut";
import { useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "../../constants";
import UserMenuLoader from "./Loader";

const AvatarProfile = () => {
  const navigate = useNavigate();

  const { photo, name } = useUserContext();
  const queryClient = useQueryClient();

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    switch (e.key) {
      case "1":
        navigate("/profile");
        break;
      case "2":
        useLogOut().then(() => {
          queryClient.invalidateQueries(USER_QUERY_KEY);
          navigate("/");
        });
        break;
      default:
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Profile",
      icon: <UserOutlined />,
      key: "1",
      style: { fontSize: "16px" },
    },
    {
      icon: <LogoutOutlined />,
      label: "Log out",
      key: "2",
      style: { fontSize: "16px" },
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  if (!name) {
    return <UserMenuLoader />;
  }

  return (
    <div className="flex justify-center items-center">
      <Link to="/create" className="mr-3">
        <Button
          className="!flex justify-center items-center"
          icon={<PlusCircleOutlined />}
          size="middle"
          type="primary"
          htmlType="button"
        >
          Create
        </Button>
      </Link>
      <Dropdown
        menu={menuProps}
        placement="bottomRight"
        trigger={["click"]}
        className="cursor-pointer "
        arrow
      >
        {photo ? (
          <Avatar size={48} src={photo} />
        ) : (
          <Avatar
            size={48}
            style={{
              color: "white",
              fontSize: "24px",
            }}
          >
            {name?.[0]}
          </Avatar>
        )}
      </Dropdown>
    </div>
  );
};

export default AvatarProfile;
