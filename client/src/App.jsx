import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./Pages/Chat";
import Home from "./Pages/Home";
import History from "./Pages/History";
import Auth from "./Pages/Auth";
import VerifyOTP from "./Pages/VerifyOTP";
import ServerLoading from "./components/ServerLoading";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiUrl } from "./API/config";

function App() {
  const [serverLoading, setServerLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let timer;

    const wakeServer = async () => {
      try {
        const res = await fetch(apiUrl("/health"), {
          cache: "no-store",
        });

        if (res.ok && active) {
          setServerLoading(false);
          return;
        }
      } catch (err) {
        console.log(err);
      }

      if (active) {
        timer = setTimeout(wakeServer, 4000);
      }
    };

    wakeServer();

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const token = useSelector((state) => state.auth.token);

  if (serverLoading) {
    return <ServerLoading />;
  }

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
