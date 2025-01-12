import { configureStore } from "@reduxjs/toolkit";
import disasterReducer from "./disasterSlice";

const store = configureStore({
  reducer: {
    disaster: disasterReducer,
  },
});

export default store;
