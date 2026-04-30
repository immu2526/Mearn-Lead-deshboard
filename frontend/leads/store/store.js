import { configureStore } from "@reduxjs/toolkit";

import leadsReducer from "./leads-slice/index";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});

export default store;
