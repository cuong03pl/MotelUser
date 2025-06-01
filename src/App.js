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
import { GetUserByToken } from "./services/fetchAPI";
import signalRService from "./services/signalRService";

function App() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.user_token);
  const user = useSelector((state) => state.user?.user_data);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const publicPages = [routes.register];

    if (!publicPages.includes(location.pathname)) {
      if (isTokenExpired(token) || token === "") {
        dispatch(logOut());
      }
    }
  }, [navigate, token]);

  useEffect(() => {
    const initializeSignalR = async () => {
      if (user?.id) {
        try {
          await signalRService.startConnection();
        } catch (error) {
          console.error("Failed to initialize SignalR connection:", error);
        }
      }
    };

    initializeSignalR();

    return () => {
      if (signalRService.isConnected()) {
        signalRService.stopConnection();
      }
    };
  }, [user?.id]);

  useEffect(() => {
    const fetchAPI = async () => {
      const user_data = jwtDecode(token);
      await GetUserByToken(user_data?.sub).then((res) => {
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
