import { Stack } from 'expo-router';

export default function CreatePollLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="category" />
    </Stack>
  );
}
