import { Button } from "antd";
import { NavLink, Outlet } from "react-router-dom";

export default function Others() {
  return (
    <div>
      <div className="w-[315px] flex items-center gap-[8px]">
        <NavLink to="categories">
          {({ isActive }) => (
            <Button type={isActive ? "primary" : "default"}>Categories</Button>
          )}
        </NavLink>
        <NavLink to="brands">
          {({ isActive }) => (
            <Button type={isActive ? "primary" : "default"}>Brands</Button>
          )}
        </NavLink>
        <NavLink to="banners">
          {({ isActive }) => (
            <Button type={isActive ? "primary" : "default"}>Banners</Button>
          )}
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
