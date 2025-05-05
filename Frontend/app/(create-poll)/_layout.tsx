import { Stack } from 'expo-router';
import { PollProvider } from '../../components/pollContext'; 
import React from 'react';

export default function Layout() {
  return (
    <PollProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PollProvider>
  );
}