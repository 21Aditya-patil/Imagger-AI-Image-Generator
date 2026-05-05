import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userID, error: authError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) navigate("/chat");
    if (userID) navigate("/verify");
  }, [token, userID, navigate]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleSubmit = () => {
    setError("");
    if (isSignup) dispatch(register(form));
    else dispatch(login(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white px-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-6 sm:p-8 w-full max-w-[380px] shadow-xl">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 px-2 py-1 rounded-lg font-bold text-sm">Im</div>
          <h1 className="text-xl font-semibold">Imagger</h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">
          {isSignup ? "Welcome" : "Welcome back"}
        </h2>

        <p className="text-sm text-gray-400 mb-5">
          {isSignup ? (
            <>Already have an account?{" "}
              <span className="text-blue-400 cursor-pointer" onClick={() => setIsSignup(false)}>Login</span>
            </>
          ) : (
            <>Don't have an account?{" "}
              <span className="text-blue-400 cursor-pointer" onClick={() => setIsSignup(true)}>Sign up</span>
            </>
          )}
        </p>

        {/* Toggle Buttons */}
        <div className="flex mb-5 border border-slate-600 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsSignup(false)}
            className={`w-1/2 py-2 transition-colors ${!isSignup ? "bg-slate-700 text-white" : "text-gray-400"}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`w-1/2 py-2 transition-colors ${isSignup ? "bg-slate-700 text-white" : "text-gray-400"}`}
          >
            Register
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-600 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Inputs — NO <form> tag ✅ */}
        <div className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Name"
              className="p-3 rounded-lg bg-slate-800 border border-slate-600 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-slate-800 border border-slate-600 outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-slate-800 border border-slate-600 outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold mt-2 transition-colors"
          >
            {isSignup ? "Register" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}