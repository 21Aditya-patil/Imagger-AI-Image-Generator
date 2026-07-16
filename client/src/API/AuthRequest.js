import { apiUrl, readErrorMessage } from "./config";

// REGISTER
export const registerUser = async (data) => {
    const res = await fetch(apiUrl("/api/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error(await readErrorMessage(res, "Registration failed"))
    }

    return res.json()
}

// VERIFY OTP
export const verifyOTP = async (data) => {
  const res = await fetch(apiUrl("/api/auth/otp"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res, "OTP verification failed"))
  }

  return res.json();
};

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res, "Login failed"))
  }

  return res.json();
};
