import { createSlice } from "@reduxjs/toolkit";

const coordsSlice = createSlice({
  name: "coords",
  initialState: {
    value: [],
  },
  reducers: {
    setCoords: (state, action) => {
      state.value = action.payload;
      //console.log(state.value);
    },
  },
});
const citiesSlice = createSlice({
  name: "saveCities",
  initialState: {
    value: [],
  },
  reducers: {
    setSaveCities: (state, action) => {
      state.value = [...state.value, action.payload];
      //console.log(state.value);
    },
    removeSaveCities: (state, action) => {
      const index = state.value.indexOf(action.payload);
      if (index > -1) { // only splice array when item is found
        state.value.splice(index, 1); // 2nd parameter means remove one item only
      }
      console.log(state.value);
    },
  },
});

export const { setCoords } = coordsSlice.actions;
export const { setSaveCities, removeSaveCities } = citiesSlice.actions;

export const coordsReducer = coordsSlice.reducer;
export const citiesReducer = citiesSlice.reducer;
