import getConfig from "next/config";

import { createSlice } from "@reduxjs/toolkit";

const accessSlice = createSlice({
  name: "access",
  initialState: new Date(),
  reducers: {
    setTimeAccess: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTimeAccess } = accessSlice.actions;
export default accessSlice.reducer;
