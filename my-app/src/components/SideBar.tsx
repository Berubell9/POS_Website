import { NavLink } from "react-router-dom";
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SideBar = () => {
  return (
    <div className="h-full bg-white text-black w-16 md:w-64 transition-all duration-300">
      {/* ชื่อร้าน */}
      <div className="p-4 flex items-center gap-3">
        <img src="/crepe.png" className="w-10 h-10" />
        <div>
          <h2 className="text-2xl font-extrabold hidden md:block">เครปญี่ปุ่น</h2>
          <p className="text-sm text-gray-500 font-light hidden md:block">ระบบ POS</p>
        </div>
      </div>

      {/* เส้นคั่น */}
      <hr className="text-gray-200" />

      {/* เมนูของ Sidebar */}
      <div className="p-2">
        {/* Home Page*/}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex p-3 md:p-4 mb-2 rounded-md transition
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <HomeFilledIcon />
          <p className="ml-2 hidden md:inline">หน้าแรก</p>
        </NavLink>
        
        {/* Menu Page*/}
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex p-3 md:p-4 mb-2 rounded-md transition
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <RestaurantMenuIcon />
          <p className="ml-2 hidden md:inline">เมนู</p>
        </NavLink>
        
        {/* Order Page */}
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex p-3 md:p-4 mb-2 rounded-md transition
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <ShoppingCartIcon />
          <p className="ml-2 hidden md:inline">ออเดอร์</p>
        </NavLink>

        {/* Manage Menu Page */}
        <NavLink
          to="/manage-menu"
          className={({ isActive }) =>
            `flex p-3 md:p-4 mb-2 rounded-md transition
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <MenuBookIcon />
          <p className="ml-2 hidden md:inline">จัดการเมนู</p>
        </NavLink>

        {/* DashBoard Page */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex p-3 md:p-4 mb-2 rounded-md transition
            ${isActive ? "text-white bg-pink-400 shadow-md" : "hover:bg-gray-100"}`
          }>
          <EqualizerIcon />
          <p className="ml-2 hidden md:inline">ยอดขาย</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;