import { configureStore } from "@reduxjs/toolkit";
import etherReducer from "./";

export default configureStore({
  reducer: {
    ether: etherReducer,
  },
  devTools: true,
});
