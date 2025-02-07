import React, { useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import routes from "../../config/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpired } from "../../utils/checkTokenExpired";
import { logOut } from "../../features/user/userSlice";

export default function ManageLayout({ children }) {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.user_token);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const publicPages = [routes.manage_create, routes.profile, routes.posts];

    if (publicPages.includes(location.pathname)) {
      console.log(token);

      if (isTokenExpired(token) || token === "") {
        navigate("/login");
        dispatch(logOut());
      }
    }
  }, [navigate, token]);

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="min-w-[250px]">
          <Navbar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
