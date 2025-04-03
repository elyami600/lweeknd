// app/_layout.tsx or app/_app.tsx
import React from 'react';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import store from '@/src/store/store'; // adjust path as needed


export default function Layout() {
  return (
    <Provider store={store}>
    <Slot />
    </Provider>
  );
}
