import getConfig from "next/config";

import { createSlice } from "@reduxjs/toolkit";

const { publicRuntimeConfig } = getConfig();
const { timeToPoint } = publicRuntimeConfig;

const pointSlice = createSlice({
  name: "point",
  initialState: { time: 0, point: 0 },
  reducers: {
    incrementPoint: (state) => {
      state.time += 1;
      if (state.time > timeToPoint) {
        state.time = 0;
        state.point += 1;
      }
    },
    setDefaultPoint: (state, action) => {
      state.point = action.payload;
    },
  },
});

export const { incrementPoint, setDefaultPoint } = pointSlice.actions;
export default pointSlice.reducer;
