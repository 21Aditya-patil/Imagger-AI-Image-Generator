import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector((state) => state.auth.userID);
  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleVerify = async () => {
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

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-600 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 mb-4 rounded bg-slate-700 outline-none text-center"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
}