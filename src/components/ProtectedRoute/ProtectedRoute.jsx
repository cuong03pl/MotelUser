import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.user_data);
  const token = useSelector((state) => state?.user?.user_token);
  const location = useLocation();

  useEffect(() => {
    if (!user || !token) {
      toast.error('Bạn cần đăng nhập để truy cập trang này', {
        position: 'bottom-right',
        pauseOnHover: false,
      });
    }
  }, [user, token]);

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute; 