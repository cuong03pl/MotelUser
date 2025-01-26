import routes from "../config/routes";
import DetailsPage from "../pages/DetailsPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const publicRoutes = [
  {
    path: routes.home,
    component: <HomePage />,
  },
  {
    path: routes.login,
    component: <LoginPage />,
  },
  {
    path: routes.register,
    component: <RegisterPage />,
  },
  {
    path: routes.details,
    component: <DetailsPage />,
  },
];
