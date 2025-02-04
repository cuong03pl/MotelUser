import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_token: null,
    user_id: null,
  },
  reducers: {
    setUser: (state, actions) => {
      state.user_token = actions.payload;
    },
    setUserId: (state, actions) => {
      state.user_id = actions.payload;
    },
    logOut: (state, action) => {
      state.user_token = "";
    },
  },
});

export const { setUser, logOut, setUserId } = userSlice.actions;

export default userSlice.reducer;
