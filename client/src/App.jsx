import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home";
import History from "./Pages/History";
import Auth from "./Pages/Auth";
import VerifyOTP from "./Pages/VerifyOTP";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/health`, {
      cache: "no-store",
    }).catch((err) => console.log(err));
  }, [BASE_URL]);

  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/verify" element={<VerifyOTP />} />

      {/* Protected Routes */}
      <Route
        path="/chat"
        element={token ? <Chat /> : <Navigate to="/auth" />}
      />

      <Route
        path="/history"
        element={token ? <History /> : <Navigate to="/auth" />}
      />
    </Routes>
  );
}

export default App;
