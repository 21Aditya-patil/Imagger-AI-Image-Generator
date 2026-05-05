import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { generateImage } from "../API/imageRequest";

export const generate = createAsyncThunk(
  "image/generate",
  async (data, thunkAPI) => {
    try {
      return await generateImage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState: {
    image: null,
    loading: false,  // ← was null, should be false
    error: null,
  },
  reducers: {
    clearError: (state) => { 
      state.error = null;
    },
    clearImage: (state) => {
      state.image = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generate.pending, (state) => {
        state.loading = true;
        state.error = null;    // ← clear previous error on new request
      })
      .addCase(generate.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload;
      })
      .addCase(generate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearImage } = imageSlice.actions;
export default imageSlice.reducer;