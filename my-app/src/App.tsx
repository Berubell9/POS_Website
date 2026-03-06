import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import ManageMenu from "./pages/ManageMenu";
import DashBoard from "./pages/DashBoard";

export default function App() {
  return (
    <div className="h-full w-full font-kanit">
      <BrowserRouter>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/manage-menu" element={<ManageMenu />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>

    </div>
  )
}