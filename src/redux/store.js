import { configureStore } from "@reduxjs/toolkit";
import setCoords from "./reducers";

const store = configureStore({
  reducer: {
    coords: setCoords,
  },
});

export default store;