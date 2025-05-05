// app/(tabs)/create.js
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Create() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(create-poll)/category');
  }, []);

  return null; 
}
