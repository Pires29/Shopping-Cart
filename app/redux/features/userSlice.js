import { useEffect } from "react";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  displayName: ""
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      console.log("OLHELE", state.user);
    },
    setDisplayName(state, action) {
      state.displayName = action.payload;
      console.log("DISPLAY_NAME", state.user);
    },
    clearUser(state) {
      state = initialState;
      console.log("Clear user", state.user);
    },
  },
});

export const { setUser, clearUser, setDisplayName } = userSlice.actions;
export default userSlice.reducer;
