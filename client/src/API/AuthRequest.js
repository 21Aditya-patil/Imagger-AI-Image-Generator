const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

// REGISTER
export const registerUser = async (data) => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Registration failed")
    }

    return res.json()
}

// VERIFY OTP
export const verifyOTP = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "OTP verification failed")
  }

  return res.json();
};

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || "Login failed")
  }

  return res.json();
};