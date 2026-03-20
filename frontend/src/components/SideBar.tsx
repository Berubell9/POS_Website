import { NavLink } from "react-router-dom";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import type { ElementType } from "react";

type MenuItem = {
  to: string;
  label: string;
  icon: ElementType;
};

const menuItems: MenuItem[] = [
  { to: "/", label: "หน้าแรก", icon: StorefrontOutlinedIcon },
  { to: "/menu", label: "เมนู", icon: RestaurantOutlinedIcon },
  { to: "/order", label: "ออเดอร์", icon: DescriptionOutlinedIcon },
  { to: "/manage-menu", label: "จัดการเมนู", icon: MenuBookIcon },
  { to: "/dashboard", label: "ยอดขาย", icon: AssessmentOutlinedIcon },
  { to: "/setting", label: "ตั้งค่า", icon: SettingsOutlinedIcon },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center rounded-md transition p-3.5 md:p-3 ${
    isActive ? "bg-pink-400 text-white shadow-md" : "hover:bg-gray-100"
  }`;

const SideBar = () => {
  return (
    <div className="h-full w-16 md:w-60 bg-white p-2 py-4 md:p-4 text-gray-800 shadow-xl transition-all">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-2 pb-4">
        <img src="/crepe.png" className="h-10 w-10 object-contain" />
        <div className="ml-1">
          <h2 className="hidden text-2xl font-extrabold text-pink-400 md:block">
            เครปญี่ปุ่น
          </h2>
          <p className="hidden text-sm font-light text-gray-500 md:block">
            ระบบ POS
          </p>
        </div>
      </div>

      {/* SideBar Menu  */}
      <div className="mt-2 space-y-2">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navClass}>
            <Icon sx={{ fontSize: 20 }} />
            <p className="ml-2 hidden md:inline">{label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;