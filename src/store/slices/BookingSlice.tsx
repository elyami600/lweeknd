import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveBooking } from "@/src/utils/api";
import { RootState } from "@/src/store/store";

// Booking Interfaces
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

type NewBookingInput = Omit<Booking, "id">;

// Async Thunk
export const createBooking = createAsyncThunk<
  Booking, // return type
  NewBookingInput, // input type
  { rejectValue: string } // reject type
>(
  "booking/createBooking",
  async (bookingData, { dispatch, rejectWithValue }) => {
    const { user_id, service, stylist_id } = bookingData;

    if (!user_id || !service || !stylist_id) {
      return rejectWithValue("Please fill out all required fields.");
    }

    try {
      const newBooking = await saveBooking(bookingData);

      if(user_id) {
        dispatch(addBooking(newBooking))

      }
      return newBooking;
      

    } catch (error: any) {
      return rejectWithValue("Booking failed: " + error.message);
    }
  }
);

// Booking Slice State
interface BookingState {
  bookings: Record<string, Booking>;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: BookingState = {
  bookings: {},
  loading: false,
  error: null,
};

// Booking Slice
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
    updateBookingStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const { id, status } = action.payload;
      if (state.bookings[id]) {
        state.bookings[id].status = status;
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      delete state.bookings[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        const booking = action.payload;
        state.bookings[booking.id] = booking;
        state.loading = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error occurred during booking.";
        console.error("Booking creation failed:", action.payload);
      });
  },
});

// Actions & Reducer
export const {
  receiveBookings,
  addBooking,
  updateBookingStatus,
  deleteBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
