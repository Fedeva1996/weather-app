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
      console.log(state.value);
    },
    removeSaveCities: (state, action) => {
      state.value = state.value.filter(
        (city) => city.name !== action.payload.name
      );
      console.log(state.value);
    },
  },
});

export const { setCoords } = coordsSlice.actions;
export const { setSaveCities, removeSaveCities } = citiesSlice.actions;

export const coordsReducer = coordsSlice.reducer;
export const citiesReducer = citiesSlice.reducer;
