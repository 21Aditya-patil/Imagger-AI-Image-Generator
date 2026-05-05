import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveImg, getImg, deleteImg } from "../API/saveRequest";

export const savesImage = createAsyncThunk(
  "image/save",
  async ({ imageUrl, prompt, style, token }, thunkAPI) => {
    try {
      return await saveImg({ imageUrl, prompt, style }, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getsImage = createAsyncThunk(
  "image/get",
  async (token, thunkAPI) => {
    try {
      return await getImg(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteImage = createAsyncThunk(
  "image/delete",
  async ({ imageId, token }, thunkAPI) => {
    try {
      return await deleteImg(imageId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const saveSlice = createSlice({
  name: "save",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(savesImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savesImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.images.unshift(action.payload); // add new image
      })
      .addCase(savesImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET
      .addCase(getsImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getsImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload.images;
      })
      .addCase(getsImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Remove the deleted image from the array
        state.images = state.images.filter(img => img._id !== action.meta.arg.imageId);
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default saveSlice.reducer;
