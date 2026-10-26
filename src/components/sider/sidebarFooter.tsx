import { Menu } from "antd";
import { LogOut } from "lucide-react";

interface Props {
  onLogout: () => void;
}

const SidebarFooter = ({ onLogout }: Props) => {
  const items = [
    {
      key: "1",
      icon: (
        <span>
          <LogOut size={18} />
        </span>
      ),
      label: "Logout",
      onClick: onLogout,
    },
  ];

  return <Menu defaultSelectedKeys={["0"]} mode="inline" items={items} />;
};

export default SidebarFooter;
