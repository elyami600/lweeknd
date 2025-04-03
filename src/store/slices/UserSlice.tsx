import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// User Interface
interface User {
  name: string;
  password: string;
  email: string;
  role: string;
  avatarURL: string;
}

// User State Interface
interface UserState {
  users: Record<string, User>; // Store users by ID (email)
  authedUser: string | null; // Stores the email of the authenticated user
}

// Initial State
const initialState: UserState = {
  users: {},
  authedUser: null,
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Receive users (bulk update)
    receiveUsers: (state, action: PayloadAction<Record<string, User>>) => {
      state.users = { ...state.users, ...action.payload }; // ✅ Merge users properly
    },

    // Add a new user
    addUser: (state, action: PayloadAction<User>) => {
      state.users[action.payload.email] = action.payload;
    },

    // Set authenticated user
    setAuthedUser: (state, action: PayloadAction<string | null>) => {
      state.authedUser = action.payload;
    },

    // Logout user (reset auth state)
    logoutUser: (state) => {
      state.authedUser = null;
    },
  },
});

export const { receiveUsers, addUser, setAuthedUser, logoutUser } = UserSlice.actions;
export default UserSlice.reducer;
