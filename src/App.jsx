// App.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./index.css";

import { AUTHENTICATION } from "constants/AuthConstant";
import { ADMIN_ROLE } from "constants/RoleConstant";
import { authSignIn } from "constants/routeConstant";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { getInfoUser } from "services/user.service";
import {
  loginUser,
  logoutUser,
  selectIsAuthenticated,
} from "store/userReducer";
import { getItemFromCookieStorage } from "utils/cookie";
import To404NotFound from "views/admin/system/404NotFound";

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    React.cloneElement(element, rest)
  ) : (
    <Navigate to={authSignIn} replace />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const token = getItemFromCookieStorage(AUTHENTICATION);
    if (token) {
      getUser();
    } else {
      dispatch(logoutUser());
      navigate("auth/sign-in");
    }
  }, []);
  const getUser = async () => {
    try {
      const userInfo = await getInfoUser();
      if (userInfo.data !== undefined) {
        dispatch(loginUser(userInfo.data));

        if (userInfo?.data?.roles.includes(ADMIN_ROLE)) {
          if (pathname !== "/admin/default") {
            navigate(pathname);
          } else {
            navigate("/admin/default");
          }
        }
      }
    } catch (error) {
      dispatch(logoutUser());
      navigate("auth/sign-in");
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      if (pathname !== "/admin/default") {
        navigate(pathname);
      } else {
        navigate("/admin/default");
      }
    }
  }, []);
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route
        path="admin/*"
        element={<ProtectedRoute element={<AdminLayout />} />}
      />

      <Route path="/" element={<Navigate to="/admin/default" replace />} />
      <Route path="*" element={<To404NotFound />} />
    </Routes>
  );
};

export default App;
