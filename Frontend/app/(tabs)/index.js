import { View, Text } from "react-native";
import { HomeHeader } from "../../components/homeHeader";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex: 1}}>
      <Stack.Screen options={{ header: () => <HomeHeader /> }} />
    </View>
  );
}
