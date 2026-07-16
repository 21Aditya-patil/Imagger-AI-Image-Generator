import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector((state) => state.auth.userID) || localStorage.getItem("pendingVerificationUserID");
  const loading = useSelector((state) => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);
  const displayedError = error || authError;

  const handleBackToLogin = () => {
    localStorage.removeItem("pendingVerificationUserID");
    navigate("/auth");
  };

  const handleVerify = async () => {
    if (loading) return;
    if (!userID) {
      setError("Please register or login again to request a verification OTP.");
      return;
    }

    setError("");
    const res = await dispatch(verify({ userID, otp }));

    if (res.payload?.token) {
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white px-4">
      <div className="bg-[#0f172a] border border-slate-700 p-6 sm:p-8 rounded-xl w-full max-w-[350px] shadow-lg text-center">

        <h2 className="text-xl font-semibold mb-5">Enter OTP</h2>

        {displayedError && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-600 rounded-lg text-red-400 text-sm">
            {displayedError}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 mb-4 rounded bg-slate-700 outline-none text-center"
          value={otp}
          disabled={loading}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <button
          onClick={handleBackToLogin}
          disabled={loading}
          className="w-full mt-3 text-sm text-blue-300 hover:text-blue-200 disabled:opacity-60"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
