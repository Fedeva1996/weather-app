import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "./reducers";

const store = configureStore({
  reducer: {
    coords: coordsReducer,
  },
});

export default store;