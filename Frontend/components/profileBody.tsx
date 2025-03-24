import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NextIcon } from "./icons";
import { useRouter } from "expo-router";

export const ProfileBody = () => {
  const router = useRouter();

  return (
    <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
      <TouchableOpacity onPress={() => router.push("/my-votes")}>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={{ marginVertical: 20 }}>
            Administrar mis votaciones creadas
          </Text>
          <NextIcon size={25} opacity={0.5}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/profile/edit")}>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={{ marginVertical: 20 }}>
            Administrar mi información de perfil
          </Text>
          <NextIcon size={25} opacity={0.5}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.line} />
        <View style={styles.row}>
          <Text style={{ marginVertical: 20 }}>Cerrar sesión</Text>
          <NextIcon size={25} opacity={0.5}/>
        </View>

        <View style={styles.line} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header_title: {
    fontSize: 25,
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    height: 1,
    backgroundColor: "black",
    opacity: 0.3,
  },
});
