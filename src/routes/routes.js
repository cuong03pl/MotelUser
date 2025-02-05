import routes from "../config/routes";
import DetailsPage from "../pages/DetailsPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CreatePage from "../pages/Manage/CreatePage";
import PostsPage from "../pages/Manage/PostsPage";
import ProfilePage from "../pages/Manage/ProfilePage";
import NewsPage from "../pages/NewsPage";
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
  {
    path: routes.news,
    component: <NewsPage />,
  },
  {
    path: routes.manage_create,
    component: <CreatePage />,
    manage: true,
  },
  {
    path: routes.profile,
    component: <ProfilePage />,
    manage: true,
  },
  {
    path: routes.posts,
    component: <PostsPage />,
    manage: true,
  },
];
