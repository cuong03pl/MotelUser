import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_token: null,
  },
  reducers: {
    setUser: (state, actions) => {
      state.user_token = actions.payload;
    },
    logOut: (state, action) => {
      state.user_token = "";
    },
  },
});

export const { setUser, logOut } = userSlice.actions;

export default userSlice.reducer;
