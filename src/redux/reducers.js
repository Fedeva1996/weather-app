import { createSlice } from "@reduxjs/toolkit";

const coordsSlice = createSlice({
  name: "coords",
  initialState: {
    value: [],
  },
  reducers: {
    setCoords: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

export const { setCoords } = coordsSlice.actions;
export default coordsSlice.reducer;
