import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
import { useEffect } from "react";
import { getToken } from "./utils/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      navigate('/dashboard/order');
    }
  }, []);

  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/login" element={<SignIn />} />
      {/* <Route path="*" element={<Navigate to="/dashboard/order" replace />} /> */}
    </Routes>
  );
}

export default App;
