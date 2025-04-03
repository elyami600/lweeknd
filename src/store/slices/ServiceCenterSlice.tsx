import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// --- Types ---
export interface ServiceCenter {
  id: string;
  name: string;
  type: string;
  location: string;
  stylists: string[];
  services: string[];
  ratings: number[];
  average_rating: number;
  avatarURL: string;
}

interface ServiceCenterState {
  serviceCenters: Record<string, ServiceCenter>; // ✅ Plural for clarity
}

// --- Initial State ---
const initialState: ServiceCenterState = {
  serviceCenters: {},
};

// --- Slice ---
const serviceCenterSlice = createSlice({
  name: "serviceCenters",
  initialState,
  reducers: {
    receiveServiceCenters: (state, action: PayloadAction<Record<string, ServiceCenter>>) => {
      state.serviceCenters = { ...state.serviceCenters, ...action.payload,};
    },
  },
});

export const { receiveServiceCenters } = serviceCenterSlice.actions;
export default serviceCenterSlice.reducer;