import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, verifyOTP, loginUser } from "../API/AuthRequest";

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await registerUser(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// VERIFY OTP
export const verify = createAsyncThunk(
  "auth/verify",
  async (data, thunkAPI) => {
    try {
      return await verifyOTP(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await loginUser(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userID: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userID = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("pendingVerificationUserID");
    }
  },
  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userID = action.payload.userID;
        state.error = null;
        localStorage.setItem("pendingVerificationUserID", action.payload.userID);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // VERIFY
      .addCase(verify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userID = null;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
        localStorage.removeItem("pendingVerificationUserID");
      })
      .addCase(verify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.token) {
          state.token = action.payload.token;
          state.userID = null;
          localStorage.setItem("token", action.payload.token);
        } else if (action.payload.userID) {
          state.userID = action.payload.userID;
          localStorage.setItem("pendingVerificationUserID", action.payload.userID);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
