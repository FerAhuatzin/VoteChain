import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  ClockIcon,
  HeartOutlinedIcon,
  HeartIcon,
  CircleIcon,
} from "./icons";

interface props {
  poll: any;
}

export const FeedItem = ({ poll }: props) => {
  return (
    <Link href={`/polls/${poll.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.elementWrapper}>
          <Image source={{uri: poll.imagen}} style={styles.image} />
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
          <Text style={styles.title}>{poll.titulo}</Text>
          <View style={styles.captions}>
            <ClockIcon size={14} />
            <Text style={{ paddingLeft: 5}}>
              {poll.fechaFin}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  elementWrapper: {
    flex: 1,
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
  title: {
    marginTop: 5,
    fontWeight: "condensedBold",
  },
  captions: {
    flexDirection: "row",
    marginTop: 5,
    opacity: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
