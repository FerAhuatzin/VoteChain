import { Stack } from 'expo-router/stack';
import { PollProvider } from '../components/pollContext';  // ✅ ajusta la ruta si es necesario

export default function Layout() {
  return (
    <PollProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(create-poll)" options={{ headerShown: false }} />
      </Stack>
    </PollProvider>
  );
}
