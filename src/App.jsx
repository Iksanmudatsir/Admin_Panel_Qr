import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { useEffect } from "react";
import { getToken } from "./utils/auth";
import NotFound from "./component/NotFound";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getToken();

  useEffect(() => {
    console.log('dasdada', location.pathname.split('/')[1])
    if (!token) {
      navigate('/login')
    } else {
      if (location.pathname.split('/')[1] == 'dashboard') {
        navigate(location.pathname)
      } else {
        navigate('*')
      }
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
