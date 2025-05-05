import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css";
import { PollProvider } from './components/pollContext';  // ✅ ajusta la ruta si es necesario

export default function App() {
  return (
    <PollProvider>
      <View style={styles.container}>
        <Text className="text-2xl">Hello World</Text>
        <StatusBar style="auto" />
      </View>
    </PollProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
