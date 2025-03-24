import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface props {
  user: any;
}

export const ProfileHeader = ({ user }: props) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
        <Text style={styles.header_title}>Perfil</Text>
        <View style={styles.profile}>
          <Image source={ {uri:user.imagen} } style={styles.image} />
          <Text style={{ padding: 20, fontSize: 18 }}>{user.nombre}</Text>
        </View>
      </View>
    </SafeAreaView>
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
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
});
