import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { Fragment, useEffect } from "react";
import ManageLayout from "./layouts/ManageLayout/ManageLayout";
import { useDispatch, useSelector } from "react-redux";
import routes from "./config/routes";
import { isTokenExpired } from "./utils/checkTokenExpired";
import { logOut, setUser, setUserId } from "./features/user/userSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.user_token);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const publicPages = [
      routes.manage_create,
      routes.profile,
      routes.posts,
      routes.favourite,
    ];

    if (publicPages.includes(location.pathname)) {
      if (isTokenExpired(token) || token === "") {
        navigate("/login");
        dispatch(logOut());
      }
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchAPI = async () => {
      const user_data = jwtDecode(token);
      await axios
        .get(`https://motel.azurewebsites.net/api/Users/${user_data?.sub}`)
        .then((res) => {
          dispatch(setUser(res?.data));
        });
    };
    if (token) {
      fetchAPI();
    }
  }, []);
  return (
    <div className="bg-[#f1f5f9] min-h-screen">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Comp = route.component;
          let Layout = DefaultLayout;
          if (route.layout === null) {
            Layout = Fragment;
          } else if (route.manage === true) {
            Layout = ManageLayout;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{Comp}</Layout>}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
