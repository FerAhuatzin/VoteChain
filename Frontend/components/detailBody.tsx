import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { colors } from "../styles/colors";
import { ClockIcon } from "./icons";
import { BarChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";
interface props {
  poll: any;
  votes: any;
  user: any;
}

export const DetailBody = ({ poll, votes, user }: props) => {
  const router = useRouter();

  const descipciones = votes.opciones.map((opcion) => opcion.descripcion);
  const votos = votes.opciones.map((opcion) => opcion.votos);

  const data = {
    labels: descipciones,
    datasets: [
      {
        data: votos,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{poll.titulo}</Text>
        <View style={styles.captions}>
          <ClockIcon size={14} />
          <Text style={{ paddingLeft: 5 }}>{poll.fechaFin}</Text>
        </View>
        <View style={styles.line} />
        <Text>{poll.descripcion}</Text>
        <View style={styles.line} />
        <View style={styles.profile}>
          <Image source={{uri: user.imagen}} style={styles.image} />
          <Text style={{ padding: 10 }}>Creador: {user.nombre}</Text>
        </View>
        <View style={styles.line} />
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 20} // Reducir el margen
          height={300}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(2, 119, 162, ${opacity})`, // Color personalizado
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: "#e0e0e0", // Color de las líneas de fondo
            },
          }}
          style={{ marginVertical: 10, paddingLeft: 10 }}
        />
      </ScrollView>
      <View style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/polls/execute/${poll.id}`)}>
          <Text style={{ color: "white", fontSize: 16 }}>Votar ahora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  captions: {
    flexDirection: "row",
    marginTop: 5,
    opacity: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  line: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
    opacity: 0.3,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
});
