import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
      <NavLink to="/" className="text-lg font-semibold">
        Educational Platform
      </NavLink>
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/account"
              className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
            >
              Account
            </NavLink>
          </>
        )}
        {!isLoggedIn && (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "text-yellow-300" : "")}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
