import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Stylist Interface
export interface Stylist {
  id: string;
  name: string;
  profession: string;
  shop_id: string | null;
  services: string[];
  avatarURL: string;
  ratings: number[];
  average_rating: number;
  available_slots: {
    date_time: string;
    status: string;
  }[];
  pricing: Record<string, number>;
  payment_preference: string[];
}

// State Shape
interface StylistState {
  stylists: Record<string, Stylist>;
}

// Initial State
const initialState: StylistState = {
  stylists: {},
};

// Create Slice
const stylistSlice = createSlice({
  name: "stylists",
  initialState,
  reducers: {
    receiveStylists: (state, action: PayloadAction<Record<string, Stylist>>) => {
      state.stylists = { ...state.stylists, ...action.payload };
    },
  },
});

// Exports
export const { receiveStylists } = stylistSlice.actions;
export default stylistSlice.reducer;
