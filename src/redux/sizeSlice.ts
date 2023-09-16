import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SizeSliceType } from "../types/sizeTypes";

const initialState: SizeSliceType = {
  width: 0,
  height: 0,
};

const sizeSlice = createSlice({
  name: "windowSize",
  initialState,
  reducers: {
    setWindowSize(
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

const sizeReducer = sizeSlice.reducer;
export const { setWindowSize } = sizeSlice.actions;
export default sizeReducer;
