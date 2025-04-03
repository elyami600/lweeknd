import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Booking Interface
export interface Booking {
  id: string;
  user_id: string;
  service_center_id: string;
  stylist_id: string;
  service: string;
  price: number;
  scheduled_datetime: string;
  status: string;
}

// State Interface
interface BookingState {
  bookings: Record<string, Booking>; // key = booking ID
}

// Initial State
const initialState: BookingState = {
  bookings: {},
};

// Create Slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    receiveBookings: (state, action: PayloadAction<Record<string, Booking>>) => {
      state.bookings = { ...state.bookings, ...action.payload };
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      const booking = action.payload;
      state.bookings[booking.id] = booking;
    },
    updateBookingStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const { id, status } = action.payload;
      if (state.bookings[id]) {
        state.bookings[id].status = status;
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      delete state.bookings[action.payload];
    },
  },
});

// Export actions and reducer
export const {
  receiveBookings,
  addBooking,
  updateBookingStatus,
  deleteBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
