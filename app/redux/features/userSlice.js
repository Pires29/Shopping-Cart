import { useEffect } from "react";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
 user: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      console.log("OLHELE", state.user)
    },
    clearUser (state) {
      state.user = null
      console.log("Clear user", state.user)
    }

  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
