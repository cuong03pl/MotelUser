import routes from "../config/routes";
import CategoryPage from "../pages/CategoryPage";
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
import PaymentPage from "../pages/Manage/PaymentPage";
import RegisterPage from "../pages/RegisterPage";
import ComparePage from "../pages/ComparePage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ChatPage from "../pages/ChatPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

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
    path: routes.chat,
    component: <ProtectedRoute><ChatPage /></ProtectedRoute>,
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
    path: routes.payment,
    component: <PaymentPage />,
    manage: true,
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
  }
];
