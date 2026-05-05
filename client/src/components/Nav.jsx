import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../slices/authSlice";

function Nav() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
    setMenuOpen(false);
  };

  const navLinkClass = (isActive) =>
    `relative px-4 py-1 cursor-pointer text-lg transition duration-300 ${isActive
      ? "text-accent after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-accent after:shadow-[0_0_10px_#22D3EE]"
      : "text-white/70 hover:text-white hover:drop-shadow-[0_0_6px_#22D3EE]"
    }`;

  return (
    <div
      className="
      relative w-full px-4 sm:px-6 py-1 flex flex-wrap justify-between items-center
      bg-white/5 backdrop-blur-xl
      border border-white/10 rounded-2xl
      shadow-[0_0_30px_rgba(34,211,238,0.15)]
    "
    >
      {/* Glow Background */}
      <div
        className="
        absolute inset-0 rounded-2xl
        bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent
        blur-2xl opacity-60
      "
      ></div>

      <div className="relative flex w-full justify-between items-center">

        {/* Logo */}
        <h2
          className="
          font-space-grotesk text-xl sm:text-2xl font-bold text-white cursor-pointer
          drop-shadow-[0_0_6px_#22D3EE]
          hover:[filter:drop-shadow(0_0_12px_#22D3EE)]
          transition duration-300
        "
          onClick={() => navigate("/")}
        >
          Imagger
        </h2>

        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-6 px-3 py-1.5 rounded-xl">

          <NavLink to="/">
            {({ isActive }) => (
              <p className={navLinkClass(isActive)}>
                Home
              </p>
            )}
          </NavLink>

          <NavLink to="/chat">
            {({ isActive }) => (
              <p className={navLinkClass(isActive)}>
                Chat
              </p>
            )}
          </NavLink>

          <NavLink to="/history">
            {({ isActive }) => (
              <p className={navLinkClass(isActive)}>
                History
              </p>
            )}
          </NavLink>

        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center">

          {!token ? (
            // LOGIN
            <button
              onClick={() => navigate("/auth")}
              className="
                px-4 py-1.5 rounded-lg
                bg-accent text-black font-medium
                shadow-[0_0_10px_#22D3EE]
                hover:shadow-[0_0_20px_#22D3EE]
                transition
              "
            >
              Login
            </button>
          ) : (
            // LOGOUT
            <button
              onClick={handleLogout}
              className="
                px-4 py-1.5 rounded-lg
                border border-red-400 text-red-400
                hover:bg-red-400 hover:text-black
                transition
              "
            >
              Logout
            </button>
          )}

        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden relative w-full flex flex-col items-center gap-3 py-4 border-t border-white/10 mt-2">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            {({ isActive }) => (
              <p className={navLinkClass(isActive)}>
                Home
              </p>
            )}
          </NavLink>

          <NavLink to="/chat" onClick={() => setMenuOpen(false)}>
            {({ isActive }) => (
              <p className={navLinkClass(isActive)}>
                Chat
              </p>
            )}
          </NavLink>

          <NavLink to="/history" onClick={() => setMenuOpen(false)}>
            {({ isActive }) => (
              <p className={navLinkClass(isActive)}>
                History
              </p>
            )}
          </NavLink>

          {/* Mobile Auth Button */}
          <div className="pt-2">
            {!token ? (
              <button
                onClick={() => { navigate("/auth"); setMenuOpen(false); }}
                className="
                  px-6 py-2 rounded-lg
                  bg-accent text-black font-medium
                  shadow-[0_0_10px_#22D3EE]
                  hover:shadow-[0_0_20px_#22D3EE]
                  transition
                "
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="
                  px-6 py-2 rounded-lg
                  border border-red-400 text-red-400
                  hover:bg-red-400 hover:text-black
                  transition
                "
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;