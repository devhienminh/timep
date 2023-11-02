import { configureStore } from "@reduxjs/toolkit";
import pointReducer from "./slice/pointSlice";
import accessReducer from "./slice/accessSlice";

const store = configureStore({
  reducer: {
    point: pointReducer,
    access: accessReducer,
  },
});

export default store;
