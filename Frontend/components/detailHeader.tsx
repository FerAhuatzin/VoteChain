import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { BackIcon, HeartOutlinedIcon, HeartIcon, ShareIcon, CircleIcon } from "./icons";

interface props {
  imagen: any;
}

export const DetailHeader = ({ imagen}: props) => {
  const router = useRouter();
  const handleDismiss = () => {
    router.dismiss(1);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View>
        <Image source={{uri: imagen}} style={styles.image} />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.7,
          }}
          onPress={() => handleDismiss()}
        >
          <CircleIcon
            size={40}
            color={"white"}
            style={{ position: "absolute" }}
          />
          <BackIcon
            size={20}
            color={"black"}
            style={{ position: "absolute" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.7,
          }}
        >
          <CircleIcon
            size={40}
            color={"white"}
            style={{ position: "absolute" }}
          />
          <HeartOutlinedIcon
            size={20}
            color={"black"}
            style={{ position: "absolute" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 30,
            right: 80,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.7,
          }}
        >
          <CircleIcon
            size={40}
            color={"white"}
            style={{ position: "absolute" }}
          />
          <ShareIcon
            size={20}
            color={"black"}
            style={{ position: "absolute" }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 170,
  },
});
