import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthedUserState {
  userId: string | null;
}

const initialState: AuthedUserState = {
  userId: null,
};

const authedUserSlice = createSlice({
  name: "authedUser",
  initialState,
  reducers: {
    setAuthedUser: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    clearAuthedUser: (state) => {
      state.userId = null;
    }
  }
});

export const { setAuthedUser, clearAuthedUser } = authedUserSlice.actions;
export default authedUserSlice.reducer;
