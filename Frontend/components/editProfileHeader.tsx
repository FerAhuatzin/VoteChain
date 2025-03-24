import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { BackIcon, CircleIcon } from "./icons";


export const EditHeader = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{  marginBottom: 20,}}
        >
          <BackIcon
            size={20}
            color={"black"}
          />
        </TouchableOpacity>
        <Text style={styles.header_title}> Información de perfil</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "white", width: "90%", alignSelf: "center", marginTop: 20, alignContent: "center" },
    header_title: {
        fontSize: 25,
        marginBottom: 20,
      },
});
