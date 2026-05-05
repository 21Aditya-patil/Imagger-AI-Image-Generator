import { configureStore } from "@reduxjs/toolkit"
import imageReducer from "../slices/imageSlice"
import authReducer from "../slices/authSlice"
import saveReducer from "../slices/saveSlice"

export const store = configureStore({
    reducer: {
        image: imageReducer,
        auth: authReducer,
        save: saveReducer
    }
})