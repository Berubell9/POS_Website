import { NavLink } from "react-router-dom";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

const SideBar = () => {
  return (
    <div className="h-full p-2 md:p-4 bg-white text-gray-800 w-16 md:w-60 transition-all shadow-xl">
      {/* ชื่อร้าน */}
      <div className="p-2 flex items-center gap-3 border-b border-gray-200">
        <img src="/crepe.png" className="w-10 h-10 object-contain" />
        <div className="ml-1">
          <h2 className="text-2xl text-pink-400 font-extrabold hidden md:block">เครปญี่ปุ่น</h2>
          <p className="text-sm text-gray-500 font-light hidden md:block">ระบบ POS</p>
        </div>
      </div>

      {/* เมนูของ Sidebar */}
      <div className="mt-2 space-y-2">
        {/* Home Page*/}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex p-3.5 md:p-3 rounded-md transition items-center
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <StorefrontOutlinedIcon sx={{ fontSize: 20 }}/>
          <p className="ml-2 hidden md:inline">หน้าแรก</p>
        </NavLink>
        
        {/* Menu Page*/}
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex p-3.5 md:p-3 rounded-md transition items-center
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <RestaurantOutlinedIcon sx={{ fontSize: 20 }} />
          <p className="ml-2 hidden md:inline">เมนู</p>
        </NavLink>
        
        {/* Order Page */}
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex p-3.5 md:p-3 rounded-md transition items-center
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <DescriptionOutlinedIcon sx={{ fontSize: 20 }}/>
          <p className="ml-2 hidden md:inline">ออเดอร์</p>
        </NavLink>

        {/* Manage Menu Page */}
        <NavLink
          to="/manage-menu"
          className={({ isActive }) =>
            `flex p-3.5 md:p-3 rounded-md transition items-center
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <MenuBookIcon sx={{ fontSize: 20 }}/>
          <p className="ml-2 hidden md:inline">จัดการเมนู</p>
        </NavLink>

        {/* DashBoard Page */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex p-3.5 md:p-3 rounded-md transition items-center
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <AssessmentOutlinedIcon  sx={{ fontSize: 20 }}/>
          <p className="ml-2 hidden md:inline">ยอดขาย</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;