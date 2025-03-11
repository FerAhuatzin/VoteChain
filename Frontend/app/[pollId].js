import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
export default function Detail() {
  const { pollId } = useLocalSearchParams();
  return (
    <View style={{ flex: 1}}>
        <Text>{pollId}</Text>
    </View>
  );
}