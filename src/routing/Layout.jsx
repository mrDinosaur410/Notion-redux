import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserLoading,
} from "../redux/slices/userSlice/userSelectors";
import { logOutUser } from "../redux/slices/userSlice/userActions";

export default function Layout() {
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    dispatch(logOutUser());
    navigation("/login");
  };

  return (
    <div className="w-3/4 mx-auto mt-12 text-center sm:w-full">
      <div className="flex justify-between items-center mb-7 sm:mb-5 sm:px-2">
        <p className="md:my-auto sm:my-3">
          {!loading ? `Hello, ${user?.alias}` : "Loading..."}
        </p>
        <nav className="flex gap-5 justify-between text-sm md:justify-normal md:text-base sm:gap-3">
          <NavLink
            to="/"
            end="true"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-lg text-green-500 no-underline"
                : "font-semibold text-lg text-black no-underline"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-lg text-green-500 no-underline"
                : "font-semibold text-lg text-black no-underline"
            }
          >
            Notes
          </NavLink>
          <NavLink
            to="/login"
            onClick={handleLogout}
            className="font-semibold text-lg text-black no-underline"
          >
            Log Out
          </NavLink>
        </nav>
      </div>
      <Outlet />
      <hr className="mt-10" />
      <footer className="flex justify-around text-xs md:text-base sm:flex-col sm:text-center">
        <p className="ml-2.5 sm:ml-0">Created by: Cimur Citoŭ</p>
        <p className="mr-2.5 sm:mr-0">BSU: 2023</p>
      </footer>
    </div>
  );
}
