import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
export const server = "http://localhost:4000"
export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        userReducer:userReducer.reducer,
    },
    middleware:(mid) =>[...mid(), userAPI.middleware],
});