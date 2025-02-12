import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user_token: null,
    user_id: null,
    user_data: null,
  },
  reducers: {
    setUserToken: (state, actions) => {
      state.user_token = actions.payload;
    },
    setUser: (state, actions) => {
      state.user_data = actions.payload;
    },
    updateUser: (state, actions) => {
      state.user_data.fullName = actions.payload.fullName;
      state.user_data.phoneNumber = actions.payload.phoneNumber;
    },
    setUserId: (state, actions) => {
      state.user_id = actions.payload;
    },
    logOut: (state, action) => {
      state.user_token = "";
      state.user_id = "";
      state.user_data = "";
    },
  },
});

export const { setUserToken, logOut, setUserId, setUser, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
