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
      const stateAsObject = JSON.parse(JSON.stringify(state.value));
      console.log("State before removal:", stateAsObject);
      console.log("Payload:", action.payload);
      state.value = state.value.filter(
        (item) => item[0] !== action.payload[0] || item[1] !== action.payload[1]
      );
      console.log(
        "State after removal:",
        JSON.parse(JSON.stringify(state.value))
      );
    },
  },
});

export const { setCoords } = coordsSlice.actions;
export const { setSaveCities, removeSaveCities } = citiesSlice.actions;

export const coordsReducer = coordsSlice.reducer;
export const citiesReducer = citiesSlice.reducer;
