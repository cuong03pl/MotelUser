import routes from "../config/routes";
import CategoryPage from "../pages/CategoryPage";
import DepositedManagePage from "../pages/DepositedManagePage";
import DetailsPage from "../pages/DetailsPage";
import FavouritePage from "../pages/FavouritePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CreatePage from "../pages/Manage/CreatePage";
import PostDetailPage from "../pages/Manage/PostDetailPage";
import PostsPage from "../pages/Manage/PostsPage";
import ProfilePage from "../pages/Manage/ProfilePage";
import NewsPage from "../pages/NewsPage";
import PaymentPage from "../pages/PaymentPage";
import RegisterPage from "../pages/RegisterPage";
import ComparePage from "../pages/ComparePage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

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
    path: routes.forgotPassword,
    component: <ForgotPasswordPage />,
  },
  {
    path: routes.resetPassword,
    component: <ResetPasswordPage />,
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
    path: routes.category,
    component: <CategoryPage />,
  },
  {
    path: routes.favourite,
    component: <FavouritePage />,
  },
  {
    path: routes.deposite,
    component: <DepositedManagePage />,
  },
  {
    path: routes.payment,
    component: <PaymentPage />,
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
  {
    path: routes.post_detail,
    component: <PostDetailPage />,
    manage: true,
  },
  {
    path: routes.compare,
    component: <ComparePage />,
  },
];
