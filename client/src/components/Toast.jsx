import React, { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-slideIn text-sm sm:text-base z-50`}
    >
      {message}
    </div>
  );
}

export default Toast;
