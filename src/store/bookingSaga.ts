// // bookingSaga.ts
// function* handleBooking(action: PayloadAction<BookingPayload>) {
//     try {
//       const response = yield call(api.bookAppointment, action.payload);
//       yield put(bookingSuccess(response));
//       yield put(updateStylistAvailability(...));
//     } catch (error) {
//       yield put(bookingFailed(error.message));
//     }
//   }
  