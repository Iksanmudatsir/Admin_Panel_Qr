import { Routes, Route, Navigate, useNavigate, useLocation, redirect } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { useEffect, useState } from "react";
import { getToken } from "./utils/auth";
import NotFound from "./component/NotFound";
import routes from "./routes";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getToken();

  useEffect(() => {
    const path = location.pathname.split('/');

    if (path[1] !== 'login' && token === undefined) {
      navigate('/login')
    } else if (path[1] === 'login' && token) {
      navigate('/dashboard/home');
    } else if (path[1] !== 'login' && token) {
      if (path[1] == 'dashboard') {
        const isRouteExist = routes[0].pages.filter((elem, i) => elem.path === '/' + path[2])

        if (isRouteExist.length === 0) {
          navigate('/*')
        } else {
          navigate(location.pathname)
        }
      }
    } else {

    }
  }, []);

  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/login" element={<SignIn />} />
      <Route path='*' exact={true} element={<NotFound />} />
      {/* <Route path="*" element={<Navigate to="/dashboard/order" replace />} /> */}
    </Routes>
  );
}

export default App;
