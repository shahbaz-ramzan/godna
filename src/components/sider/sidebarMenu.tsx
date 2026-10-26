import { Menu } from "antd";

interface Props {
  menuItems: any[];
  selectedKey: string[];
  onMenuClick?: () => void;
}

const SidebarMenu = ({ menuItems, selectedKey, onMenuClick }: Props) => (
  <Menu
    selectedKeys={selectedKey}
    mode="inline"
    items={menuItems}
    onClick={onMenuClick}
  />
);

export default SidebarMenu;
