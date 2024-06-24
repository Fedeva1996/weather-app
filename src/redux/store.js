import { configureStore } from "@reduxjs/toolkit";
import { coordsReducer, citiesReducer } from "./reducers";

const store = configureStore({
  reducer: {
    coords: coordsReducer,
    saveCities: citiesReducer,
  },
});

export default store;